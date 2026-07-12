package com.portfolio.profile.dto;

import java.time.Instant;
import java.util.UUID;

public record ProfileResponse(
        UUID id,
        String fullName,
        String title,
        String titleFr,
        String bio,
        String bioFr,
        String avatarUrl,
        String email,
        String phone,
        String location,
        String githubUrl,
        String linkedinUrl,
        String twitterUrl,
        String websiteUrl,
        String resumeUrl,
        String seoTitle,
        String seoDescription,
        Instant updatedAt) {
}
