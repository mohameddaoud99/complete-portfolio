package com.portfolio.user.service;

import com.portfolio.common.exception.BadRequestException;
import com.portfolio.security.JwtService;
import com.portfolio.user.dto.LoginRequest;
import com.portfolio.user.dto.LoginResponse;
import com.portfolio.user.entity.User;
import com.portfolio.user.mapper.UserMapper;
import com.portfolio.user.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository,
            UserMapper userMapper, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.usernameOrEmail(), request.password()));

        User user = userRepository.findByUsernameOrEmail(request.usernameOrEmail(), request.usernameOrEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

        String accessToken = jwtService.generateAccessToken(user.getUsername());
        return new LoginResponse(accessToken, jwtService.getAccessTokenExpirationSeconds(), userMapper.toProfileDto(user));
    }

    public String issueRefreshToken(String username) {
        return jwtService.generateRefreshToken(username);
    }

    public LoginResponse refresh(String refreshToken) {
        if (!jwtService.isValid(refreshToken) || !jwtService.isRefreshToken(refreshToken)) {
            throw new BadCredentialsException("Invalid or expired refresh token");
        }

        String username = jwtService.extractUsername(refreshToken);
        User user = userRepository.findByUsernameOrEmail(username, username)
                .orElseThrow(() -> new BadCredentialsException("Invalid or expired refresh token"));

        String accessToken = jwtService.generateAccessToken(user.getUsername());
        return new LoginResponse(accessToken, jwtService.getAccessTokenExpirationSeconds(), userMapper.toProfileDto(user));
    }

    @Transactional
    public void changePassword(String username, String currentPassword, String newPassword) {
        User user = userRepository.findByUsernameOrEmail(username, username)
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new BadRequestException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
    }
}
