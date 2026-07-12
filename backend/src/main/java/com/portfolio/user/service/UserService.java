package com.portfolio.user.service;

import com.portfolio.common.exception.ResourceNotFoundException;
import com.portfolio.user.dto.UserProfileDto;
import com.portfolio.user.mapper.UserMapper;
import com.portfolio.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserProfileDto getProfile(String username) {
        return userRepository.findByUsernameOrEmail(username, username)
                .map(userMapper::toProfileDto)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
    }
}
