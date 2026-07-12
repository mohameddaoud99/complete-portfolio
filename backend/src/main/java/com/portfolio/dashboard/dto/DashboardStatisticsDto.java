package com.portfolio.dashboard.dto;

public record DashboardStatisticsDto(
        long totalProjects,
        long totalSkills,
        long totalExperiences,
        long totalArticles,
        long newMessages) {
}
