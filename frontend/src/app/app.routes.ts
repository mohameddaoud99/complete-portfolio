import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login.page').then((m) => m.LoginPage)
      },
      { path: '', pathMatch: 'full', redirectTo: 'login' }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-home/dashboard-home.page').then((m) => m.DashboardHomePage)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/pages/profile-edit/profile-edit.page').then((m) => m.ProfileEditPage)
      },
      {
        path: 'skills',
        loadComponent: () => import('./features/skills/pages/skill-list/skill-list.page').then((m) => m.SkillListPage)
      },
      {
        path: 'skills/new',
        loadComponent: () => import('./features/skills/pages/skill-form/skill-form.page').then((m) => m.SkillFormPage)
      },
      {
        path: 'skills/:id/edit',
        loadComponent: () => import('./features/skills/pages/skill-form/skill-form.page').then((m) => m.SkillFormPage)
      },
      {
        path: 'experiences',
        loadComponent: () =>
          import('./features/experiences/pages/experience-list/experience-list.page').then((m) => m.ExperienceListPage)
      },
      {
        path: 'experiences/new',
        loadComponent: () =>
          import('./features/experiences/pages/experience-form/experience-form.page').then((m) => m.ExperienceFormPage)
      },
      {
        path: 'experiences/:id/edit',
        loadComponent: () =>
          import('./features/experiences/pages/experience-form/experience-form.page').then((m) => m.ExperienceFormPage)
      },
      {
        path: 'education',
        loadComponent: () =>
          import('./features/education/pages/education-list/education-list.page').then((m) => m.EducationListPage)
      },
      {
        path: 'education/new',
        loadComponent: () =>
          import('./features/education/pages/education-form/education-form.page').then((m) => m.EducationFormPage)
      },
      {
        path: 'education/:id/edit',
        loadComponent: () =>
          import('./features/education/pages/education-form/education-form.page').then((m) => m.EducationFormPage)
      },
      {
        path: 'certifications',
        loadComponent: () =>
          import('./features/certifications/pages/certification-list/certification-list.page').then(
            (m) => m.CertificationListPage
          )
      },
      {
        path: 'certifications/new',
        loadComponent: () =>
          import('./features/certifications/pages/certification-form/certification-form.page').then(
            (m) => m.CertificationFormPage
          )
      },
      {
        path: 'certifications/:id/edit',
        loadComponent: () =>
          import('./features/certifications/pages/certification-form/certification-form.page').then(
            (m) => m.CertificationFormPage
          )
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./features/projects/pages/project-list/project-list.page').then((m) => m.ProjectListPage)
      },
      {
        path: 'projects/new',
        loadComponent: () =>
          import('./features/projects/pages/project-form/project-form.page').then((m) => m.ProjectFormPage)
      },
      {
        path: 'projects/:id/edit',
        loadComponent: () =>
          import('./features/projects/pages/project-form/project-form.page').then((m) => m.ProjectFormPage)
      },
      {
        path: 'articles',
        loadComponent: () =>
          import('./features/articles/pages/article-list/article-list.page').then((m) => m.ArticleListPage)
      },
      {
        path: 'articles/new',
        loadComponent: () =>
          import('./features/articles/pages/article-form/article-form.page').then((m) => m.ArticleFormPage)
      },
      {
        path: 'articles/:id/edit',
        loadComponent: () =>
          import('./features/articles/pages/article-form/article-form.page').then((m) => m.ArticleFormPage)
      },
      {
        path: 'testimonials',
        loadComponent: () =>
          import('./features/testimonials/pages/testimonial-list/testimonial-list.page').then(
            (m) => m.TestimonialListPage
          )
      },
      {
        path: 'testimonials/new',
        loadComponent: () =>
          import('./features/testimonials/pages/testimonial-form/testimonial-form.page').then(
            (m) => m.TestimonialFormPage
          )
      },
      {
        path: 'testimonials/:id/edit',
        loadComponent: () =>
          import('./features/testimonials/pages/testimonial-form/testimonial-form.page').then(
            (m) => m.TestimonialFormPage
          )
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('./features/messages/pages/message-list/message-list.page').then((m) => m.MessageListPage)
      },
      {
        path: 'messages/:id',
        loadComponent: () =>
          import('./features/messages/pages/message-detail/message-detail.page').then((m) => m.MessageDetailPage)
      },
      {
        path: 'media',
        loadComponent: () =>
          import('./features/media/pages/media-library/media-library.page').then((m) => m.MediaLibraryPage)
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./features/analytics/pages/analytics-overview/analytics-overview.page').then((m) => m.AnalyticsOverviewPage)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/pages/change-password/change-password.page').then((m) => m.ChangePasswordPage)
      }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
