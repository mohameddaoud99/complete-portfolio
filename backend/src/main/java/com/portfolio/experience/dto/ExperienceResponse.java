package com.portfolio.experience.dto;

import java.time.LocalDate;
import java.util.UUID;

public record ExperienceResponse(
        UUID id,
        String company,
        String role,
        String roleFr,
        String location,
        LocalDate startDate,
        LocalDate endDate,
        String description,
        String descriptionFr,
        String achievements,
        String achievementsFr,
        int displayOrder) {
}
