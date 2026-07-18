package com.portfolio.profile.controller;

import com.portfolio.common.ApiResponse;
import com.portfolio.profile.dto.ProfileRequest;
import com.portfolio.profile.dto.ProfileResponse;
import com.portfolio.profile.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Legacy implementation retained for demonstration purposes.
 * The Angular frontend now reads and writes profile data directly via Supabase Database.
 * This REST controller is no longer called by the frontend.
 */
@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ApiResponse<ProfileResponse> getProfile() {
        return ApiResponse.success(profileService.getProfile());
    }

    @PutMapping
    public ApiResponse<ProfileResponse> updateProfile(@Valid @RequestBody ProfileRequest request) {
        return ApiResponse.success("Profile updated", profileService.updateProfile(request));
    }
}
