package com.portfolio.certification.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record CertificationRequest(
        @NotBlank(message = "Name is required") String name,
        @NotBlank(message = "Issuer is required") String issuer,
        @NotNull(message = "Issue date is required") LocalDate issueDate,
        LocalDate expiryDate,
        String credentialUrl,
        String badgeImageUrl,
        int displayOrder) {
}
