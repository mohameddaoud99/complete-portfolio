import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  Download,
  Github,
  Linkedin,
  LucideAngularModule,
  Mail,
  MapPin,
  Send,
  Twitter,
  Globe
} from 'lucide-angular';
import { ApiService } from '../../core/services/api.service';
import { I18nService } from '../../core/services/i18n.service';
import { SeoService } from '../../core/services/seo.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Profile } from '../../shared/models/profile.model';

@Component({
  selector: 'app-contact-page',
  imports: [LucideAngularModule, ReactiveFormsModule, RevealDirective, SectionHeadingComponent],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss'
})
export class ContactPage implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly seoService = inject(SeoService);
  private readonly fb = inject(FormBuilder);
  readonly i18n = inject(I18nService);

  readonly emailIcon = Mail;
  readonly locationIcon = MapPin;
  readonly githubIcon = Github;
  readonly linkedinIcon = Linkedin;
  readonly twitterIcon = Twitter;
  readonly websiteIcon = Globe;
  readonly downloadIcon = Download;
  readonly sendIcon = Send;

  readonly profile = signal<Profile | null>(null);
  readonly status = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');

  readonly form = this.fb.nonNullable.group({
    senderName: ['', [Validators.required, Validators.minLength(2)]],
    senderEmail: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    body: ['', [Validators.required, Validators.minLength(10)]]
  });

  readonly socialLinks = computed(() => {
    const profile = this.profile();
    if (!profile) {
      return [];
    }
    return [
      { url: profile.githubUrl, icon: this.githubIcon, label: 'GitHub' },
      { url: profile.linkedinUrl, icon: this.linkedinIcon, label: 'LinkedIn' },
      { url: profile.twitterUrl, icon: this.twitterIcon, label: 'Twitter' },
      { url: profile.websiteUrl, icon: this.websiteIcon, label: 'Website' }
    ].filter((link): link is { url: string; icon: typeof Github; label: string } => !!link.url);
  });

  ngOnInit(): void {
    this.seoService.apply({
      title: `${this.i18n.t('contact.title')} — Portfolio`,
      description: this.i18n.t('contact.subtitle')
    });
    this.apiService.getProfile().subscribe((profile) => this.profile.set(profile));
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.status.set('submitting');
    this.apiService.sendMessage(this.form.getRawValue()).subscribe({
      next: () => {
        this.status.set('success');
        this.form.reset();
      },
      error: () => this.status.set('error')
    });
  }
}
