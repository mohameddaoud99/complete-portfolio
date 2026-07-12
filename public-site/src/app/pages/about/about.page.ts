import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Award, Download, GraduationCap, Rocket, ShieldCheck, Users } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { ApiService } from '../../core/services/api.service';
import { I18nService } from '../../core/services/i18n.service';
import { MediaService } from '../../core/services/media.service';
import { SeoService } from '../../core/services/seo.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Certification } from '../../shared/models/certification.model';
import { Education } from '../../shared/models/education.model';
import { Experience } from '../../shared/models/experience.model';
import { Profile } from '../../shared/models/profile.model';

@Component({
  selector: 'app-about-page',
  imports: [DatePipe, LucideAngularModule, RevealDirective, SectionHeadingComponent],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss'
})
export class AboutPage implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly seoService = inject(SeoService);
  private readonly mediaService = inject(MediaService);
  readonly i18n = inject(I18nService);

  readonly qualityIcon = ShieldCheck;
  readonly collaborationIcon = Users;
  readonly growthIcon = Rocket;
  readonly educationIcon = GraduationCap;
  readonly certificationIcon = Award;
  readonly downloadIcon = Download;

  readonly profile = signal<Profile | null>(null);
  readonly experiences = signal<Experience[]>([]);
  readonly education = signal<Education[]>([]);
  readonly certifications = signal<Certification[]>([]);

  readonly avatarUrl = computed(() => this.mediaService.resolveUrl(this.profile()?.avatarUrl));
  readonly bio = computed(() => this.i18n.pick(this.profile()?.bio, this.profile()?.bioFr));

  ngOnInit(): void {
    this.apiService.getProfile().subscribe((profile) => {
      this.profile.set(profile);
      this.seoService.apply({
        title: `${this.i18n.t('about.title')} — ${profile.fullName}`,
        description: profile.seoDescription || profile.bio || ''
      });
    });
    this.apiService.getExperiences().subscribe((experiences) => this.experiences.set(experiences));
    this.apiService.getEducation().subscribe((education) => this.education.set(education));
    this.apiService.getCertifications().subscribe((certifications) => this.certifications.set(certifications));
  }
}
