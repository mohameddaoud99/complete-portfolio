import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';
import { Eye, MousePointerClick, TrendingUp, Users } from 'lucide-angular';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const PAGE_VIEWS = [120, 145, 98, 180, 210, 160, 190];
const VISITORS = [80, 95, 70, 120, 140, 110, 130];

@Component({
  selector: 'app-analytics-overview-page',
  imports: [ChartModule, PageHeaderComponent, StatCardComponent],
  templateUrl: './analytics-overview.page.html',
  styleUrl: './analytics-overview.page.scss'
})
export class AnalyticsOverviewPage {
  readonly eyeIcon = Eye;
  readonly usersIcon = Users;
  readonly clickIcon = MousePointerClick;
  readonly trendIcon = TrendingUp;

  readonly trafficChartData = {
    labels: DAY_LABELS,
    datasets: [
      {
        label: 'Page views',
        data: PAGE_VIEWS,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Unique visitors',
        data: VISITORS,
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.15)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  readonly trafficChartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { labels: { usePointStyle: true } } },
    scales: { x: { grid: { display: false } }, y: { beginAtZero: true } }
  };

  readonly topContentChartData = {
    labels: ['Portfolio Admin Dashboard', 'Task Management API', 'Securing Spring Boot with JWT', 'Weather Dashboard'],
    datasets: [
      {
        label: 'Views',
        data: [420, 310, 275, 190],
        backgroundColor: ['#6366f1', '#8b5cf6', '#0ea5e9', '#16a34a'],
        borderRadius: 6
      }
    ]
  };

  readonly topContentChartOptions = {
    indexAxis: 'y' as const,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { beginAtZero: true } }
  };

  readonly sourcesChartData = {
    labels: ['Direct', 'Search', 'Social', 'Referral'],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: ['#6366f1', '#0ea5e9', '#8b5cf6', '#f59e0b']
      }
    ]
  };

  readonly sourcesChartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as const, labels: { usePointStyle: true } } }
  };
}
