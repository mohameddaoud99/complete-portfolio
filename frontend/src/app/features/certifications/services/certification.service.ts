import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Certification, CertificationRequest } from '../../../shared/models/certification.model';
import { SupabaseService } from '../../../core/supabase/supabase.service';

// ==========================================
// Legacy Spring Boot implementation
// Conservée uniquement comme référence
// ==========================================
// list():   GET    ${environment.apiUrl}/certifications
// get(id):  GET    ${environment.apiUrl}/certifications/:id
// create(): POST   ${environment.apiUrl}/certifications
// update(): PUT    ${environment.apiUrl}/certifications/:id
// delete(): DELETE ${environment.apiUrl}/certifications/:id

// ==========================================
// Nouvelle implémentation Supabase
// ==========================================

@Injectable({ providedIn: 'root' })
export class CertificationService {
  constructor(private readonly supabase: SupabaseService) {}

  list(): Observable<Certification[]> {
    return from(
      this.supabase.client
        .from('certifications')
        .select('*')
        .order('display_order')
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []).map(this.toModel);
        })
    );
  }

  get(id: string): Observable<Certification> {
    return from(
      this.supabase.client
        .from('certifications')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  create(request: CertificationRequest): Observable<Certification> {
    return from(
      this.supabase.client
        .from('certifications')
        .insert(this.toRow(request))
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  update(id: string, request: CertificationRequest): Observable<Certification> {
    return from(
      this.supabase.client
        .from('certifications')
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
        .from('certifications')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) throw error;
        })
    );
  }

  private toModel(row: Record<string, unknown>): Certification {
    return {
      id: row['id'] as string,
      name: row['name'] as string,
      issuer: row['issuer'] as string,
      issueDate: row['issue_date'] as string,
      expiryDate: row['expiry_date'] as string | null,
      credentialUrl: row['credential_url'] as string | null,
      badgeImageUrl: row['badge_image_url'] as string | null,
      images: row['images'] as string | null,
      displayOrder: row['display_order'] as number
    };
  }

  private toRow(request: CertificationRequest): Record<string, unknown> {
    return {
      name: request.name,
      issuer: request.issuer,
      issue_date: request.issueDate,
      expiry_date: request.expiryDate,
      credential_url: request.credentialUrl,
      badge_image_url: request.badgeImageUrl,
      images: request.images,
      display_order: request.displayOrder
    };
  }
}
