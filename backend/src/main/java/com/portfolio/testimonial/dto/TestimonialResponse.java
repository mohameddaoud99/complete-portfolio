package com.portfolio.testimonial.dto;

import java.util.UUID;

public record TestimonialResponse(
        UUID id,
        String authorName,
        String authorRole,
        String authorRoleFr,
        String authorCompany,
        String avatarUrl,
        String quote,
        String quoteFr,
        boolean published,
        int displayOrder) {
}
