import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Certification, CertificationRequest } from '../../../shared/models/certification.model';

@Injectable({ providedIn: 'root' })
export class CertificationService {
  private readonly baseUrl = `${environment.apiUrl}/certifications`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Certification[]> {
    return this.http.get<ApiResponse<Certification[]>>(this.baseUrl).pipe(map((response) => response.data));
  }

  get(id: string): Observable<Certification> {
    return this.http.get<ApiResponse<Certification>>(`${this.baseUrl}/${id}`).pipe(map((response) => response.data));
  }

  create(request: CertificationRequest): Observable<Certification> {
    return this.http.post<ApiResponse<Certification>>(this.baseUrl, request).pipe(map((response) => response.data));
  }

  update(id: string, request: CertificationRequest): Observable<Certification> {
    return this.http
      .put<ApiResponse<Certification>>(`${this.baseUrl}/${id}`, request)
      .pipe(map((response) => response.data));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`).pipe(map(() => undefined));
  }
}
