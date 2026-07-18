import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { DashboardStatistics } from '../../../shared/models/dashboard-statistics.model';
import { SupabaseService } from '../../../core/supabase/supabase.service';

// ==========================================
// Legacy Spring Boot implementation
// Conservée uniquement comme référence
// ==========================================
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { environment } from '../../../../environments/environment';
// import { ApiResponse } from '../../../shared/models/api-response.model';
//
// getStatistics(): Observable<DashboardStatistics> {
//   return this.http.get<ApiResponse<DashboardStatistics>>(
//     `${environment.apiUrl}/dashboard/statistics`
//   ).pipe(map((response) => response.data));
// }

// ==========================================
// Nouvelle implémentation Supabase
// ==========================================

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private readonly supabase: SupabaseService) {}

  getStatistics(): Observable<DashboardStatistics> {
    return from(this.fetchStatistics());
  }

  private async fetchStatistics(): Promise<DashboardStatistics> {
    const [projects, skills, experiences, articles, messages] = await Promise.all([
      this.supabase.client.from('projects').select('*', { count: 'exact', head: true }),
      this.supabase.client.from('skills').select('*', { count: 'exact', head: true }),
      this.supabase.client.from('experiences').select('*', { count: 'exact', head: true }),
      this.supabase.client.from('articles').select('*', { count: 'exact', head: true }),
      this.supabase.client.from('messages').select('*', { count: 'exact', head: true }).eq('read', false)
    ]);

    return {
      totalProjects: projects.count ?? 0,
      totalSkills: skills.count ?? 0,
      totalExperiences: experiences.count ?? 0,
      totalArticles: articles.count ?? 0,
      newMessages: messages.count ?? 0
    };
  }
}
