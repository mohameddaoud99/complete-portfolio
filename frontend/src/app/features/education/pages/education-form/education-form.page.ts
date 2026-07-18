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
import { EducationService } from '../../services/education.service';

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
  selector: 'app-education-form-page',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, InputNumberModule, TextareaModule, DatePickerModule, PageHeaderComponent],
  templateUrl: './education-form.page.html',
  styleUrl: './education-form.page.scss'
})
export class EducationFormPage implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly educationService = inject(EducationService);
  private readonly messageService = inject(MessageService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly saving = signal(false);
  readonly itemId = signal<string | null>(null);

  readonly form = this.formBuilder.group({
    institution: ['', Validators.required],
    degree: ['', Validators.required],
    degreeFr: [''],
    field: [''],
    startDate: null as Date | null,
    endDate: null as Date | null,
    description: [''],
    descriptionFr: [''],
    displayOrder: [0]
  });

  get isEditMode(): boolean {
    return this.itemId() !== null;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.itemId.set(id);
      this.educationService.get(id).subscribe((item) => {
        this.form.patchValue({
          ...item,
          startDate: item.startDate ? new Date(item.startDate) : null,
          endDate: item.endDate ? new Date(item.endDate) : null
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
      institution: raw.institution ?? '',
      degree: raw.degree ?? '',
      degreeFr: raw.degreeFr,
      field: raw.field,
      startDate: toIsoDate(raw.startDate)!,
      endDate: toIsoDate(raw.endDate),
      description: raw.description,
      descriptionFr: raw.descriptionFr,
      displayOrder: raw.displayOrder ?? 0
    };

    const result$ = this.isEditMode
      ? this.educationService.update(this.itemId()!, request)
      : this.educationService.create(request);

    result$.subscribe({
      next: () => {
        this.saving.set(false);
        this.messageService.add({ severity: 'success', summary: this.isEditMode ? 'Education updated' : 'Education created' });
        this.router.navigate(['/education']);
      },
      error: (err) => {
        this.saving.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message ?? 'Failed to save education' });
      }
    });
  }
}
