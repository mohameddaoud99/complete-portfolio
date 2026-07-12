import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Profile, ProfileRequest } from '../../../shared/models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private readonly http: HttpClient) {}

  get(): Observable<Profile> {
    return this.http.get<ApiResponse<Profile>>(`${environment.apiUrl}/profile`).pipe(map((response) => response.data));
  }

  update(request: ProfileRequest): Observable<Profile> {
    return this.http
      .put<ApiResponse<Profile>>(`${environment.apiUrl}/profile`, request)
      .pipe(map((response) => response.data));
  }
}
