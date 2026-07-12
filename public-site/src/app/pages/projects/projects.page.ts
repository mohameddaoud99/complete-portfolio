import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { I18nService } from '../../core/services/i18n.service';
import { SeoService } from '../../core/services/seo.service';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Project } from '../../shared/models/project.model';

@Component({
  selector: 'app-projects-page',
  imports: [ProjectCardComponent, RevealDirective, SectionHeadingComponent, SkeletonComponent],
  templateUrl: './projects.page.html',
  styleUrl: './projects.page.scss'
})
export class ProjectsPage implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly seoService = inject(SeoService);
  readonly i18n = inject(I18nService);

  readonly projects = signal<Project[]>([]);
  readonly activeCategory = signal<string | null>(null);

  readonly categories = computed(() => {
    const set = new Set(this.projects().map((project) => project.category).filter((c): c is string => !!c));
    return Array.from(set);
  });

  readonly filteredProjects = computed(() => {
    const category = this.activeCategory();
    return category ? this.projects().filter((project) => project.category === category) : this.projects();
  });

  ngOnInit(): void {
    this.seoService.apply({
      title: `${this.i18n.t('projects.title')} — Portfolio`,
      description: this.i18n.t('projects.subtitle')
    });
    this.apiService.getProjects().subscribe((projects) => this.projects.set(projects));
  }

  setCategory(category: string | null): void {
    this.activeCategory.set(category);
  }
}
