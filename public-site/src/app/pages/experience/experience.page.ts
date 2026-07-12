import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { LucideAngularModule, MapPin } from 'lucide-angular';
import { ApiService } from '../../core/services/api.service';
import { I18nService } from '../../core/services/i18n.service';
import { SeoService } from '../../core/services/seo.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Experience } from '../../shared/models/experience.model';

@Component({
  selector: 'app-experience-page',
  imports: [DatePipe, LucideAngularModule, RevealDirective, SectionHeadingComponent, SkeletonComponent],
  templateUrl: './experience.page.html',
  styleUrl: './experience.page.scss'
})
export class ExperiencePage implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly seoService = inject(SeoService);
  readonly i18n = inject(I18nService);

  readonly locationIcon = MapPin;
  readonly experiences = signal<Experience[]>([]);

  ngOnInit(): void {
    this.seoService.apply({
      title: `${this.i18n.t('experience.title')} — Portfolio`,
      description: this.i18n.t('experience.subtitle')
    });
    this.apiService.getExperiences().subscribe((experiences) => this.experiences.set(experiences));
  }

  achievementList(experience: Experience): string[] {
    const raw = this.i18n.pick(experience.achievements, experience.achievementsFr);
    if (!raw) {
      return [];
    }
    return raw
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }
}
