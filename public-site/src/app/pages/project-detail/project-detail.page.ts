import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArrowLeft, ExternalLink, Github, LucideAngularModule } from 'lucide-angular';
import { switchMap } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { I18nService } from '../../core/services/i18n.service';
import { MediaService } from '../../core/services/media.service';
import { SeoService } from '../../core/services/seo.service';
import { environment } from '../../../environments/environment';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Project } from '../../shared/models/project.model';

@Component({
  selector: 'app-project-detail-page',
  imports: [LucideAngularModule, RevealDirective, RouterLink],
  templateUrl: './project-detail.page.html',
  styleUrl: './project-detail.page.scss'
})
export class ProjectDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);
  private readonly seoService = inject(SeoService);
  private readonly mediaService = inject(MediaService);
  readonly i18n = inject(I18nService);

  readonly backIcon = ArrowLeft;
  readonly repoIcon = Github;
  readonly liveIcon = ExternalLink;

  readonly project = signal<Project | null>(null);
  readonly notFound = signal(false);

  readonly coverUrl = computed(() => this.mediaService.resolveUrl(this.project()?.imageUrl));
  readonly summary = computed(() => this.i18n.pick(this.project()?.summary, this.project()?.summaryFr));
  readonly description = computed(() => this.i18n.pick(this.project()?.description, this.project()?.descriptionFr));
  readonly techList = computed(() =>
    (this.project()?.techStack ?? '')
      .split(',')
      .map((tech) => tech.trim())
      .filter(Boolean)
  );
  readonly screenshotUrls = computed(() =>
    (this.project()?.screenshots ?? '')
      .split('\n')
      .map((url) => url.trim())
      .filter(Boolean)
      .map((url) => this.mediaService.resolveUrl(url))
  );

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap((params) => this.apiService.getProject(params.get('slug')!)))
      .subscribe({
        next: (project) => {
          this.project.set(project);
          const description = this.summary() || this.description() || '';
          this.seoService.apply({
            title: `${project.title} — Portfolio`,
            description,
            image: this.coverUrl() ?? undefined,
            url: `${environment.siteUrl}/projects/${project.slug}`,
            jsonLd: {
              '@context': 'https://schema.org',
              '@type': 'CreativeWork',
              name: project.title,
              description
            }
          });
        },
        error: () => this.notFound.set(true)
      });
  }
}
