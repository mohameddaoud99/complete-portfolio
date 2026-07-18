import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Project, ProjectRequest } from '../../../shared/models/project.model';
import { SupabaseService } from '../../../core/supabase/supabase.service';

// ==========================================
// Legacy Spring Boot implementation
// Conservée uniquement comme référence
// ==========================================
// list():   GET    ${environment.apiUrl}/projects
// get(id):  GET    ${environment.apiUrl}/projects/:id
// create(): POST   ${environment.apiUrl}/projects
// update(): PUT    ${environment.apiUrl}/projects/:id
// delete(): DELETE ${environment.apiUrl}/projects/:id

// ==========================================
// Nouvelle implémentation Supabase
// ==========================================

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private readonly supabase: SupabaseService) {}

  list(): Observable<Project[]> {
    return from(
      this.supabase.client
        .from('projects')
        .select('*')
        .order('display_order')
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []).map(this.toModel);
        })
    );
  }

  get(id: string): Observable<Project> {
    return from(
      this.supabase.client
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  create(request: ProjectRequest): Observable<Project> {
    return from(
      this.supabase.client
        .from('projects')
        .insert(this.toRow(request))
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  update(id: string, request: ProjectRequest): Observable<Project> {
    return from(
      this.supabase.client
        .from('projects')
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
        .from('projects')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) throw error;
        })
    );
  }

  private toModel(row: Record<string, unknown>): Project {
    return {
      id: row['id'] as string,
      title: row['title'] as string,
      slug: row['slug'] as string,
      summary: row['summary'] as string | null,
      summaryFr: row['summary_fr'] as string | null,
      description: row['description'] as string | null,
      descriptionFr: row['description_fr'] as string | null,
      techStack: row['tech_stack'] as string | null,
      repoUrl: row['repo_url'] as string | null,
      liveUrl: row['live_url'] as string | null,
      imageUrl: row['image_url'] as string | null,
      category: row['category'] as string | null,
      screenshots: row['screenshots'] as string | null,
      featured: row['featured'] as boolean,
      displayOrder: row['display_order'] as number
    };
  }

  private toRow(request: ProjectRequest): Record<string, unknown> {
    return {
      title: request.title,
      summary: request.summary,
      summary_fr: request.summaryFr,
      description: request.description,
      description_fr: request.descriptionFr,
      tech_stack: request.techStack,
      repo_url: request.repoUrl,
      live_url: request.liveUrl,
      image_url: request.imageUrl,
      category: request.category,
      screenshots: request.screenshots,
      featured: request.featured,
      display_order: request.displayOrder
    };
  }
}
