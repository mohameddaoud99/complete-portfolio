import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import en from '../../../assets/i18n/en.json';
import fr from '../../../assets/i18n/fr.json';

export type Lang = 'en' | 'fr';

const TRANSLATIONS: Record<Lang, Record<string, string>> = { en, fr };
const LANG_COOKIE = 'portfolio_lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  readonly lang = signal<Lang>(this.resolveInitialLang());

  setLang(lang: Lang): void {
    this.lang.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      this.document.cookie = `${LANG_COOKIE}=${lang};path=/;max-age=31536000`;
    }
  }

  toggle(): void {
    this.setLang(this.lang() === 'en' ? 'fr' : 'en');
  }

  t(key: string): string {
    return TRANSLATIONS[this.lang()][key] ?? TRANSLATIONS.en[key] ?? key;
  }

  /** Picks the French variant of a dynamic content field when active language is French. */
  pick(value: string | null | undefined, valueFr: string | null | undefined): string {
    if (this.lang() === 'fr' && valueFr) {
      return valueFr;
    }
    return value ?? '';
  }

  private resolveInitialLang(): Lang {
    if (!isPlatformBrowser(this.platformId)) {
      return 'en';
    }
    const match = this.document.cookie.match(new RegExp(`${LANG_COOKIE}=(en|fr)`));
    return (match?.[1] as Lang) ?? 'en';
  }
}
