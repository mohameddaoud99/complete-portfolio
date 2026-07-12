package com.portfolio.certification.dto;

import java.time.LocalDate;
import java.util.UUID;

public record CertificationResponse(
        UUID id,
        String name,
        String issuer,
        LocalDate issueDate,
        LocalDate expiryDate,
        String credentialUrl,
        String badgeImageUrl,
        int displayOrder) {
}
