package com.portfolio.education.service;

import com.portfolio.common.exception.ResourceNotFoundException;
import com.portfolio.education.dto.EducationRequest;
import com.portfolio.education.dto.EducationResponse;
import com.portfolio.education.entity.Education;
import com.portfolio.education.mapper.EducationMapper;
import com.portfolio.education.repository.EducationRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EducationService {

    private final EducationRepository educationRepository;
    private final EducationMapper educationMapper;

    public EducationService(EducationRepository educationRepository, EducationMapper educationMapper) {
        this.educationRepository = educationRepository;
        this.educationMapper = educationMapper;
    }

    public List<EducationResponse> list() {
        return educationRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(educationMapper::toResponse).toList();
    }

    public EducationResponse get(UUID id) {
        return educationMapper.toResponse(findOrThrow(id));
    }

    @Transactional
    public EducationResponse create(EducationRequest request) {
        Education education = new Education();
        applyRequest(education, request);
        return educationMapper.toResponse(educationRepository.save(education));
    }

    @Transactional
    public EducationResponse update(UUID id, EducationRequest request) {
        Education education = findOrThrow(id);
        applyRequest(education, request);
        return educationMapper.toResponse(education);
    }

    @Transactional
    public void delete(UUID id) {
        educationRepository.delete(findOrThrow(id));
    }

    private Education findOrThrow(UUID id) {
        return educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education not found: " + id));
    }

    private void applyRequest(Education education, EducationRequest request) {
        education.setInstitution(request.institution());
        education.setDegree(request.degree());
        education.setDegreeFr(request.degreeFr());
        education.setField(request.field());
        education.setStartDate(request.startDate());
        education.setEndDate(request.endDate());
        education.setDescription(request.description());
        education.setDescriptionFr(request.descriptionFr());
        education.setDisplayOrder(request.displayOrder());
    }
}
