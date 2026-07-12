package com.portfolio.certification.mapper;

import com.portfolio.certification.dto.CertificationResponse;
import com.portfolio.certification.entity.Certification;
import org.springframework.stereotype.Component;

@Component
public class CertificationMapper {

    public CertificationResponse toResponse(Certification certification) {
        return new CertificationResponse(
                certification.getId(),
                certification.getName(),
                certification.getIssuer(),
                certification.getIssueDate(),
                certification.getExpiryDate(),
                certification.getCredentialUrl(),
                certification.getBadgeImageUrl(),
                certification.getDisplayOrder());
    }
}
