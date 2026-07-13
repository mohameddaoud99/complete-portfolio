package com.portfolio.skill.controller;

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
import com.portfolio.skill.dto.SkillRequest;
import com.portfolio.skill.dto.SkillResponse;
import com.portfolio.skill.service.SkillService;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(SkillController.class)
@Import({SecurityConfig.class, AuthEntryPoint.class, JwtAuthenticationFilter.class})
@EnableConfigurationProperties({JwtProperties.class, CorsProperties.class})
class SkillControllerTest {

    private static final String VALID_TOKEN = "valid-token";

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @MockitoBean
    private SkillService skillService;

    @MockitoBean
    private JwtService jwtService;

    @MockitoBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    void listRequiresAuthentication() throws Exception {
        mockMvc.perform(get("/api/skills"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void listReturnsSkillsWhenAuthenticated() throws Exception {
        authenticateAs("admin");
        given(skillService.list()).willReturn(List.of(new SkillResponse(UUID.randomUUID(), "Java", "Backend", 5, "Coffee", 6, 1)));

        mockMvc.perform(get("/api/skills").header("Authorization", "Bearer " + VALID_TOKEN))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].name").value("Java"));
    }

    @Test
    void createValidatesRequestBody() throws Exception {
        authenticateAs("admin");

        mockMvc.perform(post("/api/skills")
                        .header("Authorization", "Bearer " + VALID_TOKEN)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new SkillRequest("", "", 9, "", 0, 0))))
                .andExpect(status().isBadRequest());
    }

    @Test
    void createReturnsCreatedSkill() throws Exception {
        authenticateAs("admin");
        given(skillService.create(any(SkillRequest.class)))
                .willReturn(new SkillResponse(UUID.randomUUID(), "Angular", "Frontend", 4, "Atom", 4, 2));

        mockMvc.perform(post("/api/skills")
                        .header("Authorization", "Bearer " + VALID_TOKEN)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new SkillRequest("Angular", "Frontend", 4, "Atom", 4, 2))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("Angular"));
    }

    private void authenticateAs(String username) {
        given(jwtService.isValid(VALID_TOKEN)).willReturn(true);
        given(jwtService.isAccessToken(VALID_TOKEN)).willReturn(true);
        given(jwtService.extractUsername(VALID_TOKEN)).willReturn(username);
        given(customUserDetailsService.loadUserByUsername(username)).willReturn(
                User.builder().username(username).password("n/a").authorities(new SimpleGrantedAuthority("ROLE_ADMIN")).build());
    }
}
