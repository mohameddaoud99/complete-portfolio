package com.portfolio.certification.controller;

import com.portfolio.certification.dto.CertificationRequest;
import com.portfolio.certification.dto.CertificationResponse;
import com.portfolio.certification.service.CertificationService;
import com.portfolio.common.ApiResponse;
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
@RequestMapping("/api/certifications")
public class CertificationController {

    private final CertificationService certificationService;

    public CertificationController(CertificationService certificationService) {
        this.certificationService = certificationService;
    }

    @GetMapping
    public ApiResponse<List<CertificationResponse>> list() {
        return ApiResponse.success(certificationService.list());
    }

    @GetMapping("/{id}")
    public ApiResponse<CertificationResponse> get(@PathVariable UUID id) {
        return ApiResponse.success(certificationService.get(id));
    }

    @PostMapping
    public ApiResponse<CertificationResponse> create(@Valid @RequestBody CertificationRequest request) {
        return ApiResponse.success("Certification created", certificationService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<CertificationResponse> update(@PathVariable UUID id, @Valid @RequestBody CertificationRequest request) {
        return ApiResponse.success("Certification updated", certificationService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable UUID id) {
        certificationService.delete(id);
        return ApiResponse.success("Certification deleted", null);
    }
}
