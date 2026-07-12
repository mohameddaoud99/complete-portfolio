package com.portfolio.testimonial.dto;

import jakarta.validation.constraints.NotBlank;

public record TestimonialRequest(
        @NotBlank(message = "Author name is required") String authorName,
        String authorRole,
        String authorRoleFr,
        String authorCompany,
        String avatarUrl,
        @NotBlank(message = "Quote is required") String quote,
        String quoteFr,
        boolean published,
        int displayOrder) {
}
