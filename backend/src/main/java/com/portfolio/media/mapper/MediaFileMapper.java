package com.portfolio.media.mapper;

import com.portfolio.media.dto.MediaFileResponse;
import com.portfolio.media.entity.MediaFile;
import org.springframework.stereotype.Component;

@Component
public class MediaFileMapper {

    public MediaFileResponse toResponse(MediaFile mediaFile) {
        return new MediaFileResponse(
                mediaFile.getId(),
                mediaFile.getOriginalFileName(),
                mediaFile.getContentType(),
                mediaFile.getSizeBytes(),
                mediaFile.getUrl(),
                mediaFile.getCreatedAt());
    }
}
