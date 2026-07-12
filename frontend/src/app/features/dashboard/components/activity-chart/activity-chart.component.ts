import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

const MONTH_LABELS = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const PROJECTS_SERIES = [2, 3, 4, 6, 8, 12];
const ARTICLES_SERIES = [1, 2, 3, 4, 6, 8];

@Component({
  selector: 'app-activity-chart',
  imports: [ChartModule],
  templateUrl: './activity-chart.component.html',
  styleUrl: './activity-chart.component.scss'
})
export class ActivityChartComponent {
  readonly chartData = {
    labels: MONTH_LABELS,
    datasets: [
      {
        label: 'Projects',
        data: PROJECTS_SERIES,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Articles',
        data: ARTICLES_SERIES,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  readonly chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { usePointStyle: true } }
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true }
    }
  };
}
