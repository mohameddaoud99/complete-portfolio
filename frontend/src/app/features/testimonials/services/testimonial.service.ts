import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Testimonial, TestimonialRequest } from '../../../shared/models/testimonial.model';
import { SupabaseService } from '../../../core/supabase/supabase.service';

// ==========================================
// Legacy Spring Boot implementation
// Conservée uniquement comme référence
// ==========================================
// list():   GET    ${environment.apiUrl}/testimonials
// get(id):  GET    ${environment.apiUrl}/testimonials/:id
// create(): POST   ${environment.apiUrl}/testimonials
// update(): PUT    ${environment.apiUrl}/testimonials/:id
// delete(): DELETE ${environment.apiUrl}/testimonials/:id

// ==========================================
// Nouvelle implémentation Supabase
// ==========================================

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  constructor(private readonly supabase: SupabaseService) {}

  list(): Observable<Testimonial[]> {
    return from(
      this.supabase.client
        .from('testimonials')
        .select('*')
        .order('display_order')
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []).map(this.toModel);
        })
    );
  }

  get(id: string): Observable<Testimonial> {
    return from(
      this.supabase.client
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  create(request: TestimonialRequest): Observable<Testimonial> {
    return from(
      this.supabase.client
        .from('testimonials')
        .insert(this.toRow(request))
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  update(id: string, request: TestimonialRequest): Observable<Testimonial> {
    return from(
      this.supabase.client
        .from('testimonials')
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
        .from('testimonials')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) throw error;
        })
    );
  }

  private toModel(row: Record<string, unknown>): Testimonial {
    return {
      id: row['id'] as string,
      authorName: row['author_name'] as string,
      authorRole: row['author_role'] as string | null,
      authorRoleFr: row['author_role_fr'] as string | null,
      authorCompany: row['author_company'] as string | null,
      avatarUrl: row['avatar_url'] as string | null,
      quote: row['quote'] as string,
      quoteFr: row['quote_fr'] as string | null,
      published: row['published'] as boolean,
      displayOrder: row['display_order'] as number
    };
  }

  private toRow(request: TestimonialRequest): Record<string, unknown> {
    return {
      author_name: request.authorName,
      author_role: request.authorRole,
      author_role_fr: request.authorRoleFr,
      author_company: request.authorCompany,
      avatar_url: request.avatarUrl,
      quote: request.quote,
      quote_fr: request.quoteFr,
      published: request.published,
      display_order: request.displayOrder
    };
  }
}
