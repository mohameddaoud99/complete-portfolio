package com.portfolio.user.dto;

public record LoginResponse(String accessToken, long expiresInSeconds, UserProfileDto user) {
}
