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
import { TestimonialService } from '../../services/testimonial.service';

@Component({
  selector: 'app-testimonial-form-page',
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
  templateUrl: './testimonial-form.page.html',
  styleUrl: './testimonial-form.page.scss'
})
export class TestimonialFormPage implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly testimonialService = inject(TestimonialService);
  private readonly messageService = inject(MessageService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly saving = signal(false);
  readonly itemId = signal<string | null>(null);
  readonly avatarUrl = signal<string | null>(null);

  readonly form = this.formBuilder.nonNullable.group({
    authorName: ['', Validators.required],
    authorRole: [''],
    authorRoleFr: [''],
    authorCompany: [''],
    quote: ['', Validators.required],
    quoteFr: [''],
    published: [true],
    displayOrder: [0]
  });

  get isEditMode(): boolean {
    return this.itemId() !== null;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.itemId.set(id);
      this.testimonialService.get(id).subscribe((item) => {
        this.avatarUrl.set(item.avatarUrl);
        this.form.patchValue({
          authorName: item.authorName,
          authorRole: item.authorRole ?? '',
          authorRoleFr: item.authorRoleFr ?? '',
          authorCompany: item.authorCompany ?? '',
          quote: item.quote,
          quoteFr: item.quoteFr ?? '',
          published: item.published,
          displayOrder: item.displayOrder
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
    const request = { ...this.form.getRawValue(), avatarUrl: this.avatarUrl() };
    const result$ = this.isEditMode
      ? this.testimonialService.update(this.itemId()!, request)
      : this.testimonialService.create(request);

    result$.subscribe({
      next: () => {
        this.saving.set(false);
        this.messageService.add({ severity: 'success', summary: this.isEditMode ? 'Testimonial updated' : 'Testimonial created' });
        this.router.navigate(['/testimonials']);
      },
      error: () => this.saving.set(false)
    });
  }
}
