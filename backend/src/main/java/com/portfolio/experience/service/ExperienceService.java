package com.portfolio.experience.service;

import com.portfolio.common.exception.ResourceNotFoundException;
import com.portfolio.experience.dto.ExperienceRequest;
import com.portfolio.experience.dto.ExperienceResponse;
import com.portfolio.experience.entity.Experience;
import com.portfolio.experience.mapper.ExperienceMapper;
import com.portfolio.experience.repository.ExperienceRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;
    private final ExperienceMapper experienceMapper;

    public ExperienceService(ExperienceRepository experienceRepository, ExperienceMapper experienceMapper) {
        this.experienceRepository = experienceRepository;
        this.experienceMapper = experienceMapper;
    }

    public List<ExperienceResponse> list() {
        return experienceRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(experienceMapper::toResponse).toList();
    }

    public ExperienceResponse get(UUID id) {
        return experienceMapper.toResponse(findOrThrow(id));
    }

    @Transactional
    public ExperienceResponse create(ExperienceRequest request) {
        Experience experience = new Experience();
        applyRequest(experience, request);
        return experienceMapper.toResponse(experienceRepository.save(experience));
    }

    @Transactional
    public ExperienceResponse update(UUID id, ExperienceRequest request) {
        Experience experience = findOrThrow(id);
        applyRequest(experience, request);
        return experienceMapper.toResponse(experience);
    }

    @Transactional
    public void delete(UUID id) {
        experienceRepository.delete(findOrThrow(id));
    }

    private Experience findOrThrow(UUID id) {
        return experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found: " + id));
    }

    private void applyRequest(Experience experience, ExperienceRequest request) {
        experience.setCompany(request.company());
        experience.setRole(request.role());
        experience.setRoleFr(request.roleFr());
        experience.setLocation(request.location());
        experience.setStartDate(request.startDate());
        experience.setEndDate(request.endDate());
        experience.setDescription(request.description());
        experience.setDescriptionFr(request.descriptionFr());
        experience.setAchievements(request.achievements());
        experience.setAchievementsFr(request.achievementsFr());
        experience.setDisplayOrder(request.displayOrder());
    }
}
