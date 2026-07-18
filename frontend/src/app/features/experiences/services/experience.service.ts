import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Experience, ExperienceRequest } from '../../../shared/models/experience.model';
import { SupabaseService } from '../../../core/supabase/supabase.service';

// ==========================================
// Legacy Spring Boot implementation
// Conservée uniquement comme référence
// ==========================================
// list():   GET    ${environment.apiUrl}/experiences
// get(id):  GET    ${environment.apiUrl}/experiences/:id
// create(): POST   ${environment.apiUrl}/experiences
// update(): PUT    ${environment.apiUrl}/experiences/:id
// delete(): DELETE ${environment.apiUrl}/experiences/:id

// ==========================================
// Nouvelle implémentation Supabase
// ==========================================

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  constructor(private readonly supabase: SupabaseService) {}

  list(): Observable<Experience[]> {
    return from(
      this.supabase.client
        .from('experiences')
        .select('*')
        .order('display_order')
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []).map(this.toModel);
        })
    );
  }

  get(id: string): Observable<Experience> {
    return from(
      this.supabase.client
        .from('experiences')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  create(request: ExperienceRequest): Observable<Experience> {
    return from(
      this.supabase.client
        .from('experiences')
        .insert(this.toRow(request))
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  update(id: string, request: ExperienceRequest): Observable<Experience> {
    return from(
      this.supabase.client
        .from('experiences')
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
        .from('experiences')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) throw error;
        })
    );
  }

  private toModel(row: Record<string, unknown>): Experience {
    return {
      id: row['id'] as string,
      company: row['company'] as string,
      role: row['role'] as string,
      roleFr: row['role_fr'] as string | null,
      location: row['location'] as string | null,
      startDate: row['start_date'] as string,
      endDate: row['end_date'] as string | null,
      description: row['description'] as string | null,
      descriptionFr: row['description_fr'] as string | null,
      achievements: row['achievements'] as string | null,
      achievementsFr: row['achievements_fr'] as string | null,
      displayOrder: row['display_order'] as number
    };
  }

  private toRow(request: ExperienceRequest): Record<string, unknown> {
    return {
      company: request.company,
      role: request.role,
      role_fr: request.roleFr,
      location: request.location,
      start_date: request.startDate,
      end_date: request.endDate,
      description: request.description,
      description_fr: request.descriptionFr,
      achievements: request.achievements,
      achievements_fr: request.achievementsFr,
      display_order: request.displayOrder
    };
  }
}
