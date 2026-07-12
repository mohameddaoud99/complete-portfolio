package com.portfolio.experience.mapper;

import com.portfolio.experience.dto.ExperienceResponse;
import com.portfolio.experience.entity.Experience;
import org.springframework.stereotype.Component;

@Component
public class ExperienceMapper {

    public ExperienceResponse toResponse(Experience experience) {
        return new ExperienceResponse(
                experience.getId(),
                experience.getCompany(),
                experience.getRole(),
                experience.getRoleFr(),
                experience.getLocation(),
                experience.getStartDate(),
                experience.getEndDate(),
                experience.getDescription(),
                experience.getDescriptionFr(),
                experience.getAchievements(),
                experience.getAchievementsFr(),
                experience.getDisplayOrder());
    }
}
