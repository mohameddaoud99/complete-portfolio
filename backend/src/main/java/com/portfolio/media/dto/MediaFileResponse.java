package com.portfolio.media.dto;

import java.time.Instant;
import java.util.UUID;

public record MediaFileResponse(
        UUID id,
        String originalFileName,
        String contentType,
        long sizeBytes,
        String url,
        Instant createdAt) {
}
