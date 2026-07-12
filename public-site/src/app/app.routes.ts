import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then((m) => m.AboutPage)
  },
  {
    path: 'skills',
    loadComponent: () => import('./pages/skills/skills.page').then((m) => m.SkillsPage)
  },
  {
    path: 'experience',
    loadComponent: () => import('./pages/experience/experience.page').then((m) => m.ExperiencePage)
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.page').then((m) => m.ProjectsPage)
  },
  {
    path: 'projects/:slug',
    loadComponent: () => import('./pages/project-detail/project-detail.page').then((m) => m.ProjectDetailPage)
  },
  {
    path: 'articles',
    loadComponent: () => import('./pages/articles/articles.page').then((m) => m.ArticlesPage)
  },
  {
    path: 'articles/:slug',
    loadComponent: () => import('./pages/article-detail/article-detail.page').then((m) => m.ArticleDetailPage)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.page').then((m) => m.ContactPage)
  },
  { path: '**', redirectTo: '' }
];
