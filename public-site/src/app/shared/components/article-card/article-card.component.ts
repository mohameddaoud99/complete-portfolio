import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../core/services/i18n.service';
import { MediaService } from '../../../core/services/media.service';
import { Article } from '../../models/article.model';

function estimateReadTime(html: string | null): number {
  const text = (html ?? '').replace(/<[^>]*>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

@Component({
  selector: 'app-article-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  readonly article = input.required<Article>();

  readonly title = computed(() => this.i18n.pick(this.article().title, this.article().titleFr));
  readonly excerpt = computed(() => this.i18n.pick(this.article().excerpt, this.article().excerptFr));
  readonly coverUrl = computed(() => this.mediaService.resolveUrl(this.article().coverImageUrl));
  readonly readTime = computed(() =>
    estimateReadTime(this.i18n.pick(this.article().contentHtml, this.article().contentHtmlFr))
  );

  constructor(
    private readonly mediaService: MediaService,
    readonly i18n: I18nService
  ) {}
}
