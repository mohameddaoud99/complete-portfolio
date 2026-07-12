import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArrowLeft, LucideAngularModule } from 'lucide-angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { switchMap } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { I18nService } from '../../core/services/i18n.service';
import { MediaService } from '../../core/services/media.service';
import { SeoService } from '../../core/services/seo.service';
import { environment } from '../../../environments/environment';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Article } from '../../shared/models/article.model';

function estimateReadTime(html: string | null): number {
  const text = (html ?? '').replace(/<[^>]*>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

@Component({
  selector: 'app-article-detail-page',
  imports: [DatePipe, LucideAngularModule, RevealDirective, RouterLink],
  templateUrl: './article-detail.page.html',
  styleUrl: './article-detail.page.scss'
})
export class ArticleDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);
  private readonly seoService = inject(SeoService);
  private readonly mediaService = inject(MediaService);
  private readonly sanitizer = inject(DomSanitizer);
  readonly i18n = inject(I18nService);

  readonly backIcon = ArrowLeft;

  readonly article = signal<Article | null>(null);
  readonly notFound = signal(false);

  readonly title = computed(() => this.i18n.pick(this.article()?.title, this.article()?.titleFr));
  readonly coverUrl = computed(() => this.mediaService.resolveUrl(this.article()?.coverImageUrl));
  readonly readTime = computed(() =>
    estimateReadTime(this.i18n.pick(this.article()?.contentHtml, this.article()?.contentHtmlFr))
  );
  readonly tagList = computed(() =>
    (this.article()?.tags ?? '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  );
  readonly content = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(
      this.i18n.pick(this.article()?.contentHtml, this.article()?.contentHtmlFr) ?? ''
    )
  );

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap((params) => this.apiService.getArticle(params.get('slug')!)))
      .subscribe({
        next: (article) => {
          this.article.set(article);
          const title = this.title();
          const description = this.i18n.pick(article.excerpt, article.excerptFr) ?? '';
          this.seoService.apply({
            title: `${title} — Portfolio`,
            description,
            image: this.coverUrl() ?? undefined,
            url: `${environment.siteUrl}/articles/${article.slug}`,
            jsonLd: {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: title,
              description,
              datePublished: article.publishedAt
            }
          });
        },
        error: () => this.notFound.set(true)
      });
  }
}
