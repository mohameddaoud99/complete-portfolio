import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Education, EducationRequest } from '../../../shared/models/education.model';

@Injectable({ providedIn: 'root' })
export class EducationService {
  private readonly baseUrl = `${environment.apiUrl}/education`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Education[]> {
    return this.http.get<ApiResponse<Education[]>>(this.baseUrl).pipe(map((response) => response.data));
  }

  get(id: string): Observable<Education> {
    return this.http.get<ApiResponse<Education>>(`${this.baseUrl}/${id}`).pipe(map((response) => response.data));
  }

  create(request: EducationRequest): Observable<Education> {
    return this.http.post<ApiResponse<Education>>(this.baseUrl, request).pipe(map((response) => response.data));
  }

  update(id: string, request: EducationRequest): Observable<Education> {
    return this.http
      .put<ApiResponse<Education>>(`${this.baseUrl}/${id}`, request)
      .pipe(map((response) => response.data));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`).pipe(map(() => undefined));
  }
}
