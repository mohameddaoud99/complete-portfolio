package com.portfolio.education.mapper;

import com.portfolio.education.dto.EducationResponse;
import com.portfolio.education.entity.Education;
import org.springframework.stereotype.Component;

@Component
public class EducationMapper {

    public EducationResponse toResponse(Education education) {
        return new EducationResponse(
                education.getId(),
                education.getInstitution(),
                education.getDegree(),
                education.getDegreeFr(),
                education.getField(),
                education.getStartDate(),
                education.getEndDate(),
                education.getDescription(),
                education.getDescriptionFr(),
                education.getDisplayOrder());
    }
}
