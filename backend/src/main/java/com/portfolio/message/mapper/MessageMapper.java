package com.portfolio.message.mapper;

import com.portfolio.message.dto.MessageResponse;
import com.portfolio.message.entity.Message;
import org.springframework.stereotype.Component;

@Component
public class MessageMapper {

    public MessageResponse toResponse(Message message) {
        return new MessageResponse(
                message.getId(),
                message.getSenderName(),
                message.getSenderEmail(),
                message.getSubject(),
                message.getBody(),
                message.isRead(),
                message.getCreatedAt());
    }
}
