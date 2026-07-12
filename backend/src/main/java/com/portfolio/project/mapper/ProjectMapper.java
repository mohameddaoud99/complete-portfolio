package com.portfolio.project.mapper;

import com.portfolio.project.dto.ProjectResponse;
import com.portfolio.project.entity.Project;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {

    public ProjectResponse toResponse(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getSlug(),
                project.getSummary(),
                project.getSummaryFr(),
                project.getDescription(),
                project.getDescriptionFr(),
                project.getTechStack(),
                project.getRepoUrl(),
                project.getLiveUrl(),
                project.getImageUrl(),
                project.getCategory(),
                project.getScreenshots(),
                project.isFeatured(),
                project.getDisplayOrder());
    }
}
