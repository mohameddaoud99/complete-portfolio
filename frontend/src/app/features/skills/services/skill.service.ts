import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Skill, SkillRequest } from '../../../shared/models/skill.model';

@Injectable({ providedIn: 'root' })
export class SkillService {
  private readonly baseUrl = `${environment.apiUrl}/skills`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Skill[]> {
    return this.http.get<ApiResponse<Skill[]>>(this.baseUrl).pipe(map((response) => response.data));
  }

  get(id: string): Observable<Skill> {
    return this.http.get<ApiResponse<Skill>>(`${this.baseUrl}/${id}`).pipe(map((response) => response.data));
  }

  create(request: SkillRequest): Observable<Skill> {
    return this.http.post<ApiResponse<Skill>>(this.baseUrl, request).pipe(map((response) => response.data));
  }

  update(id: string, request: SkillRequest): Observable<Skill> {
    return this.http.put<ApiResponse<Skill>>(`${this.baseUrl}/${id}`, request).pipe(map((response) => response.data));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`).pipe(map(() => undefined));
  }
}
