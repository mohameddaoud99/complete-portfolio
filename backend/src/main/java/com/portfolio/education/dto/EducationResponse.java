package com.portfolio.education.dto;

import java.time.LocalDate;
import java.util.UUID;

public record EducationResponse(
        UUID id,
        String institution,
        String degree,
        String degreeFr,
        String field,
        LocalDate startDate,
        LocalDate endDate,
        String description,
        String descriptionFr,
        int displayOrder) {
}
