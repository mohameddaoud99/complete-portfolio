package com.portfolio.testimonial.repository;

import com.portfolio.testimonial.entity.Testimonial;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestimonialRepository extends JpaRepository<Testimonial, UUID> {

    List<Testimonial> findAllByOrderByDisplayOrderAsc();

    List<Testimonial> findAllByPublishedTrueOrderByDisplayOrderAsc();
}
