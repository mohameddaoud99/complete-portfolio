import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Languages, LucideAngularModule, Menu, MoonStar, SunMedium, X } from 'lucide-angular';
import { I18nService } from '../../../core/services/i18n.service';
import { ThemeService } from '../../../core/services/theme.service';

interface NavLink {
  labelKey: string;
  path: string;
}

const NAV_LINKS: NavLink[] = [
  { labelKey: 'nav.home', path: '/' },
  { labelKey: 'nav.about', path: '/about' },
  { labelKey: 'nav.skills', path: '/skills' },
  { labelKey: 'nav.experience', path: '/experience' },
  { labelKey: 'nav.projects', path: '/projects' },
  { labelKey: 'nav.articles', path: '/articles' },
  { labelKey: 'nav.contact', path: '/contact' }
];

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private readonly platformId = inject(PLATFORM_ID);

  readonly menuIcon = Menu;
  readonly closeIcon = X;
  readonly sunIcon = SunMedium;
  readonly moonIcon = MoonStar;
  readonly langIcon = Languages;

  readonly navLinks = NAV_LINKS;
  readonly mobileOpen = signal(false);
  readonly scrolled = signal(false);

  constructor(
    readonly i18n: I18nService,
    readonly themeService: ThemeService
  ) {}

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > 48);
    }
  }

  toggleMobile(): void {
    this.mobileOpen.update((open) => !open);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  toggleLang(): void {
    this.i18n.toggle();
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
