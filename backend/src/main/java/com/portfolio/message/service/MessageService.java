package com.portfolio.message.service;

import com.portfolio.common.exception.ResourceNotFoundException;
import com.portfolio.message.dto.MessageCreateRequest;
import com.portfolio.message.dto.MessageResponse;
import com.portfolio.message.entity.Message;
import com.portfolio.message.mapper.MessageMapper;
import com.portfolio.message.repository.MessageRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final MessageMapper messageMapper;

    public MessageService(MessageRepository messageRepository, MessageMapper messageMapper) {
        this.messageRepository = messageRepository;
        this.messageMapper = messageMapper;
    }

    public List<MessageResponse> list() {
        return messageRepository.findAllByOrderByCreatedAtDesc().stream().map(messageMapper::toResponse).toList();
    }

    public MessageResponse get(UUID id) {
        return messageMapper.toResponse(findOrThrow(id));
    }

    @Transactional
    public MessageResponse create(MessageCreateRequest request) {
        Message message = new Message();
        message.setSenderName(request.senderName());
        message.setSenderEmail(request.senderEmail());
        message.setSubject(request.subject());
        message.setBody(request.body());
        message.setRead(false);
        return messageMapper.toResponse(messageRepository.saveAndFlush(message));
    }

    @Transactional
    public MessageResponse markAsRead(UUID id) {
        Message message = findOrThrow(id);
        message.setRead(true);
        return messageMapper.toResponse(message);
    }

    @Transactional
    public void delete(UUID id) {
        messageRepository.delete(findOrThrow(id));
    }

    private Message findOrThrow(UUID id) {
        return messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found: " + id));
    }
}
