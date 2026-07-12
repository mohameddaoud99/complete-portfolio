package com.portfolio.project.service;

import com.portfolio.common.exception.ResourceNotFoundException;
import com.portfolio.project.dto.ProjectRequest;
import com.portfolio.project.dto.ProjectResponse;
import com.portfolio.project.entity.Project;
import com.portfolio.project.mapper.ProjectMapper;
import com.portfolio.project.repository.ProjectRepository;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    public ProjectService(ProjectRepository projectRepository, ProjectMapper projectMapper) {
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
    }

    public List<ProjectResponse> list() {
        return projectRepository.findAllByOrderByDisplayOrderAsc().stream().map(projectMapper::toResponse).toList();
    }

    public ProjectResponse get(UUID id) {
        return projectMapper.toResponse(findOrThrow(id));
    }

    public ProjectResponse getBySlug(String slug) {
        return projectRepository.findBySlug(slug)
                .map(projectMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + slug));
    }

    @Transactional
    public ProjectResponse create(ProjectRequest request) {
        Project project = new Project();
        project.setSlug(generateUniqueSlug(request.title()));
        applyRequest(project, request);
        return projectMapper.toResponse(projectRepository.save(project));
    }

    @Transactional
    public ProjectResponse update(UUID id, ProjectRequest request) {
        Project project = findOrThrow(id);
        applyRequest(project, request);
        return projectMapper.toResponse(project);
    }

    @Transactional
    public void delete(UUID id) {
        projectRepository.delete(findOrThrow(id));
    }

    private Project findOrThrow(UUID id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + id));
    }

    private void applyRequest(Project project, ProjectRequest request) {
        project.setTitle(request.title());
        project.setSummary(request.summary());
        project.setSummaryFr(request.summaryFr());
        project.setDescription(request.description());
        project.setDescriptionFr(request.descriptionFr());
        project.setTechStack(request.techStack());
        project.setRepoUrl(request.repoUrl());
        project.setLiveUrl(request.liveUrl());
        project.setImageUrl(request.imageUrl());
        project.setCategory(request.category());
        project.setScreenshots(request.screenshots());
        project.setFeatured(request.featured());
        project.setDisplayOrder(request.displayOrder());
    }

    private String generateUniqueSlug(String title) {
        String base = title.toLowerCase(Locale.ROOT).trim()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-+|-+$", "");
        String slug = base;
        int suffix = 2;
        while (projectRepository.existsBySlug(slug)) {
            slug = base + "-" + suffix++;
        }
        return slug;
    }
}
