import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';

export interface StorageUploadResult {
  path: string;
  publicUrl: string;
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly bucket = 'portfolio-media';

  constructor(private readonly supabase: SupabaseService) {}

  upload(file: File): Observable<StorageUploadResult> {
    const ext = file.name.split('.').pop() ?? '';
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    return from(
      this.supabase.client.storage
        .from(this.bucket)
        .upload(path, file, { cacheControl: '3600', upsert: false })
        .then(({ data, error }) => {
          if (error) throw error;
          const { data: urlData } = this.supabase.client.storage
            .from(this.bucket)
            .getPublicUrl(data.path);
          return { path: data.path, publicUrl: urlData.publicUrl };
        })
    );
  }

  remove(path: string): Observable<void> {
    return from(
      this.supabase.client.storage
        .from(this.bucket)
        .remove([path])
        .then(({ error }) => {
          if (error) throw error;
        })
    );
  }

  uploadResume(file: File): Observable<StorageUploadResult> {
    const path = 'resumes/current-cv.pdf';
    return from(
      this.supabase.client.storage
        .from(this.bucket)
        .upload(path, file, { cacheControl: '0', upsert: true })
        .then(({ data, error }) => {
          if (error) throw error;
          const { data: urlData } = this.supabase.client.storage
            .from(this.bucket)
            .getPublicUrl(data.path);
          const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;
          return { path: data.path, publicUrl };
        })
    );
  }

  removeResume(): Observable<void> {
    return this.remove('resumes/current-cv.pdf');
  }

  getPublicUrl(path: string): string {
    const { data } = this.supabase.client.storage.from(this.bucket).getPublicUrl(path);
    return data.publicUrl;
  }
}
