package com.portfolio.message.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record MessageCreateRequest(
        @NotBlank(message = "Name is required") String senderName,
        @NotBlank(message = "Email is required") @Email(message = "Email must be valid") String senderEmail,
        String subject,
        @NotBlank(message = "Message body is required") String body) {
}
