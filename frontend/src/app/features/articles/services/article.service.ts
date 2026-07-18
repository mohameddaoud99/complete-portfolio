import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Article, ArticleRequest } from '../../../shared/models/article.model';
import { SupabaseService } from '../../../core/supabase/supabase.service';

// ==========================================
// Legacy Spring Boot implementation
// Conservée uniquement comme référence
// ==========================================
// list():   GET    ${environment.apiUrl}/articles
// get(id):  GET    ${environment.apiUrl}/articles/:id
// create(): POST   ${environment.apiUrl}/articles
// update(): PUT    ${environment.apiUrl}/articles/:id
// delete(): DELETE ${environment.apiUrl}/articles/:id

// ==========================================
// Nouvelle implémentation Supabase
// ==========================================

@Injectable({ providedIn: 'root' })
export class ArticleService {
  constructor(private readonly supabase: SupabaseService) {}

  list(): Observable<Article[]> {
    return from(
      this.supabase.client
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []).map(this.toModel);
        })
    );
  }

  get(id: string): Observable<Article> {
    return from(
      this.supabase.client
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  create(request: ArticleRequest): Observable<Article> {
    return from(
      this.supabase.client
        .from('articles')
        .insert(this.toRow(request))
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  update(id: string, request: ArticleRequest): Observable<Article> {
    return from(
      this.supabase.client
        .from('articles')
        .update(this.toRow(request))
        .eq('id', id)
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  delete(id: string): Observable<void> {
    return from(
      this.supabase.client
        .from('articles')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) throw error;
        })
    );
  }

  private toModel(row: Record<string, unknown>): Article {
    return {
      id: row['id'] as string,
      title: row['title'] as string,
      titleFr: row['title_fr'] as string | null,
      slug: row['slug'] as string,
      excerpt: row['excerpt'] as string | null,
      excerptFr: row['excerpt_fr'] as string | null,
      contentHtml: row['content_html'] as string | null,
      contentHtmlFr: row['content_html_fr'] as string | null,
      coverImageUrl: row['cover_image_url'] as string | null,
      category: row['category'] as string | null,
      tags: row['tags'] as string | null,
      featured: row['featured'] as boolean,
      published: row['published'] as boolean,
      publishedAt: row['published_at'] as string | null,
      createdAt: row['created_at'] as string
    };
  }

  private toRow(request: ArticleRequest): Record<string, unknown> {
    return {
      title: request.title,
      title_fr: request.titleFr,
      excerpt: request.excerpt,
      excerpt_fr: request.excerptFr,
      content_html: request.contentHtml,
      content_html_fr: request.contentHtmlFr,
      cover_image_url: request.coverImageUrl,
      category: request.category,
      tags: request.tags,
      featured: request.featured,
      published: request.published
    };
  }
}
