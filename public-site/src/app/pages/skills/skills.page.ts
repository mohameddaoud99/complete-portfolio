import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ApiService } from '../../core/services/api.service';
import { I18nService } from '../../core/services/i18n.service';
import { SeoService } from '../../core/services/seo.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Skill } from '../../shared/models/skill.model';
import { resolveSkillIcon } from '../../shared/utils/skill-icon.util';

@Component({
  selector: 'app-skills-page',
  imports: [LucideAngularModule, RevealDirective, SectionHeadingComponent, SkeletonComponent],
  templateUrl: './skills.page.html',
  styleUrl: './skills.page.scss'
})
export class SkillsPage implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly seoService = inject(SeoService);
  readonly i18n = inject(I18nService);

  readonly skills = signal<Skill[]>([]);
  readonly activeCategory = signal<string | null>(null);

  readonly categories = computed(() => {
    const set = new Set(this.skills().map((skill) => skill.category));
    return Array.from(set);
  });

  readonly filteredSkills = computed(() => {
    const category = this.activeCategory();
    return category ? this.skills().filter((skill) => skill.category === category) : this.skills();
  });

  readonly resolveIcon = resolveSkillIcon;

  ngOnInit(): void {
    this.seoService.apply({
      title: `${this.i18n.t('skills.title')} — Portfolio`,
      description: this.i18n.t('skills.subtitle')
    });
    this.apiService.getSkills().subscribe((skills) => this.skills.set(skills));
  }

  setCategory(category: string | null): void {
    this.activeCategory.set(category);
  }
}
