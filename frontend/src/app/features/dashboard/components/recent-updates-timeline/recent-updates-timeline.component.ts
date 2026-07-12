import { Component } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';

interface TimelineEntry {
  title: string;
  date: string;
  icon: string;
  color: string;
}

const TIMELINE_ENTRIES: TimelineEntry[] = [
  { title: 'Published "Portfolio Admin Dashboard" project', date: 'Jul 5, 2026', icon: 'pi pi-folder', color: '#6366f1' },
  { title: 'Updated "Spring Security JWT" article', date: 'Jul 3, 2026', icon: 'pi pi-file-edit', color: '#8b5cf6' },
  { title: 'Added skill: Angular Signals', date: 'Jun 29, 2026', icon: 'pi pi-star', color: '#0ea5e9' },
  { title: 'Updated profile summary', date: 'Jun 24, 2026', icon: 'pi pi-user', color: '#16a34a' }
];

@Component({
  selector: 'app-recent-updates-timeline',
  imports: [TimelineModule],
  templateUrl: './recent-updates-timeline.component.html',
  styleUrl: './recent-updates-timeline.component.scss'
})
export class RecentUpdatesTimelineComponent {
  readonly entries = TIMELINE_ENTRIES;
}
