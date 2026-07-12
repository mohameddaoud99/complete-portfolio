import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Article, ArticleRequest } from '../../../shared/models/article.model';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly baseUrl = `${environment.apiUrl}/articles`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Article[]> {
    return this.http.get<ApiResponse<Article[]>>(this.baseUrl).pipe(map((response) => response.data));
  }

  get(id: string): Observable<Article> {
    return this.http.get<ApiResponse<Article>>(`${this.baseUrl}/${id}`).pipe(map((response) => response.data));
  }

  create(request: ArticleRequest): Observable<Article> {
    return this.http.post<ApiResponse<Article>>(this.baseUrl, request).pipe(map((response) => response.data));
  }

  update(id: string, request: ArticleRequest): Observable<Article> {
    return this.http
      .put<ApiResponse<Article>>(`${this.baseUrl}/${id}`, request)
      .pipe(map((response) => response.data));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`).pipe(map(() => undefined));
  }
}
