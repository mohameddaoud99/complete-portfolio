package com.portfolio.testimonial.service;

import com.portfolio.common.exception.ResourceNotFoundException;
import com.portfolio.testimonial.dto.TestimonialRequest;
import com.portfolio.testimonial.dto.TestimonialResponse;
import com.portfolio.testimonial.entity.Testimonial;
import com.portfolio.testimonial.mapper.TestimonialMapper;
import com.portfolio.testimonial.repository.TestimonialRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;
    private final TestimonialMapper testimonialMapper;

    public TestimonialService(TestimonialRepository testimonialRepository, TestimonialMapper testimonialMapper) {
        this.testimonialRepository = testimonialRepository;
        this.testimonialMapper = testimonialMapper;
    }

    public List<TestimonialResponse> list() {
        return testimonialRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(testimonialMapper::toResponse).toList();
    }

    public List<TestimonialResponse> listPublished() {
        return testimonialRepository.findAllByPublishedTrueOrderByDisplayOrderAsc().stream()
                .map(testimonialMapper::toResponse).toList();
    }

    public TestimonialResponse get(UUID id) {
        return testimonialMapper.toResponse(findOrThrow(id));
    }

    @Transactional
    public TestimonialResponse create(TestimonialRequest request) {
        Testimonial testimonial = new Testimonial();
        applyRequest(testimonial, request);
        return testimonialMapper.toResponse(testimonialRepository.save(testimonial));
    }

    @Transactional
    public TestimonialResponse update(UUID id, TestimonialRequest request) {
        Testimonial testimonial = findOrThrow(id);
        applyRequest(testimonial, request);
        return testimonialMapper.toResponse(testimonial);
    }

    @Transactional
    public void delete(UUID id) {
        testimonialRepository.delete(findOrThrow(id));
    }

    private Testimonial findOrThrow(UUID id) {
        return testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found: " + id));
    }

    private void applyRequest(Testimonial testimonial, TestimonialRequest request) {
        testimonial.setAuthorName(request.authorName());
        testimonial.setAuthorRole(request.authorRole());
        testimonial.setAuthorRoleFr(request.authorRoleFr());
        testimonial.setAuthorCompany(request.authorCompany());
        testimonial.setAvatarUrl(request.avatarUrl());
        testimonial.setQuote(request.quote());
        testimonial.setQuoteFr(request.quoteFr());
        testimonial.setPublished(request.published());
        testimonial.setDisplayOrder(request.displayOrder());
    }
}
