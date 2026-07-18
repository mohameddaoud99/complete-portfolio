import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { MediaFile } from '../../shared/models/media-file.model';
import { SupabaseService } from '../supabase/supabase.service';
import { StorageService } from './storage.service';

// ==========================================
// Legacy Spring Boot implementation
// Conservée uniquement comme référence
// ==========================================
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
// import { ApiResponse } from '../../shared/models/api-response.model';
//
// list():   GET    ${environment.apiUrl}/media
// upload(): POST   ${environment.apiUrl}/media  (FormData with 'file' field)
// delete(): DELETE ${environment.apiUrl}/media/:id
//
// The backend handled storage to Supabase Storage and recorded metadata
// in the media_files table. Now handled directly by the client.
//
// resolveUrl(relativeUrl): string
//   → relativeUrl.startsWith('http') ? relativeUrl : `${environment.mediaBaseUrl}${relativeUrl}`

// ==========================================
// Nouvelle implémentation Supabase Storage
// ==========================================

@Injectable({ providedIn: 'root' })
export class MediaService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly storageService: StorageService
  ) {}

  list(): Observable<MediaFile[]> {
    return from(
      this.supabase.client
        .from('media_files')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []).map(this.toModel);
        })
    );
  }

  upload(file: File): Observable<MediaFile> {
    return from(this.uploadAndRecord(file));
  }

  delete(id: string): Observable<void> {
    return from(this.deleteAndRemove(id));
  }

  // Public URLs from Supabase Storage are already absolute — no transformation needed.
  resolveUrl(url: string | null | undefined): string | null {
    return url ?? null;
  }

  private async uploadAndRecord(file: File): Promise<MediaFile> {
    const ext = file.name.split('.').pop() ?? '';
    const storagePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await this.supabase.client.storage
      .from('portfolio-media')
      .upload(storagePath, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    const { data: urlData } = this.supabase.client.storage
      .from('portfolio-media')
      .getPublicUrl(storagePath);

    const { data, error: insertError } = await this.supabase.client
      .from('media_files')
      .insert({
        file_name: storagePath,
        original_file_name: file.name,
        content_type: file.type,
        size_bytes: file.size,
        url: urlData.publicUrl
      })
      .select()
      .single();

    if (insertError) throw insertError;
    return this.toModel(data);
  }

  private async deleteAndRemove(id: string): Promise<void> {
    const { data, error: fetchError } = await this.supabase.client
      .from('media_files')
      .select('file_name')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    const storagePath = (data as Record<string, unknown>)['file_name'] as string;

    const { error: storageError } = await this.supabase.client.storage
      .from('portfolio-media')
      .remove([storagePath]);

    if (storageError) throw storageError;

    const { error: dbError } = await this.supabase.client
      .from('media_files')
      .delete()
      .eq('id', id);

    if (dbError) throw dbError;
  }

  private toModel(row: Record<string, unknown>): MediaFile {
    return {
      id: row['id'] as string,
      originalFileName: row['original_file_name'] as string,
      contentType: row['content_type'] as string | null,
      sizeBytes: row['size_bytes'] as number,
      url: row['url'] as string,
      createdAt: row['created_at'] as string
    };
  }
}
