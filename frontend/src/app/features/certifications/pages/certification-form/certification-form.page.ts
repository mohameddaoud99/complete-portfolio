import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CertificationService } from '../../services/certification.service';

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
  selector: 'app-certification-form-page',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, InputNumberModule, DatePickerModule, PageHeaderComponent],
  templateUrl: './certification-form.page.html',
  styleUrl: './certification-form.page.scss'
})
export class CertificationFormPage implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly certificationService = inject(CertificationService);
  private readonly messageService = inject(MessageService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly saving = signal(false);
  readonly itemId = signal<string | null>(null);

  readonly form = this.formBuilder.group({
    name: ['', Validators.required],
    issuer: ['', Validators.required],
    issueDate: null as Date | null,
    expiryDate: null as Date | null,
    credentialUrl: [''],
    badgeImageUrl: [''],
    displayOrder: [0]
  });

  get isEditMode(): boolean {
    return this.itemId() !== null;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.itemId.set(id);
      this.certificationService.get(id).subscribe((item) => {
        this.form.patchValue({
          ...item,
          issueDate: item.issueDate ? new Date(item.issueDate) : null,
          expiryDate: item.expiryDate ? new Date(item.expiryDate) : null
        });
      });
    }
  }

  submit(): void {
    if (this.form.invalid || !this.form.value.issueDate) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const raw = this.form.getRawValue();
    const request = {
      name: raw.name ?? '',
      issuer: raw.issuer ?? '',
      issueDate: toIsoDate(raw.issueDate)!,
      expiryDate: toIsoDate(raw.expiryDate),
      credentialUrl: raw.credentialUrl,
      badgeImageUrl: raw.badgeImageUrl,
      displayOrder: raw.displayOrder ?? 0
    };

    const result$ = this.isEditMode
      ? this.certificationService.update(this.itemId()!, request)
      : this.certificationService.create(request);

    result$.subscribe({
      next: () => {
        this.saving.set(false);
        this.messageService.add({ severity: 'success', summary: this.isEditMode ? 'Certification updated' : 'Certification created' });
        this.router.navigate(['/certifications']);
      },
      error: (err) => {
        this.saving.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message ?? 'Failed to save certification' });
      }
    });
  }
}
