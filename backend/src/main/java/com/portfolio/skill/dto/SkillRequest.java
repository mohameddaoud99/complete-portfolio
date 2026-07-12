package com.portfolio.skill.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record SkillRequest(
        @NotBlank(message = "Name is required") String name,
        @NotBlank(message = "Category is required") String category,
        @Min(1) @Max(5) int proficiency,
        String icon,
        int yearsExperience,
        int displayOrder) {
}
