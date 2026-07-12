package com.portfolio.profile.service;

import com.portfolio.common.exception.ResourceNotFoundException;
import com.portfolio.profile.dto.ProfileRequest;
import com.portfolio.profile.dto.ProfileResponse;
import com.portfolio.profile.entity.Profile;
import com.portfolio.profile.mapper.ProfileMapper;
import com.portfolio.profile.repository.ProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final ProfileMapper profileMapper;

    public ProfileService(ProfileRepository profileRepository, ProfileMapper profileMapper) {
        this.profileRepository = profileRepository;
        this.profileMapper = profileMapper;
    }

    public ProfileResponse getProfile() {
        return profileMapper.toResponse(getSingleton());
    }

    @Transactional
    public ProfileResponse updateProfile(ProfileRequest request) {
        Profile profile = getSingleton();
        profile.setFullName(request.fullName());
        profile.setTitle(request.title());
        profile.setTitleFr(request.titleFr());
        profile.setBio(request.bio());
        profile.setBioFr(request.bioFr());
        profile.setAvatarUrl(request.avatarUrl());
        profile.setEmail(request.email());
        profile.setPhone(request.phone());
        profile.setLocation(request.location());
        profile.setGithubUrl(request.githubUrl());
        profile.setLinkedinUrl(request.linkedinUrl());
        profile.setTwitterUrl(request.twitterUrl());
        profile.setWebsiteUrl(request.websiteUrl());
        profile.setResumeUrl(request.resumeUrl());
        profile.setSeoTitle(request.seoTitle());
        profile.setSeoDescription(request.seoDescription());
        return profileMapper.toResponse(profileRepository.saveAndFlush(profile));
    }

    private Profile getSingleton() {
        return profileRepository.findAll().stream().findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
    }
}
