package com.portfolio.message.controller;

import com.portfolio.common.ApiResponse;
import com.portfolio.message.dto.MessageCreateRequest;
import com.portfolio.message.dto.MessageResponse;
import com.portfolio.message.service.MessageService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping
    public ApiResponse<List<MessageResponse>> list() {
        return ApiResponse.success(messageService.list());
    }

    @GetMapping("/{id}")
    public ApiResponse<MessageResponse> get(@PathVariable UUID id) {
        return ApiResponse.success(messageService.get(id));
    }

    @PostMapping
    public ApiResponse<MessageResponse> create(@Valid @RequestBody MessageCreateRequest request) {
        return ApiResponse.success("Message sent", messageService.create(request));
    }

    @PatchMapping("/{id}/read")
    public ApiResponse<MessageResponse> markAsRead(@PathVariable UUID id) {
        return ApiResponse.success("Message marked as read", messageService.markAsRead(id));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable UUID id) {
        messageService.delete(id);
        return ApiResponse.success("Message deleted", null);
    }
}
