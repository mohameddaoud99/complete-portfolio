import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ImageUploadComponent } from '../../../../shared/components/image-upload/image-upload.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-form-page',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    EditorModule,
    ToggleSwitchModule,
    PageHeaderComponent,
    ImageUploadComponent
  ],
  templateUrl: './article-form.page.html',
  styleUrl: './article-form.page.scss'
})
export class ArticleFormPage implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly articleService = inject(ArticleService);
  private readonly messageService = inject(MessageService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly saving = signal(false);
  readonly articleId = signal<string | null>(null);
  readonly coverImageUrl = signal<string | null>(null);

  readonly form = this.formBuilder.nonNullable.group({
    title: ['', Validators.required],
    titleFr: [''],
    excerpt: [''],
    excerptFr: [''],
    contentHtml: [''],
    contentHtmlFr: [''],
    category: [''],
    tags: [''],
    featured: [false],
    published: [false]
  });

  get isEditMode(): boolean {
    return this.articleId() !== null;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleId.set(id);
      this.articleService.get(id).subscribe((article) => {
        this.coverImageUrl.set(article.coverImageUrl);
        this.form.patchValue({
          title: article.title,
          titleFr: article.titleFr ?? '',
          excerpt: article.excerpt ?? '',
          excerptFr: article.excerptFr ?? '',
          contentHtml: article.contentHtml ?? '',
          contentHtmlFr: article.contentHtmlFr ?? '',
          category: article.category ?? '',
          tags: article.tags ?? '',
          featured: article.featured,
          published: article.published
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
    const request = { ...this.form.getRawValue(), coverImageUrl: this.coverImageUrl() };
    const result$ = this.isEditMode
      ? this.articleService.update(this.articleId()!, request)
      : this.articleService.create(request);

    result$.subscribe({
      next: () => {
        this.saving.set(false);
        this.messageService.add({ severity: 'success', summary: this.isEditMode ? 'Article updated' : 'Article created' });
        this.router.navigate(['/articles']);
      },
      error: () => this.saving.set(false)
    });
  }
}
