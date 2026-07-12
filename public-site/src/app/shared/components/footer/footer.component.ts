import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Github, Linkedin, LucideAngularModule, Mail, Twitter } from 'lucide-angular';
import { ApiService } from '../../../core/services/api.service';
import { I18nService } from '../../../core/services/i18n.service';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  readonly i18n = inject(I18nService);

  readonly githubIcon = Github;
  readonly linkedinIcon = Linkedin;
  readonly twitterIcon = Twitter;
  readonly mailIcon = Mail;

  readonly profile = signal<Profile | null>(null);
  readonly year = new Date().getFullYear();

  ngOnInit(): void {
    this.apiService.getProfile().subscribe((profile) => this.profile.set(profile));
  }
}
