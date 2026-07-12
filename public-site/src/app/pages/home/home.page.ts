import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight, Github, Linkedin, LucideAngularModule, Mail, Twitter } from 'lucide-angular';
import { ApiService } from '../../core/services/api.service';
import { I18nService } from '../../core/services/i18n.service';
import { MediaService } from '../../core/services/media.service';
import { SeoService } from '../../core/services/seo.service';
import { environment } from '../../../environments/environment';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ArticleCardComponent } from '../../shared/components/article-card/article-card.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { Article } from '../../shared/models/article.model';
import { Profile } from '../../shared/models/profile.model';
import { Project } from '../../shared/models/project.model';
import { Skill } from '../../shared/models/skill.model';
import { Testimonial } from '../../shared/models/testimonial.model';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, LucideAngularModule, RevealDirective, ProjectCardComponent, ArticleCardComponent, SectionHeadingComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly seoService = inject(SeoService);
  private readonly mediaService = inject(MediaService);
  readonly i18n = inject(I18nService);

  readonly arrowIcon = ArrowRight;
  readonly githubIcon = Github;
  readonly linkedinIcon = Linkedin;
  readonly twitterIcon = Twitter;
  readonly mailIcon = Mail;

  readonly profile = signal<Profile | null>(null);
  readonly skills = signal<Skill[]>([]);
  readonly projects = signal<Project[]>([]);
  readonly articles = signal<Article[]>([]);
  readonly testimonials = signal<Testimonial[]>([]);
  readonly experienceCount = signal(0);

  readonly avatarUrl = computed(() => this.mediaService.resolveUrl(this.profile()?.avatarUrl));
  readonly heroTitle = computed(() => this.i18n.pick(this.profile()?.title, this.profile()?.titleFr));
  readonly heroBio = computed(() => this.i18n.pick(this.profile()?.bio, this.profile()?.bioFr));
  readonly featuredProjects = computed(() => this.projects().filter((p) => p.featured).slice(0, 3));
  readonly topSkills = computed(() => [...this.skills()].sort((a, b) => b.proficiency - a.proficiency).slice(0, 8));
  readonly latestArticles = computed(() => this.articles().slice(0, 3));

  ngOnInit(): void {
    this.apiService.getProfile().subscribe((profile) => {
      this.profile.set(profile);
      this.seoService.apply({
        title: profile.seoTitle || `${profile.fullName} — ${profile.title ?? 'Full Stack Developer'}`,
        description: profile.seoDescription || profile.bio || '',
        image: this.mediaService.resolveUrl(profile.avatarUrl) ?? undefined,
        url: environment.siteUrl,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: profile.fullName,
          jobTitle: profile.title,
          url: environment.siteUrl,
          email: profile.email ?? undefined,
          sameAs: [profile.githubUrl, profile.linkedinUrl, profile.twitterUrl].filter(Boolean)
        }
      });
    });

    this.apiService.getSkills().subscribe((skills) => this.skills.set(skills));
    this.apiService.getProjects().subscribe((projects) => this.projects.set(projects));
    this.apiService.getArticles().subscribe((articles) => this.articles.set(articles));
    this.apiService.getTestimonials().subscribe((testimonials) => this.testimonials.set(testimonials));
    this.apiService.getExperiences().subscribe((experiences) => this.experienceCount.set(experiences.length));
  }
}
