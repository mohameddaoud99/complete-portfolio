import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { Article } from '../../../../shared/models/article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-list-page',
  imports: [RouterLink, DatePipe, ButtonModule, TableModule, TagModule, PageHeaderComponent],
  templateUrl: './article-list.page.html',
  styleUrl: './article-list.page.scss'
})
export class ArticleListPage implements OnInit {
  private readonly articleService = inject(ArticleService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  readonly articles = signal<Article[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.loading.set(true);
    this.articleService.list().subscribe((articles) => {
      this.articles.set(articles);
      this.loading.set(false);
    });
  }

  edit(article: Article): void {
    this.router.navigate(['/articles', article.id, 'edit']);
  }

  confirmDelete(article: Article): void {
    this.confirmationService.confirm({
      header: 'Delete article',
      message: `Are you sure you want to delete "${article.title}"?`,
      acceptButtonProps: { severity: 'danger', label: 'Delete' },
      rejectButtonProps: { severity: 'secondary', label: 'Cancel', text: true },
      accept: () => this.delete(article)
    });
  }

  private delete(article: Article): void {
    this.articleService.delete(article.id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Article deleted' });
      this.loadArticles();
    });
  }
}
