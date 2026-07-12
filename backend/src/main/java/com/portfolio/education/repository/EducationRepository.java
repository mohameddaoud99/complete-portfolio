package com.portfolio.education.repository;

import com.portfolio.education.entity.Education;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EducationRepository extends JpaRepository<Education, UUID> {

    List<Education> findAllByOrderByDisplayOrderAsc();
}
