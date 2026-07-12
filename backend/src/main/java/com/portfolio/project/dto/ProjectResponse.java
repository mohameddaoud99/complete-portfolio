package com.portfolio.project.dto;

import java.util.UUID;

public record ProjectResponse(
        UUID id,
        String title,
        String slug,
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
