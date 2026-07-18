package com.portfolio.media.controller;

import com.portfolio.common.ApiResponse;
import com.portfolio.media.dto.MediaFileResponse;
import com.portfolio.media.service.MediaService;
import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * Legacy implementation retained for demonstration purposes.
 * The Angular frontend now uploads files directly to Supabase Storage
 * and records metadata in the media_files table via Supabase Database.
 * This REST controller is no longer called by the frontend.
 */
@RestController
@RequestMapping("/api/media")
public class MediaController {

    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @GetMapping
    public ApiResponse<List<MediaFileResponse>> list() {
        return ApiResponse.success(mediaService.list());
    }

    @PostMapping
    public ApiResponse<MediaFileResponse> upload(@RequestParam("file") MultipartFile file) {
        return ApiResponse.success("File uploaded", mediaService.upload(file));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable UUID id) {
        mediaService.delete(id);
        return ApiResponse.success("File deleted", null);
    }
}
