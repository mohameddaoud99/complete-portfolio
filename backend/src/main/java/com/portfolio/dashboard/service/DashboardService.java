package com.portfolio.dashboard.service;

import com.portfolio.article.repository.ArticleRepository;
import com.portfolio.dashboard.dto.DashboardStatisticsDto;
import com.portfolio.experience.repository.ExperienceRepository;
import com.portfolio.message.repository.MessageRepository;
import com.portfolio.project.repository.ProjectRepository;
import com.portfolio.skill.repository.SkillRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final ArticleRepository articleRepository;
    private final MessageRepository messageRepository;

    public DashboardService(ProjectRepository projectRepository, SkillRepository skillRepository,
            ExperienceRepository experienceRepository, ArticleRepository articleRepository,
            MessageRepository messageRepository) {
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
        this.experienceRepository = experienceRepository;
        this.articleRepository = articleRepository;
        this.messageRepository = messageRepository;
    }

    public DashboardStatisticsDto getStatistics() {
        return new DashboardStatisticsDto(
                projectRepository.count(),
                skillRepository.count(),
                experienceRepository.count(),
                articleRepository.count(),
                messageRepository.countByReadFalse());
    }
}
