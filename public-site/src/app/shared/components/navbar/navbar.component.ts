import { Component, signal } from '@angular/core';
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
  readonly menuIcon = Menu;
  readonly closeIcon = X;
  readonly sunIcon = SunMedium;
  readonly moonIcon = MoonStar;
  readonly langIcon = Languages;

  readonly navLinks = NAV_LINKS;
  readonly mobileOpen = signal(false);

  constructor(
    readonly i18n: I18nService,
    readonly themeService: ThemeService
  ) {}

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
