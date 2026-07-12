package com.portfolio.education.controller;

import com.portfolio.common.ApiResponse;
import com.portfolio.education.dto.EducationRequest;
import com.portfolio.education.dto.EducationResponse;
import com.portfolio.education.service.EducationService;
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

@RestController
@RequestMapping("/api/education")
public class EducationController {

    private final EducationService educationService;

    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }

    @GetMapping
    public ApiResponse<List<EducationResponse>> list() {
        return ApiResponse.success(educationService.list());
    }

    @GetMapping("/{id}")
    public ApiResponse<EducationResponse> get(@PathVariable UUID id) {
        return ApiResponse.success(educationService.get(id));
    }

    @PostMapping
    public ApiResponse<EducationResponse> create(@Valid @RequestBody EducationRequest request) {
        return ApiResponse.success("Education created", educationService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<EducationResponse> update(@PathVariable UUID id, @Valid @RequestBody EducationRequest request) {
        return ApiResponse.success("Education updated", educationService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable UUID id) {
        educationService.delete(id);
        return ApiResponse.success("Education deleted", null);
    }
}
