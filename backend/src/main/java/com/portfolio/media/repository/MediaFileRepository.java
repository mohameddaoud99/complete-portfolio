package com.portfolio.media.repository;

import com.portfolio.media.entity.MediaFile;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaFileRepository extends JpaRepository<MediaFile, UUID> {

    List<MediaFile> findAllByOrderByCreatedAtDesc();
}
