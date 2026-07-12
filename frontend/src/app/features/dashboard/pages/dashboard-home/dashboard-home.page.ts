import { Component, OnInit, computed, signal } from '@angular/core';
import { Briefcase, FolderKanban, Mail, Newspaper, Sparkles } from 'lucide-angular';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';
import { DashboardStatistics } from '../../../../shared/models/dashboard-statistics.model';
import { ActivityChartComponent } from '../../components/activity-chart/activity-chart.component';
import { MessagesPreviewComponent } from '../../components/messages-preview/messages-preview.component';
import { QuickActionsComponent } from '../../components/quick-actions/quick-actions.component';
import { RecentUpdatesTimelineComponent } from '../../components/recent-updates-timeline/recent-updates-timeline.component';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-home',
  imports: [
    PageHeaderComponent,
    StatCardComponent,
    ActivityChartComponent,
    RecentUpdatesTimelineComponent,
    MessagesPreviewComponent,
    QuickActionsComponent
  ],
  templateUrl: './dashboard-home.page.html',
  styleUrl: './dashboard-home.page.scss'
})
export class DashboardHomePage implements OnInit {
  private readonly statistics = signal<DashboardStatistics | null>(null);

  readonly statCards = computed(() => {
    const stats = this.statistics();
    return [
      {
        icon: FolderKanban,
        title: 'Total Projects',
        value: stats?.totalProjects ?? 0,
        trend: 8,
        description: 'Published portfolio projects'
      },
      {
        icon: Sparkles,
        title: 'Total Skills',
        value: stats?.totalSkills ?? 0,
        trend: 4,
        description: 'Technologies and tools listed'
      },
      {
        icon: Briefcase,
        title: 'Total Experiences',
        value: stats?.totalExperiences ?? 0,
        trend: 0,
        description: 'Professional experience entries'
      },
      {
        icon: Newspaper,
        title: 'Total Articles',
        value: stats?.totalArticles ?? 0,
        trend: 12,
        description: 'Published blog articles'
      },
      {
        icon: Mail,
        title: 'New Messages',
        value: stats?.newMessages ?? 0,
        trend: -5,
        description: 'Unread contact messages'
      }
    ];
  });

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getStatistics().subscribe((data) => this.statistics.set(data));
  }
}
