import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, PLATFORM_ID, inject, signal } from '@angular/core';
import { ArrowUp, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-back-to-top',
  imports: [LucideAngularModule],
  templateUrl: './back-to-top.component.html',
  styleUrl: './back-to-top.component.scss'
})
export class BackToTopComponent {
  private readonly platformId = inject(PLATFORM_ID);

  readonly arrowIcon = ArrowUp;
  readonly visible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.visible.set(window.scrollY > 480);
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
