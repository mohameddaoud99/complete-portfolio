package com.portfolio.certification.service;

import com.portfolio.certification.dto.CertificationRequest;
import com.portfolio.certification.dto.CertificationResponse;
import com.portfolio.certification.entity.Certification;
import com.portfolio.certification.mapper.CertificationMapper;
import com.portfolio.certification.repository.CertificationRepository;
import com.portfolio.common.exception.ResourceNotFoundException;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CertificationService {

    private final CertificationRepository certificationRepository;
    private final CertificationMapper certificationMapper;

    public CertificationService(CertificationRepository certificationRepository, CertificationMapper certificationMapper) {
        this.certificationRepository = certificationRepository;
        this.certificationMapper = certificationMapper;
    }

    public List<CertificationResponse> list() {
        return certificationRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(certificationMapper::toResponse).toList();
    }

    public CertificationResponse get(UUID id) {
        return certificationMapper.toResponse(findOrThrow(id));
    }

    @Transactional
    public CertificationResponse create(CertificationRequest request) {
        Certification certification = new Certification();
        applyRequest(certification, request);
        return certificationMapper.toResponse(certificationRepository.save(certification));
    }

    @Transactional
    public CertificationResponse update(UUID id, CertificationRequest request) {
        Certification certification = findOrThrow(id);
        applyRequest(certification, request);
        return certificationMapper.toResponse(certification);
    }

    @Transactional
    public void delete(UUID id) {
        certificationRepository.delete(findOrThrow(id));
    }

    private Certification findOrThrow(UUID id) {
        return certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification not found: " + id));
    }

    private void applyRequest(Certification certification, CertificationRequest request) {
        certification.setName(request.name());
        certification.setIssuer(request.issuer());
        certification.setIssueDate(request.issueDate());
        certification.setExpiryDate(request.expiryDate());
        certification.setCredentialUrl(request.credentialUrl());
        certification.setBadgeImageUrl(request.badgeImageUrl());
        certification.setDisplayOrder(request.displayOrder());
    }
}
