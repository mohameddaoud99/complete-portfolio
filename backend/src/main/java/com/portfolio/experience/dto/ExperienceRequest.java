package com.portfolio.experience.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record ExperienceRequest(
        @NotBlank(message = "Company is required") String company,
        @NotBlank(message = "Role is required") String role,
        String roleFr,
        String location,
        @NotNull(message = "Start date is required") LocalDate startDate,
        LocalDate endDate,
        String description,
        String descriptionFr,
        String achievements,
        String achievementsFr,
        int displayOrder) {
}
