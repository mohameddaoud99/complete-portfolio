package com.portfolio.project.repository;

import com.portfolio.project.entity.Project;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, UUID> {

    List<Project> findAllByOrderByDisplayOrderAsc();

    Optional<Project> findBySlug(String slug);

    boolean existsBySlug(String slug);
}
