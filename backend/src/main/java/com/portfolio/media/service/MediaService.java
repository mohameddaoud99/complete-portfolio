package com.portfolio.media.service;

import com.portfolio.common.exception.BadRequestException;
import com.portfolio.common.exception.ResourceNotFoundException;
import com.portfolio.media.dto.MediaFileResponse;
import com.portfolio.media.entity.MediaFile;
import com.portfolio.media.mapper.MediaFileMapper;
import com.portfolio.media.repository.MediaFileRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class MediaService {

    private final MediaFileRepository mediaFileRepository;
    private final MediaFileMapper mediaFileMapper;
    private final SupabaseStorageService supabaseStorageService;

    public MediaService(MediaFileRepository mediaFileRepository, MediaFileMapper mediaFileMapper,
            SupabaseStorageService supabaseStorageService) {
        this.mediaFileRepository = mediaFileRepository;
        this.mediaFileMapper = mediaFileMapper;
        this.supabaseStorageService = supabaseStorageService;
    }

    public List<MediaFileResponse> list() {
        return mediaFileRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(mediaFileMapper::toResponse).toList();
    }

    @Transactional
    public MediaFileResponse upload(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BadRequestException("Uploaded file is empty");
        }

        String originalFileName = file.getOriginalFilename() != null ? file.getOriginalFilename() : "file";
        String extension = "";
        int dotIndex = originalFileName.lastIndexOf('.');
        if (dotIndex >= 0) {
            extension = originalFileName.substring(dotIndex);
        }
        String storedFileName = UUID.randomUUID() + extension;

        supabaseStorageService.upload(file, storedFileName);

        MediaFile mediaFile = new MediaFile();
        mediaFile.setFileName(storedFileName);
        mediaFile.setOriginalFileName(originalFileName);
        mediaFile.setContentType(file.getContentType());
        mediaFile.setSizeBytes(file.getSize());
        mediaFile.setUrl(supabaseStorageService.publicUrl(storedFileName));

        return mediaFileMapper.toResponse(mediaFileRepository.saveAndFlush(mediaFile));
    }

    @Transactional
    public void delete(UUID id) {
        MediaFile mediaFile = mediaFileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Media file not found: " + id));

        supabaseStorageService.delete(mediaFile.getFileName());
        mediaFileRepository.delete(mediaFile);
    }
}
