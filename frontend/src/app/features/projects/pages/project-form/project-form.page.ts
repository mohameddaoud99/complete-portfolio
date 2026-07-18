import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ImageUploadComponent } from '../../../../shared/components/image-upload/image-upload.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-form-page',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    ToggleSwitchModule,
    PageHeaderComponent,
    ImageUploadComponent
  ],
  templateUrl: './project-form.page.html',
  styleUrl: './project-form.page.scss'
})
export class ProjectFormPage implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly projectService = inject(ProjectService);
  private readonly messageService = inject(MessageService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly saving = signal(false);
  readonly projectId = signal<string | null>(null);
  readonly imageUrl = signal<string | null>(null);

  readonly form = this.formBuilder.nonNullable.group({
    title: ['', Validators.required],
    summary: [''],
    summaryFr: [''],
    description: [''],
    descriptionFr: [''],
    techStack: [''],
    repoUrl: [''],
    liveUrl: [''],
    category: [''],
    screenshots: [''],
    featured: [false],
    displayOrder: [0]
  });

  get isEditMode(): boolean {
    return this.projectId() !== null;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectId.set(id);
      this.projectService.get(id).subscribe((project) => {
        this.imageUrl.set(project.imageUrl);
        this.form.patchValue({
          title: project.title,
          summary: project.summary ?? '',
          summaryFr: project.summaryFr ?? '',
          description: project.description ?? '',
          descriptionFr: project.descriptionFr ?? '',
          techStack: project.techStack ?? '',
          repoUrl: project.repoUrl ?? '',
          liveUrl: project.liveUrl ?? '',
          category: project.category ?? '',
          screenshots: project.screenshots ?? '',
          featured: project.featured,
          displayOrder: project.displayOrder
        });
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const request = { ...this.form.getRawValue(), imageUrl: this.imageUrl() };
    const result$ = this.isEditMode
      ? this.projectService.update(this.projectId()!, request)
      : this.projectService.create(request);

    result$.subscribe({
      next: () => {
        this.saving.set(false);
        this.messageService.add({ severity: 'success', summary: this.isEditMode ? 'Project updated' : 'Project created' });
        this.router.navigate(['/projects']);
      },
      error: (err) => {
        this.saving.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message ?? 'Failed to save project' });
      }
    });
  }
}
