package com.portfolio.skill.mapper;

import com.portfolio.skill.dto.SkillResponse;
import com.portfolio.skill.entity.Skill;
import org.springframework.stereotype.Component;

@Component
public class SkillMapper {

    public SkillResponse toResponse(Skill skill) {
        return new SkillResponse(skill.getId(), skill.getName(), skill.getCategory(), skill.getProficiency(),
                skill.getIcon(), skill.getYearsExperience(), skill.getDisplayOrder());
    }
}
