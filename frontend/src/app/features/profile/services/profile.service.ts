import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Profile, ProfileRequest } from '../../../shared/models/profile.model';
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
// get(): Observable<Profile> {
//   return this.http.get<ApiResponse<Profile>>(`${environment.apiUrl}/profile`)
//     .pipe(map((response) => response.data));
// }
//
// update(request: ProfileRequest): Observable<Profile> {
//   return this.http.put<ApiResponse<Profile>>(`${environment.apiUrl}/profile`, request)
//     .pipe(map((response) => response.data));
// }

// ==========================================
// Nouvelle implémentation Supabase
// ==========================================

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private readonly supabase: SupabaseService) {}

  get(): Observable<Profile> {
    return from(
      this.supabase.client
        .from('profile')
        .select('*')
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  update(id: string, request: ProfileRequest): Observable<Profile> {
    return from(
      this.supabase.client
        .from('profile')
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

  private toModel(row: Record<string, unknown>): Profile {
    return {
      id: row['id'] as string,
      fullName: row['full_name'] as string,
      title: row['title'] as string | null,
      titleFr: row['title_fr'] as string | null,
      bio: row['bio'] as string | null,
      bioFr: row['bio_fr'] as string | null,
      avatarUrl: row['avatar_url'] as string | null,
      email: row['email'] as string | null,
      phone: row['phone'] as string | null,
      location: row['location'] as string | null,
      githubUrl: row['github_url'] as string | null,
      linkedinUrl: row['linkedin_url'] as string | null,
      twitterUrl: row['twitter_url'] as string | null,
      websiteUrl: row['website_url'] as string | null,
      resumeUrl: row['resume_url'] as string | null,
      resumeUrlFr: row['resume_url_fr'] as string | null,
      resumeFilename: row['resume_filename'] as string | null,
      resumeFilenameFr: row['resume_filename_fr'] as string | null,
      seoTitle: row['seo_title'] as string | null,
      seoDescription: row['seo_description'] as string | null,
      updatedAt: row['updated_at'] as string
    };
  }

  private toRow(request: ProfileRequest): Record<string, unknown> {
    return {
      full_name: request.fullName,
      title: request.title,
      title_fr: request.titleFr,
      bio: request.bio,
      bio_fr: request.bioFr,
      avatar_url: request.avatarUrl,
      email: request.email,
      phone: request.phone,
      location: request.location,
      github_url: request.githubUrl,
      linkedin_url: request.linkedinUrl,
      twitter_url: request.twitterUrl,
      website_url: request.websiteUrl,
      resume_url: request.resumeUrl,
      resume_url_fr: request.resumeUrlFr,
      resume_filename: request.resumeFilename,
      resume_filename_fr: request.resumeFilenameFr,
      seo_title: request.seoTitle,
      seo_description: request.seoDescription
    };
  }
}
