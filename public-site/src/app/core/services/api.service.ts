import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { Article } from '../../shared/models/article.model';
import { Certification } from '../../shared/models/certification.model';
import { ContactMessageRequest } from '../../shared/models/contact-message.model';
import { Education } from '../../shared/models/education.model';
import { Experience } from '../../shared/models/experience.model';
import { Profile } from '../../shared/models/profile.model';
import { Project } from '../../shared/models/project.model';
import { Skill } from '../../shared/models/skill.model';
import { Testimonial } from '../../shared/models/testimonial.model';

// ==========================================
// Legacy Spring Boot implementation
// Conservée uniquement comme référence
// ==========================================
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { environment } from '../../../environments/environment';
// import { ApiResponse } from '../../shared/models/api-response.model';
//
// All methods called GET ${environment.apiUrl}/public/<resource>
// e.g. GET /api/public/profile, GET /api/public/skills, etc.
// sendMessage() called POST ${environment.apiUrl}/messages
//
// private get<T>(path: string): Observable<T> {
//   return this.http.get<ApiResponse<T>>(`${this.baseUrl}${path}`)
//     .pipe(map((response) => response.data));
// }

// ==========================================
// Nouvelle implémentation Supabase
// Toutes les données publiques via Supabase Database (RLS: SELECT pour anon)
// Contact form via INSERT public sur la table messages
// ==========================================

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly supabase = inject(SupabaseService);

  getProfile(): Observable<Profile> {
    return from(
      this.supabase.client
        .from('profile')
        .select('*')
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.mapProfile(data);
        })
    );
  }

  getSkills(): Observable<Skill[]> {
    return from(
      this.supabase.client
        .from('skills')
        .select('*')
        .order('display_order')
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []).map(this.mapSkill);
        })
    );
  }

  getExperiences(): Observable<Experience[]> {
    return from(
      this.supabase.client
        .from('experiences')
        .select('*')
        .order('display_order')
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []).map(this.mapExperience);
        })
    );
  }

  getEducation(): Observable<Education[]> {
    return from(
      this.supabase.client
        .from('education')
        .select('*')
        .order('display_order')
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []).map(this.mapEducation);
        })
    );
  }

  getCertifications(): Observable<Certification[]> {
    return from(
      this.supabase.client
        .from('certifications')
        .select('*')
        .order('display_order')
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []).map(this.mapCertification);
        })
    );
  }

  getTestimonials(): Observable<Testimonial[]> {
    return from(
      this.supabase.client
        .from('testimonials')
        .select('*')
        .eq('published', true)
        .order('display_order')
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []).map(this.mapTestimonial);
        })
    );
  }

  getProjects(): Observable<Project[]> {
    return from(
      this.supabase.client
        .from('projects')
        .select('*')
        .order('display_order')
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []).map(this.mapProject);
        })
    );
  }

  getProject(slug: string): Observable<Project> {
    return from(
      this.supabase.client
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.mapProject(data);
        })
    );
  }

  getArticles(): Observable<Article[]> {
    return from(
      this.supabase.client
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []).map(this.mapArticle);
        })
    );
  }

  getArticle(slug: string): Observable<Article> {
    return from(
      this.supabase.client
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.mapArticle(data);
        })
    );
  }

  sendMessage(request: ContactMessageRequest): Observable<void> {
    return from(
      this.supabase.client
        .from('messages')
        .insert({
          sender_name: request.senderName,
          sender_email: request.senderEmail,
          subject: request.subject,
          body: request.body
        })
        .then(({ error }) => {
          if (error) throw error;
        })
    );
  }

  // ==========================================
  // Mappers snake_case (DB) → camelCase (model)
  // ==========================================

  private mapProfile(row: Record<string, unknown>): Profile {
    return {
      id: row['id'] as string,
      fullName: row['full_name'] as string,
      title: row['title'] as string | null,
      titleFr: row['title_fr'] as string | null,
      bio: row['bio'] as string | null,
      bioFr: row['bio_fr'] as string | null,
      avatarUrl: row['avatar_url'] as string | null,
      email: row['email'] as string | null,
      phone: row['phone'] as string | null,
      location: row['location'] as string | null,
      githubUrl: row['github_url'] as string | null,
      linkedinUrl: row['linkedin_url'] as string | null,
      twitterUrl: row['twitter_url'] as string | null,
      websiteUrl: row['website_url'] as string | null,
      resumeUrl: row['resume_url'] as string | null,
      resumeUrlFr: row['resume_url_fr'] as string | null,
      resumeFilename: row['resume_filename'] as string | null,
      resumeFilenameFr: row['resume_filename_fr'] as string | null,
      seoTitle: row['seo_title'] as string | null,
      seoDescription: row['seo_description'] as string | null,
      updatedAt: row['updated_at'] as string
    };
  }

  private mapSkill(row: Record<string, unknown>): Skill {
    return {
      id: row['id'] as string,
      name: row['name'] as string,
      category: row['category'] as string,
      proficiency: row['proficiency'] as number,
      icon: row['icon'] as string | null,
      yearsExperience: row['years_experience'] as number,
      displayOrder: row['display_order'] as number
    };
  }

  private mapExperience(row: Record<string, unknown>): Experience {
    return {
      id: row['id'] as string,
      company: row['company'] as string,
      role: row['role'] as string,
      roleFr: row['role_fr'] as string | null,
      location: row['location'] as string | null,
      startDate: row['start_date'] as string,
      endDate: row['end_date'] as string | null,
      description: row['description'] as string | null,
      descriptionFr: row['description_fr'] as string | null,
      achievements: row['achievements'] as string | null,
      achievementsFr: row['achievements_fr'] as string | null,
      displayOrder: row['display_order'] as number
    };
  }

  private mapEducation(row: Record<string, unknown>): Education {
    return {
      id: row['id'] as string,
      institution: row['institution'] as string,
      degree: row['degree'] as string,
      degreeFr: row['degree_fr'] as string | null,
      field: row['field'] as string | null,
      startDate: row['start_date'] as string,
      endDate: row['end_date'] as string | null,
      description: row['description'] as string | null,
      descriptionFr: row['description_fr'] as string | null,
      displayOrder: row['display_order'] as number
    };
  }

  private mapCertification(row: Record<string, unknown>): Certification {
    return {
      id: row['id'] as string,
      name: row['name'] as string,
      issuer: row['issuer'] as string,
      issueDate: row['issue_date'] as string,
      expiryDate: row['expiry_date'] as string | null,
      credentialUrl: row['credential_url'] as string | null,
      badgeImageUrl: row['badge_image_url'] as string | null,
      images: row['images'] as string | null,
      displayOrder: row['display_order'] as number
    };
  }

  private mapTestimonial(row: Record<string, unknown>): Testimonial {
    return {
      id: row['id'] as string,
      authorName: row['author_name'] as string,
      authorRole: row['author_role'] as string | null,
      authorRoleFr: row['author_role_fr'] as string | null,
      authorCompany: row['author_company'] as string | null,
      avatarUrl: row['avatar_url'] as string | null,
      quote: row['quote'] as string,
      quoteFr: row['quote_fr'] as string | null,
      published: row['published'] as boolean,
      displayOrder: row['display_order'] as number
    };
  }

  private mapProject(row: Record<string, unknown>): Project {
    return {
      id: row['id'] as string,
      title: row['title'] as string,
      slug: row['slug'] as string,
      summary: row['summary'] as string | null,
      summaryFr: row['summary_fr'] as string | null,
      description: row['description'] as string | null,
      descriptionFr: row['description_fr'] as string | null,
      techStack: row['tech_stack'] as string | null,
      repoUrl: row['repo_url'] as string | null,
      liveUrl: row['live_url'] as string | null,
      imageUrl: row['image_url'] as string | null,
      category: row['category'] as string | null,
      screenshots: row['screenshots'] as string | null,
      featured: row['featured'] as boolean,
      displayOrder: row['display_order'] as number
    };
  }

  private mapArticle(row: Record<string, unknown>): Article {
    return {
      id: row['id'] as string,
      title: row['title'] as string,
      titleFr: row['title_fr'] as string | null,
      slug: row['slug'] as string,
      excerpt: row['excerpt'] as string | null,
      excerptFr: row['excerpt_fr'] as string | null,
      contentHtml: row['content_html'] as string | null,
      contentHtmlFr: row['content_html_fr'] as string | null,
      coverImageUrl: row['cover_image_url'] as string | null,
      images: row['images'] as string | null,
      category: row['category'] as string | null,
      tags: row['tags'] as string | null,
      featured: row['featured'] as boolean,
      published: row['published'] as boolean,
      publishedAt: row['published_at'] as string | null,
      createdAt: row['created_at'] as string
    };
  }
}
