import { UpperCasePipe } from '@angular/common';
import { Component, computed, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Bell, LucideAngularModule, Menu, Moon, Search, Sun } from 'lucide-angular';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PopoverModule } from 'primeng/popover';
import { SelectModule } from 'primeng/select';
import { AuthService } from '../../../core/auth/auth.service';
import { I18nService, Language } from '../../../core/services/i18n.service';
import { AppNotification, NotificationService } from '../../../core/services/notification.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-topbar',
  imports: [
    FormsModule,
    UpperCasePipe,
    LucideAngularModule,
    AvatarModule,
    BadgeModule,
    ButtonModule,
    MenuModule,
    PopoverModule,
    SelectModule
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  private readonly authService = inject(AuthService);
  private readonly themeService = inject(ThemeService);
  private readonly i18nService = inject(I18nService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);

  readonly toggleSidebar = output<void>();

  readonly menuIcon = Menu;
  readonly searchIcon = Search;
  readonly bellIcon = Bell;
  readonly sunIcon = Sun;
  readonly moonIcon = Moon;

  readonly currentUser = this.authService.currentUser;
  readonly notifications = this.notificationService.notifications;
  readonly unreadCount = computed(() => this.notifications().filter((n) => !n.read).length);
  readonly languages = this.i18nService.availableLanguages;
  readonly currentLanguage = this.i18nService.currentLanguage;
  readonly theme = this.themeService.theme;

  readonly profileMenuItems: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' },
    { label: 'Settings', icon: 'pi pi-cog', routerLink: '/settings' },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];

  toggleTheme(): void {
    this.themeService.toggle();
  }

  onLanguageChange(language: Language): void {
    this.i18nService.currentLanguage.set(language);
  }

  markNotificationRead(notification: AppNotification): void {
    this.notificationService.markAsRead(notification.id);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: () => this.router.navigate(['/auth/login'])
    });
  }
}
