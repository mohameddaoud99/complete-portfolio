package com.portfolio.message.dto;

import java.time.Instant;
import java.util.UUID;

public record MessageResponse(
        UUID id,
        String senderName,
        String senderEmail,
        String subject,
        String body,
        boolean read,
        Instant createdAt) {
}
