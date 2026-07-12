import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { TextareaModule } from 'primeng/textarea';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ImageUploadComponent } from '../../../../shared/components/image-upload/image-upload.component';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-edit-page',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, TextareaModule, PageHeaderComponent, ImageUploadComponent],
  templateUrl: './profile-edit.page.html',
  styleUrl: './profile-edit.page.scss'
})
export class ProfileEditPage implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly profileService = inject(ProfileService);
  private readonly messageService = inject(MessageService);

  readonly saving = signal(false);
  readonly avatarUrl = signal<string | null>(null);

  readonly form = this.formBuilder.nonNullable.group({
    fullName: ['', Validators.required],
    title: [''],
    titleFr: [''],
    bio: [''],
    bioFr: [''],
    email: [''],
    phone: [''],
    location: [''],
    githubUrl: [''],
    linkedinUrl: [''],
    twitterUrl: [''],
    websiteUrl: [''],
    resumeUrl: [''],
    seoTitle: [''],
    seoDescription: ['']
  });

  ngOnInit(): void {
    this.profileService.get().subscribe((profile) => {
      this.avatarUrl.set(profile.avatarUrl);
      this.form.patchValue({
        fullName: profile.fullName,
        title: profile.title ?? '',
        titleFr: profile.titleFr ?? '',
        bio: profile.bio ?? '',
        bioFr: profile.bioFr ?? '',
        email: profile.email ?? '',
        phone: profile.phone ?? '',
        location: profile.location ?? '',
        githubUrl: profile.githubUrl ?? '',
        linkedinUrl: profile.linkedinUrl ?? '',
        twitterUrl: profile.twitterUrl ?? '',
        websiteUrl: profile.websiteUrl ?? '',
        resumeUrl: profile.resumeUrl ?? '',
        seoTitle: profile.seoTitle ?? '',
        seoDescription: profile.seoDescription ?? ''
      });
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.profileService.update({ ...this.form.getRawValue(), avatarUrl: this.avatarUrl() }).subscribe({
      next: () => {
        this.saving.set(false);
        this.messageService.add({ severity: 'success', summary: 'Profile updated' });
      },
      error: () => this.saving.set(false)
    });
  }
}
