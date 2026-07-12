import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Project, ProjectRequest } from '../../../shared/models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly baseUrl = `${environment.apiUrl}/projects`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Project[]> {
    return this.http.get<ApiResponse<Project[]>>(this.baseUrl).pipe(map((response) => response.data));
  }

  get(id: string): Observable<Project> {
    return this.http.get<ApiResponse<Project>>(`${this.baseUrl}/${id}`).pipe(map((response) => response.data));
  }

  create(request: ProjectRequest): Observable<Project> {
    return this.http.post<ApiResponse<Project>>(this.baseUrl, request).pipe(map((response) => response.data));
  }

  update(id: string, request: ProjectRequest): Observable<Project> {
    return this.http
      .put<ApiResponse<Project>>(`${this.baseUrl}/${id}`, request)
      .pipe(map((response) => response.data));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`).pipe(map(() => undefined));
  }
}
