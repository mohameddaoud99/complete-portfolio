import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';

const MOBILE_BREAKPOINT_QUERY = '(max-width: 768px)';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  private readonly mq = window.matchMedia(MOBILE_BREAKPOINT_QUERY);
  readonly isMobile = signal(this.mq.matches);
  readonly sidebarCollapsed = signal(this.mq.matches);

  private readonly onMqChange = (e: MediaQueryListEvent) => {
    this.isMobile.set(e.matches);
    if (e.matches) {
      this.sidebarCollapsed.set(true);
    }
  };

  ngOnInit(): void {
    this.mq.addEventListener('change', this.onMqChange);
  }

  ngOnDestroy(): void {
    this.mq.removeEventListener('change', this.onMqChange);
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  onSidebarNavigate(): void {
    if (this.isMobile()) {
      this.sidebarCollapsed.set(true);
    }
  }
}
