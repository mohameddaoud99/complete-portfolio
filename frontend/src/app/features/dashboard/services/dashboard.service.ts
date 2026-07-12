import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { DashboardStatistics } from '../../../shared/models/dashboard-statistics.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private readonly http: HttpClient) {}

  getStatistics(): Observable<DashboardStatistics> {
    return this.http
      .get<ApiResponse<DashboardStatistics>>(`${environment.apiUrl}/dashboard/statistics`)
      .pipe(map((response) => response.data));
  }
}
