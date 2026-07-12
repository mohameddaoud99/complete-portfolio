package com.portfolio.dashboard.controller;

import com.portfolio.common.ApiResponse;
import com.portfolio.dashboard.dto.DashboardStatisticsDto;
import com.portfolio.dashboard.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/statistics")
    public ApiResponse<DashboardStatisticsDto> getStatistics() {
        return ApiResponse.success(dashboardService.getStatistics());
    }
}
