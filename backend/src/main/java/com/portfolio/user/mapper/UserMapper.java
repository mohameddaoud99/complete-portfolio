package com.portfolio.user.mapper;

import com.portfolio.user.dto.UserProfileDto;
import com.portfolio.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserProfileDto toProfileDto(User user) {
        return new UserProfileDto(user.getId(), user.getUsername(), user.getEmail(), user.getRole().name());
    }
}
