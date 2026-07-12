import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Search, LucideAngularModule } from 'lucide-angular';
import { ApiService } from '../../core/services/api.service';
import { I18nService } from '../../core/services/i18n.service';
import { SeoService } from '../../core/services/seo.service';
import { ArticleCardComponent } from '../../shared/components/article-card/article-card.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Article } from '../../shared/models/article.model';

@Component({
  selector: 'app-articles-page',
  imports: [ArticleCardComponent, FormsModule, LucideAngularModule, RevealDirective, SectionHeadingComponent, SkeletonComponent],
  templateUrl: './articles.page.html',
  styleUrl: './articles.page.scss'
})
export class ArticlesPage implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly seoService = inject(SeoService);
  readonly i18n = inject(I18nService);

  readonly searchIcon = Search;
  readonly articles = signal<Article[]>([]);
  readonly searchTerm = signal('');
  readonly activeCategory = signal<string | null>(null);

  readonly categories = computed(() => {
    const set = new Set(this.articles().map((article) => article.category).filter((c): c is string => !!c));
    return Array.from(set);
  });

  readonly filteredArticles = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const category = this.activeCategory();
    return this.articles().filter((article) => {
      const title = this.i18n.pick(article.title, article.titleFr).toLowerCase();
      const excerpt = (this.i18n.pick(article.excerpt, article.excerptFr) ?? '').toLowerCase();
      const matchesTerm = !term || title.includes(term) || excerpt.includes(term);
      const matchesCategory = !category || article.category === category;
      return matchesTerm && matchesCategory;
    });
  });

  ngOnInit(): void {
    this.seoService.apply({
      title: `${this.i18n.t('articles.title')} — Portfolio`,
      description: this.i18n.t('articles.subtitle')
    });
    this.apiService.getArticles().subscribe((articles) => this.articles.set(articles));
  }

  setCategory(category: string | null): void {
    this.activeCategory.set(category);
  }
}
