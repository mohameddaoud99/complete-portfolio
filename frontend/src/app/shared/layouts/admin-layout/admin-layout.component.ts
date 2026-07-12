import { Component, signal } from '@angular/core';
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
export class AdminLayoutComponent {
  readonly isMobile = window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches;
  readonly sidebarCollapsed = signal(this.isMobile);

  toggleSidebar(): void {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  onSidebarNavigate(): void {
    if (this.isMobile) {
      this.sidebarCollapsed.set(true);
    }
  }
}
