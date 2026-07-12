import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Testimonial, TestimonialRequest } from '../../../shared/models/testimonial.model';

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  private readonly baseUrl = `${environment.apiUrl}/testimonials`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Testimonial[]> {
    return this.http.get<ApiResponse<Testimonial[]>>(this.baseUrl).pipe(map((response) => response.data));
  }

  get(id: string): Observable<Testimonial> {
    return this.http.get<ApiResponse<Testimonial>>(`${this.baseUrl}/${id}`).pipe(map((response) => response.data));
  }

  create(request: TestimonialRequest): Observable<Testimonial> {
    return this.http.post<ApiResponse<Testimonial>>(this.baseUrl, request).pipe(map((response) => response.data));
  }

  update(id: string, request: TestimonialRequest): Observable<Testimonial> {
    return this.http
      .put<ApiResponse<Testimonial>>(`${this.baseUrl}/${id}`, request)
      .pipe(map((response) => response.data));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`).pipe(map(() => undefined));
  }
}
