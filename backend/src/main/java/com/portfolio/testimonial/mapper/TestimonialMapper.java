package com.portfolio.testimonial.mapper;

import com.portfolio.testimonial.dto.TestimonialResponse;
import com.portfolio.testimonial.entity.Testimonial;
import org.springframework.stereotype.Component;

@Component
public class TestimonialMapper {

    public TestimonialResponse toResponse(Testimonial testimonial) {
        return new TestimonialResponse(
                testimonial.getId(),
                testimonial.getAuthorName(),
                testimonial.getAuthorRole(),
                testimonial.getAuthorRoleFr(),
                testimonial.getAuthorCompany(),
                testimonial.getAvatarUrl(),
                testimonial.getQuote(),
                testimonial.getQuoteFr(),
                testimonial.isPublished(),
                testimonial.getDisplayOrder());
    }
}
