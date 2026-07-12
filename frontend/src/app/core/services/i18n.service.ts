import { Injectable, signal } from '@angular/core';

export interface Language {
  code: string;
  label: string;
}

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly availableLanguages: Language[] = [{ code: 'en', label: 'English' }];
  readonly currentLanguage = signal<Language>(this.availableLanguages[0]);
}
