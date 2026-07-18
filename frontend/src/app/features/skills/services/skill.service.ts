import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Skill, SkillRequest } from '../../../shared/models/skill.model';
import { SupabaseService } from '../../../core/supabase/supabase.service';

// ==========================================
// Legacy Spring Boot implementation
// Conservée uniquement comme référence
// ==========================================
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { environment } from '../../../../environments/environment';
// import { ApiResponse } from '../../../shared/models/api-response.model';
//
// list():   GET    ${environment.apiUrl}/skills
// get(id):  GET    ${environment.apiUrl}/skills/:id
// create(): POST   ${environment.apiUrl}/skills
// update(): PUT    ${environment.apiUrl}/skills/:id
// delete(): DELETE ${environment.apiUrl}/skills/:id

// ==========================================
// Nouvelle implémentation Supabase
// ==========================================

@Injectable({ providedIn: 'root' })
export class SkillService {
  constructor(private readonly supabase: SupabaseService) {}

  list(): Observable<Skill[]> {
    return from(
      this.supabase.client
        .from('skills')
        .select('*')
        .order('display_order')
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []).map(this.toModel);
        })
    );
  }

  get(id: string): Observable<Skill> {
    return from(
      this.supabase.client
        .from('skills')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  create(request: SkillRequest): Observable<Skill> {
    return from(
      this.supabase.client
        .from('skills')
        .insert(this.toRow(request))
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  update(id: string, request: SkillRequest): Observable<Skill> {
    return from(
      this.supabase.client
        .from('skills')
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
        .from('skills')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) throw error;
        })
    );
  }

  private toModel(row: Record<string, unknown>): Skill {
    return {
      id: row['id'] as string,
      name: row['name'] as string,
      category: row['category'] as string,
      proficiency: row['proficiency'] as number,
      icon: row['icon'] as string | null,
      yearsExperience: row['years_experience'] as number,
      displayOrder: row['display_order'] as number
    };
  }

  private toRow(request: SkillRequest): Record<string, unknown> {
    return {
      name: request.name,
      category: request.category,
      proficiency: request.proficiency,
      icon: request.icon,
      years_experience: request.yearsExperience,
      display_order: request.displayOrder
    };
  }
}
