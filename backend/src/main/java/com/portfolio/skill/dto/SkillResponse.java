package com.portfolio.skill.dto;

import java.util.UUID;

public record SkillResponse(
        UUID id, String name, String category, int proficiency, String icon, int yearsExperience, int displayOrder) {
}
