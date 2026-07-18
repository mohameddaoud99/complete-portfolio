import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ExperienceService } from '../../services/experience.service';

function toIsoDate(date: Date | null): string | null {
  if (!date) {
    return null;
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

@Component({
  selector: 'app-experience-form-page',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, InputNumberModule, TextareaModule, DatePickerModule, PageHeaderComponent],
  templateUrl: './experience-form.page.html',
  styleUrl: './experience-form.page.scss'
})
export class ExperienceFormPage implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly experienceService = inject(ExperienceService);
  private readonly messageService = inject(MessageService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly saving = signal(false);
  readonly experienceId = signal<string | null>(null);

  readonly form = this.formBuilder.group({
    company: ['', Validators.required],
    role: ['', Validators.required],
    roleFr: [''],
    location: [''],
    startDate: null as Date | null,
    endDate: null as Date | null,
    description: [''],
    descriptionFr: [''],
    achievements: [''],
    achievementsFr: [''],
    displayOrder: [0]
  });

  get isEditMode(): boolean {
    return this.experienceId() !== null;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.experienceId.set(id);
      this.experienceService.get(id).subscribe((experience) => {
        this.form.patchValue({
          ...experience,
          startDate: experience.startDate ? new Date(experience.startDate) : null,
          endDate: experience.endDate ? new Date(experience.endDate) : null
        });
      });
    }
  }

  submit(): void {
    if (this.form.invalid || !this.form.value.startDate) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const raw = this.form.getRawValue();
    const request = {
      company: raw.company ?? '',
      role: raw.role ?? '',
      roleFr: raw.roleFr,
      location: raw.location,
      startDate: toIsoDate(raw.startDate)!,
      endDate: toIsoDate(raw.endDate),
      description: raw.description,
      descriptionFr: raw.descriptionFr,
      achievements: raw.achievements,
      achievementsFr: raw.achievementsFr,
      displayOrder: raw.displayOrder ?? 0
    };

    const result$ = this.isEditMode
      ? this.experienceService.update(this.experienceId()!, request)
      : this.experienceService.create(request);

    result$.subscribe({
      next: () => {
        this.saving.set(false);
        this.messageService.add({ severity: 'success', summary: this.isEditMode ? 'Experience updated' : 'Experience created' });
        this.router.navigate(['/experiences']);
      },
      error: (err) => {
        this.saving.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message ?? 'Failed to save experience' });
      }
    });
  }
}
