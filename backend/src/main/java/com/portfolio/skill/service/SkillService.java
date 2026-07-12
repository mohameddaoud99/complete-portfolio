package com.portfolio.skill.service;

import com.portfolio.common.exception.ResourceNotFoundException;
import com.portfolio.skill.dto.SkillRequest;
import com.portfolio.skill.dto.SkillResponse;
import com.portfolio.skill.entity.Skill;
import com.portfolio.skill.mapper.SkillMapper;
import com.portfolio.skill.repository.SkillRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    private final SkillMapper skillMapper;

    public SkillService(SkillRepository skillRepository, SkillMapper skillMapper) {
        this.skillRepository = skillRepository;
        this.skillMapper = skillMapper;
    }

    public List<SkillResponse> list() {
        return skillRepository.findAllByOrderByDisplayOrderAsc().stream().map(skillMapper::toResponse).toList();
    }

    public SkillResponse get(UUID id) {
        return skillMapper.toResponse(findOrThrow(id));
    }

    @Transactional
    public SkillResponse create(SkillRequest request) {
        Skill skill = new Skill();
        applyRequest(skill, request);
        return skillMapper.toResponse(skillRepository.save(skill));
    }

    @Transactional
    public SkillResponse update(UUID id, SkillRequest request) {
        Skill skill = findOrThrow(id);
        applyRequest(skill, request);
        return skillMapper.toResponse(skill);
    }

    @Transactional
    public void delete(UUID id) {
        skillRepository.delete(findOrThrow(id));
    }

    private Skill findOrThrow(UUID id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found: " + id));
    }

    private void applyRequest(Skill skill, SkillRequest request) {
        skill.setName(request.name());
        skill.setCategory(request.category());
        skill.setProficiency(request.proficiency());
        skill.setIcon(request.icon());
        skill.setYearsExperience(request.yearsExperience());
        skill.setDisplayOrder(request.displayOrder());
    }
}
