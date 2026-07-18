import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Education, EducationRequest } from '../../../shared/models/education.model';
import { SupabaseService } from '../../../core/supabase/supabase.service';

// ==========================================
// Legacy Spring Boot implementation
// Conservée uniquement comme référence
// ==========================================
// list():   GET    ${environment.apiUrl}/education
// get(id):  GET    ${environment.apiUrl}/education/:id
// create(): POST   ${environment.apiUrl}/education
// update(): PUT    ${environment.apiUrl}/education/:id
// delete(): DELETE ${environment.apiUrl}/education/:id

// ==========================================
// Nouvelle implémentation Supabase
// ==========================================

@Injectable({ providedIn: 'root' })
export class EducationService {
  constructor(private readonly supabase: SupabaseService) {}

  list(): Observable<Education[]> {
    return from(
      this.supabase.client
        .from('education')
        .select('*')
        .order('display_order')
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []).map(this.toModel);
        })
    );
  }

  get(id: string): Observable<Education> {
    return from(
      this.supabase.client
        .from('education')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  create(request: EducationRequest): Observable<Education> {
    return from(
      this.supabase.client
        .from('education')
        .insert(this.toRow(request))
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  update(id: string, request: EducationRequest): Observable<Education> {
    return from(
      this.supabase.client
        .from('education')
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
        .from('education')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) throw error;
        })
    );
  }

  private toModel(row: Record<string, unknown>): Education {
    return {
      id: row['id'] as string,
      institution: row['institution'] as string,
      degree: row['degree'] as string,
      degreeFr: row['degree_fr'] as string | null,
      field: row['field'] as string | null,
      startDate: row['start_date'] as string,
      endDate: row['end_date'] as string | null,
      description: row['description'] as string | null,
      descriptionFr: row['description_fr'] as string | null,
      displayOrder: row['display_order'] as number
    };
  }

  private toRow(request: EducationRequest): Record<string, unknown> {
    return {
      institution: request.institution,
      degree: request.degree,
      degree_fr: request.degreeFr,
      field: request.field,
      start_date: request.startDate,
      end_date: request.endDate,
      description: request.description,
      description_fr: request.descriptionFr,
      display_order: request.displayOrder
    };
  }
}
