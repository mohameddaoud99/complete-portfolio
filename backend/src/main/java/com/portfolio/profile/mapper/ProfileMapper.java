package com.portfolio.profile.mapper;

import com.portfolio.profile.dto.ProfileResponse;
import com.portfolio.profile.entity.Profile;
import org.springframework.stereotype.Component;

@Component
public class ProfileMapper {

    public ProfileResponse toResponse(Profile profile) {
        return new ProfileResponse(
                profile.getId(),
                profile.getFullName(),
                profile.getTitle(),
                profile.getTitleFr(),
                profile.getBio(),
                profile.getBioFr(),
                profile.getAvatarUrl(),
                profile.getEmail(),
                profile.getPhone(),
                profile.getLocation(),
                profile.getGithubUrl(),
                profile.getLinkedinUrl(),
                profile.getTwitterUrl(),
                profile.getWebsiteUrl(),
                profile.getResumeUrl(),
                profile.getSeoTitle(),
                profile.getSeoDescription(),
                profile.getUpdatedAt());
    }
}
