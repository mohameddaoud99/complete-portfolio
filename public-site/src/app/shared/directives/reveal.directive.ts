import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Input, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';

export type RevealVariant = 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'fade';

@Directive({
  selector: '[appReveal]'
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealVariant: RevealVariant = 'slide-up';
  @Input() revealDelay = 0;
  @Input() revealThreshold = 0.12;

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const el = this.elementRef.nativeElement;
    el.classList.add('reveal', `reveal--${this.revealVariant}`);

    if (this.revealDelay > 0) {
      el.style.transitionDelay = `${this.revealDelay}ms`;
    }

    if (!isPlatformBrowser(this.platformId)) {
      el.classList.add('reveal--visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('reveal--visible');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: this.revealThreshold }
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
