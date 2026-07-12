package com.portfolio.profile.dto;

import jakarta.validation.constraints.NotBlank;

public record ProfileRequest(
        @NotBlank(message = "Full name is required") String fullName,
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
        String seoDescription) {
}
