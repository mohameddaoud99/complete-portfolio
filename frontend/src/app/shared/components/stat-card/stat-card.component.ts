import { Component, computed, input } from '@angular/core';
import { LucideAngularModule, LucideIconData, TrendingDown, TrendingUp } from 'lucide-angular';

@Component({
  selector: 'app-stat-card',
  imports: [LucideAngularModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {
  readonly icon = input.required<LucideIconData>();
  readonly title = input.required<string>();
  readonly value = input.required<number | string>();
  readonly description = input<string>('');
  readonly trend = input<number | null>(null);

  readonly trendIcon = computed(() => ((this.trend() ?? 0) >= 0 ? TrendingUp : TrendingDown));
  readonly isPositiveTrend = computed(() => (this.trend() ?? 0) >= 0);
}
