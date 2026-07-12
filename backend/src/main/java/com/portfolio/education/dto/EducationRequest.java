package com.portfolio.education.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record EducationRequest(
        @NotBlank(message = "Institution is required") String institution,
        @NotBlank(message = "Degree is required") String degree,
        String degreeFr,
        String field,
        @NotNull(message = "Start date is required") LocalDate startDate,
        LocalDate endDate,
        String description,
        String descriptionFr,
        int displayOrder) {
}
