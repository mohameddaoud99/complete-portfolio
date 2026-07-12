package com.portfolio.skill.controller;

import com.portfolio.common.ApiResponse;
import com.portfolio.skill.dto.SkillRequest;
import com.portfolio.skill.dto.SkillResponse;
import com.portfolio.skill.service.SkillService;
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
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ApiResponse<List<SkillResponse>> list() {
        return ApiResponse.success(skillService.list());
    }

    @GetMapping("/{id}")
    public ApiResponse<SkillResponse> get(@PathVariable UUID id) {
        return ApiResponse.success(skillService.get(id));
    }

    @PostMapping
    public ApiResponse<SkillResponse> create(@Valid @RequestBody SkillRequest request) {
        return ApiResponse.success("Skill created", skillService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<SkillResponse> update(@PathVariable UUID id, @Valid @RequestBody SkillRequest request) {
        return ApiResponse.success("Skill updated", skillService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable UUID id) {
        skillService.delete(id);
        return ApiResponse.success("Skill deleted", null);
    }
}
