package com.portfolio.project.dto;

import jakarta.validation.constraints.NotBlank;

public record ProjectRequest(
        @NotBlank(message = "Title is required") String title,
        String summary,
        String summaryFr,
        String description,
        String descriptionFr,
        String techStack,
        String repoUrl,
        String liveUrl,
        String imageUrl,
        String category,
        String screenshots,
        boolean featured,
        int displayOrder) {
}
