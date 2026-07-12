import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Message } from '../../../shared/models/message.model';

@Injectable({ providedIn: 'root' })
export class ContactMessageService {
  private readonly baseUrl = `${environment.apiUrl}/messages`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Message[]> {
    return this.http.get<ApiResponse<Message[]>>(this.baseUrl).pipe(map((response) => response.data));
  }

  get(id: string): Observable<Message> {
    return this.http.get<ApiResponse<Message>>(`${this.baseUrl}/${id}`).pipe(map((response) => response.data));
  }

  markAsRead(id: string): Observable<Message> {
    return this.http
      .patch<ApiResponse<Message>>(`${this.baseUrl}/${id}/read`, {})
      .pipe(map((response) => response.data));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`).pipe(map(() => undefined));
  }
}
