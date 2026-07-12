import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../shared/models/api-response.model';
import { MediaFile } from '../../shared/models/media-file.model';

@Injectable({ providedIn: 'root' })
export class MediaService {
  constructor(private readonly http: HttpClient) {}

  list(): Observable<MediaFile[]> {
    return this.http
      .get<ApiResponse<MediaFile[]>>(`${environment.apiUrl}/media`)
      .pipe(map((response) => response.data));
  }

  upload(file: File): Observable<MediaFile> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<ApiResponse<MediaFile>>(`${environment.apiUrl}/media`, formData)
      .pipe(map((response) => response.data));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${environment.apiUrl}/media/${id}`).pipe(map(() => undefined));
  }

  resolveUrl(relativeUrl: string | null | undefined): string | null {
    if (!relativeUrl) {
      return null;
    }
    return relativeUrl.startsWith('http') ? relativeUrl : `${environment.mediaBaseUrl}${relativeUrl}`;
  }
}
