package com.portfolio.experience.repository;

import com.portfolio.experience.entity.Experience;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepository extends JpaRepository<Experience, UUID> {

    List<Experience> findAllByOrderByDisplayOrderAsc();
}
