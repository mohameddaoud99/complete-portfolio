package com.portfolio.security;

import static org.assertj.core.api.Assertions.assertThat;

import com.portfolio.config.JwtProperties;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        JwtProperties properties = new JwtProperties(
                "test-secret-key-test-secret-key-test-secret-key", 15, 7);
        jwtService = new JwtService(properties);
    }

    @Test
    void generatesAccessTokenWithExtractableUsername() {
        String token = jwtService.generateAccessToken("admin");

        assertThat(jwtService.isValid(token)).isTrue();
        assertThat(jwtService.isAccessToken(token)).isTrue();
        assertThat(jwtService.isRefreshToken(token)).isFalse();
        assertThat(jwtService.extractUsername(token)).isEqualTo("admin");
    }

    @Test
    void generatesRefreshTokenDistinctFromAccessToken() {
        String token = jwtService.generateRefreshToken("admin");

        assertThat(jwtService.isValid(token)).isTrue();
        assertThat(jwtService.isRefreshToken(token)).isTrue();
        assertThat(jwtService.isAccessToken(token)).isFalse();
    }

    @Test
    void rejectsMalformedToken() {
        assertThat(jwtService.isValid("not-a-real-token")).isFalse();
    }
}
