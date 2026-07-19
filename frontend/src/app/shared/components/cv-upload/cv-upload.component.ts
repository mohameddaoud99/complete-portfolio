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
  readonly label = input('Upload CV (PDF)');

  readonly uploading = signal(false);
  readonly removing = signal(false);

  get fileName(): string | null {
    const url = this.cvUrl();
    if (!url) return null;
    try {
      const decoded = decodeURIComponent(url.split('?')[0]);
      return decoded.split('/').pop() ?? 'cv.pdf';
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
    this.storageService.uploadResume(file).subscribe({
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
    this.storageService.removeResume().subscribe({
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
