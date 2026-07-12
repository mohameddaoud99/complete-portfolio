import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { SkillService } from '../../services/skill.service';

const CATEGORY_OPTIONS = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'];

@Component({
  selector: 'app-skill-form-page',
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule, InputNumberModule, RatingModule, SelectModule, PageHeaderComponent],
  templateUrl: './skill-form.page.html',
  styleUrl: './skill-form.page.scss'
})
export class SkillFormPage implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly skillService = inject(SkillService);
  private readonly messageService = inject(MessageService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly categoryOptions = CATEGORY_OPTIONS;
  readonly saving = signal(false);
  readonly skillId = signal<string | null>(null);

  readonly form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    proficiency: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    icon: [''],
    yearsExperience: [0],
    displayOrder: [0]
  });

  get isEditMode(): boolean {
    return this.skillId() !== null;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.skillId.set(id);
      this.skillService.get(id).subscribe((skill) => {
        this.form.patchValue({
          name: skill.name,
          category: skill.category,
          proficiency: skill.proficiency,
          icon: skill.icon ?? '',
          yearsExperience: skill.yearsExperience,
          displayOrder: skill.displayOrder
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
    const request = this.form.getRawValue();
    const result$ = this.isEditMode
      ? this.skillService.update(this.skillId()!, request)
      : this.skillService.create(request);

    result$.subscribe({
      next: () => {
        this.saving.set(false);
        this.messageService.add({ severity: 'success', summary: this.isEditMode ? 'Skill updated' : 'Skill created' });
        this.router.navigate(['/skills']);
      },
      error: () => this.saving.set(false)
    });
  }
}
