import { Component, inject, input, model, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-cv-upload',
  imports: [ButtonModule],
  templateUrl: './cv-upload.component.html',
  styleUrl: './cv-upload.component.scss'
})
export class CvUploadComponent {
  private readonly storageService = inject(StorageService);
  private readonly messageService = inject(MessageService);

  readonly cvUrl = model<string | null>(null);
  readonly lang = input<'en' | 'fr'>('en');

  readonly uploading = signal(false);
  readonly removing = signal(false);

  get label(): string {
    return this.lang() === 'fr' ? 'CV Français (PDF)' : 'CV English (PDF)';
  }

  get fileName(): string | null {
    const url = this.cvUrl();
    if (!url) return null;
    try {
      return decodeURIComponent(url.split('?')[0]).split('/').pop() ?? 'cv.pdf';
    } catch {
      return 'cv.pdf';
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      this.messageService.add({ severity: 'warn', summary: 'Invalid file', detail: 'Only PDF files are accepted' });
      input.value = '';
      return;
    }

    this.uploading.set(true);
    const upload$ = this.lang() === 'fr'
      ? this.storageService.uploadResumeFr(file)
      : this.storageService.uploadResume(file);

    upload$.subscribe({
      next: (result) => {
        this.cvUrl.set(result.publicUrl);
        this.uploading.set(false);
        this.messageService.add({ severity: 'success', summary: 'CV uploaded' });
      },
      error: (err) => {
        this.uploading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Upload failed', detail: err?.message ?? 'Could not upload CV' });
      }
    });
    input.value = '';
  }

  remove(): void {
    this.removing.set(true);
    const remove$ = this.lang() === 'fr'
      ? this.storageService.removeResumeFr()
      : this.storageService.removeResume();

    remove$.subscribe({
      next: () => {
        this.cvUrl.set(null);
        this.removing.set(false);
        this.messageService.add({ severity: 'success', summary: 'CV removed' });
      },
      error: (err) => {
        this.removing.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message ?? 'Could not remove CV' });
      }
    });
  }
}
