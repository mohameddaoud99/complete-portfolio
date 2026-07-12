package com.portfolio.testimonial.controller;

import com.portfolio.common.ApiResponse;
import com.portfolio.testimonial.dto.TestimonialRequest;
import com.portfolio.testimonial.dto.TestimonialResponse;
import com.portfolio.testimonial.service.TestimonialService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

    private final TestimonialService testimonialService;

    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping
    public ApiResponse<List<TestimonialResponse>> list() {
        return ApiResponse.success(testimonialService.list());
    }

    @GetMapping("/{id}")
    public ApiResponse<TestimonialResponse> get(@PathVariable UUID id) {
        return ApiResponse.success(testimonialService.get(id));
    }

    @PostMapping
    public ApiResponse<TestimonialResponse> create(@Valid @RequestBody TestimonialRequest request) {
        return ApiResponse.success("Testimonial created", testimonialService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<TestimonialResponse> update(@PathVariable UUID id, @Valid @RequestBody TestimonialRequest request) {
        return ApiResponse.success("Testimonial updated", testimonialService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable UUID id) {
        testimonialService.delete(id);
        return ApiResponse.success("Testimonial deleted", null);
    }
}
