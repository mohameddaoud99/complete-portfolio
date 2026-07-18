package com.portfolio.experience.controller;

import com.portfolio.common.ApiResponse;
import com.portfolio.experience.dto.ExperienceRequest;
import com.portfolio.experience.dto.ExperienceResponse;
import com.portfolio.experience.service.ExperienceService;
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
 * The Angular frontend now manages experiences directly via Supabase Database.
 * This REST controller is no longer called by the frontend.
 */
@RestController
@RequestMapping("/api/experiences")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping
    public ApiResponse<List<ExperienceResponse>> list() {
        return ApiResponse.success(experienceService.list());
    }

    @GetMapping("/{id}")
    public ApiResponse<ExperienceResponse> get(@PathVariable UUID id) {
        return ApiResponse.success(experienceService.get(id));
    }

    @PostMapping
    public ApiResponse<ExperienceResponse> create(@Valid @RequestBody ExperienceRequest request) {
        return ApiResponse.success("Experience created", experienceService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<ExperienceResponse> update(@PathVariable UUID id, @Valid @RequestBody ExperienceRequest request) {
        return ApiResponse.success("Experience updated", experienceService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable UUID id) {
        experienceService.delete(id);
        return ApiResponse.success("Experience deleted", null);
    }
}
