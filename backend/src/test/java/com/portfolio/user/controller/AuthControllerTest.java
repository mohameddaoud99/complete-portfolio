package com.portfolio.user.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.config.CorsProperties;
import com.portfolio.config.JwtProperties;
import com.portfolio.config.SecurityConfig;
import com.portfolio.security.AuthEntryPoint;
import com.portfolio.security.CustomUserDetailsService;
import com.portfolio.security.JwtAuthenticationFilter;
import com.portfolio.security.JwtService;
import com.portfolio.user.dto.LoginRequest;
import com.portfolio.user.dto.LoginResponse;
import com.portfolio.user.dto.UserProfileDto;
import com.portfolio.user.service.AuthService;
import com.portfolio.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(AuthController.class)
@Import({SecurityConfig.class, AuthEntryPoint.class, JwtAuthenticationFilter.class})
@EnableConfigurationProperties({JwtProperties.class, CorsProperties.class})
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @MockitoBean
    private AuthService authService;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private JwtService jwtService;

    @MockitoBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    void loginReturnsAccessTokenOnValidCredentials() throws Exception {
        UserProfileDto profile = new UserProfileDto(java.util.UUID.randomUUID(), "admin", "admin@portfolio.dev", "ADMIN");
        LoginResponse loginResponse = new LoginResponse("fake-access-token", 900, profile);
        given(authService.login(any(LoginRequest.class))).willReturn(loginResponse);
        given(authService.issueRefreshToken(any())).willReturn("fake-refresh-token");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LoginRequest("admin", "Admin@123"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.accessToken").value("fake-access-token"));
    }

    @Test
    void loginReturnsUnauthorizedOnBadCredentials() throws Exception {
        given(authService.login(any(LoginRequest.class))).willThrow(new BadCredentialsException("Invalid username or password"));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LoginRequest("admin", "wrong-password"))))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    void loginRejectsBlankPayload() throws Exception {
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LoginRequest("", ""))))
                .andExpect(status().isBadRequest());
    }

    @Test
    void meRequiresAuthentication() throws Exception {
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isUnauthorized());
    }
}
