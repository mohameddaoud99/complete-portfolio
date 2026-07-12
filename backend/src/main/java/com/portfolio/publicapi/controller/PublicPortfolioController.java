package com.portfolio.publicapi.controller;

import com.portfolio.article.dto.ArticleResponse;
import com.portfolio.article.service.ArticleService;
import com.portfolio.certification.dto.CertificationResponse;
import com.portfolio.certification.service.CertificationService;
import com.portfolio.common.ApiResponse;
import com.portfolio.education.dto.EducationResponse;
import com.portfolio.education.service.EducationService;
import com.portfolio.experience.dto.ExperienceResponse;
import com.portfolio.experience.service.ExperienceService;
import com.portfolio.profile.dto.ProfileResponse;
import com.portfolio.profile.service.ProfileService;
import com.portfolio.project.dto.ProjectResponse;
import com.portfolio.project.service.ProjectService;
import com.portfolio.skill.dto.SkillResponse;
import com.portfolio.skill.service.SkillService;
import com.portfolio.testimonial.dto.TestimonialResponse;
import com.portfolio.testimonial.service.TestimonialService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Read-only endpoints consumed by the public portfolio site. All content is sourced from
 * the same services the admin dashboard uses; only published/visible records are exposed.
 */
@RestController
@RequestMapping("/api/public")
public class PublicPortfolioController {

    private final ProfileService profileService;
    private final SkillService skillService;
    private final ExperienceService experienceService;
    private final EducationService educationService;
    private final CertificationService certificationService;
    private final TestimonialService testimonialService;
    private final ProjectService projectService;
    private final ArticleService articleService;

    public PublicPortfolioController(ProfileService profileService, SkillService skillService,
            ExperienceService experienceService, EducationService educationService,
            CertificationService certificationService, TestimonialService testimonialService,
            ProjectService projectService, ArticleService articleService) {
        this.profileService = profileService;
        this.skillService = skillService;
        this.experienceService = experienceService;
        this.educationService = educationService;
        this.certificationService = certificationService;
        this.testimonialService = testimonialService;
        this.projectService = projectService;
        this.articleService = articleService;
    }

    @GetMapping("/profile")
    public ApiResponse<ProfileResponse> profile() {
        return ApiResponse.success(profileService.getProfile());
    }

    @GetMapping("/skills")
    public ApiResponse<List<SkillResponse>> skills() {
        return ApiResponse.success(skillService.list());
    }

    @GetMapping("/experiences")
    public ApiResponse<List<ExperienceResponse>> experiences() {
        return ApiResponse.success(experienceService.list());
    }

    @GetMapping("/education")
    public ApiResponse<List<EducationResponse>> education() {
        return ApiResponse.success(educationService.list());
    }

    @GetMapping("/certifications")
    public ApiResponse<List<CertificationResponse>> certifications() {
        return ApiResponse.success(certificationService.list());
    }

    @GetMapping("/testimonials")
    public ApiResponse<List<TestimonialResponse>> testimonials() {
        return ApiResponse.success(testimonialService.listPublished());
    }

    @GetMapping("/projects")
    public ApiResponse<List<ProjectResponse>> projects() {
        return ApiResponse.success(projectService.list());
    }

    @GetMapping("/projects/{slug}")
    public ApiResponse<ProjectResponse> project(@PathVariable String slug) {
        return ApiResponse.success(projectService.getBySlug(slug));
    }

    @GetMapping("/articles")
    public ApiResponse<List<ArticleResponse>> articles() {
        return ApiResponse.success(articleService.listPublished());
    }

    @GetMapping("/articles/{slug}")
    public ApiResponse<ArticleResponse> article(@PathVariable String slug) {
        return ApiResponse.success(articleService.getPublishedBySlug(slug));
    }
}
