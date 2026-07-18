package com.portfolio.project.controller;

import com.portfolio.common.ApiResponse;
import com.portfolio.project.dto.ProjectRequest;
import com.portfolio.project.dto.ProjectResponse;
import com.portfolio.project.service.ProjectService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Legacy implementation retained for demonstration purposes.
 * The Angular frontend now manages projects directly via Supabase Database.
 * This REST controller is no longer called by the frontend.
 */
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ApiResponse<List<ProjectResponse>> list() {
        return ApiResponse.success(projectService.list());
    }

    @GetMapping("/{id}")
    public ApiResponse<ProjectResponse> get(@PathVariable UUID id) {
        return ApiResponse.success(projectService.get(id));
    }

    @PostMapping
    public ApiResponse<ProjectResponse> create(@Valid @RequestBody ProjectRequest request) {
        return ApiResponse.success("Project created", projectService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<ProjectResponse> update(@PathVariable UUID id, @Valid @RequestBody ProjectRequest request) {
        return ApiResponse.success("Project updated", projectService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable UUID id) {
        projectService.delete(id);
        return ApiResponse.success("Project deleted", null);
    }
}
