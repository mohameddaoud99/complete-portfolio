import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Experience, ExperienceRequest } from '../../../shared/models/experience.model';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private readonly baseUrl = `${environment.apiUrl}/experiences`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Experience[]> {
    return this.http.get<ApiResponse<Experience[]>>(this.baseUrl).pipe(map((response) => response.data));
  }

  get(id: string): Observable<Experience> {
    return this.http.get<ApiResponse<Experience>>(`${this.baseUrl}/${id}`).pipe(map((response) => response.data));
  }

  create(request: ExperienceRequest): Observable<Experience> {
    return this.http.post<ApiResponse<Experience>>(this.baseUrl, request).pipe(map((response) => response.data));
  }

  update(id: string, request: ExperienceRequest): Observable<Experience> {
    return this.http
      .put<ApiResponse<Experience>>(`${this.baseUrl}/${id}`, request)
      .pipe(map((response) => response.data));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`).pipe(map(() => undefined));
  }
}
