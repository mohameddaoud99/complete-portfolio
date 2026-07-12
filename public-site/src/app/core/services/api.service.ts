import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../shared/models/api-response.model';
import { Article } from '../../shared/models/article.model';
import { Certification } from '../../shared/models/certification.model';
import { ContactMessageRequest } from '../../shared/models/contact-message.model';
import { Education } from '../../shared/models/education.model';
import { Experience } from '../../shared/models/experience.model';
import { Profile } from '../../shared/models/profile.model';
import { Project } from '../../shared/models/project.model';
import { Skill } from '../../shared/models/skill.model';
import { Testimonial } from '../../shared/models/testimonial.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/public`;

  private get<T>(path: string): Observable<T> {
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}${path}`).pipe(map((response) => response.data));
  }

  getProfile(): Observable<Profile> {
    return this.get<Profile>('/profile');
  }

  getSkills(): Observable<Skill[]> {
    return this.get<Skill[]>('/skills');
  }

  getExperiences(): Observable<Experience[]> {
    return this.get<Experience[]>('/experiences');
  }

  getEducation(): Observable<Education[]> {
    return this.get<Education[]>('/education');
  }

  getCertifications(): Observable<Certification[]> {
    return this.get<Certification[]>('/certifications');
  }

  getTestimonials(): Observable<Testimonial[]> {
    return this.get<Testimonial[]>('/testimonials');
  }

  getProjects(): Observable<Project[]> {
    return this.get<Project[]>('/projects');
  }

  getProject(slug: string): Observable<Project> {
    return this.get<Project>(`/projects/${slug}`);
  }

  getArticles(): Observable<Article[]> {
    return this.get<Article[]>('/articles');
  }

  getArticle(slug: string): Observable<Article> {
    return this.get<Article>(`/articles/${slug}`);
  }

  sendMessage(request: ContactMessageRequest): Observable<void> {
    return this.http
      .post<ApiResponse<void>>(`${environment.apiUrl}/messages`, request)
      .pipe(map(() => undefined));
  }
}
