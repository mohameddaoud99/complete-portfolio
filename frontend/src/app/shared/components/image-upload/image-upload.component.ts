import { Component, computed, inject, input, model, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MediaService } from '../../../core/services/media.service';

@Component({
  selector: 'app-image-upload',
  imports: [ButtonModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss'
})
export class ImageUploadComponent {
  private readonly mediaService = inject(MediaService);
  private readonly messageService = inject(MessageService);

  readonly imageUrl = model<string | null>(null);
  readonly label = input('Upload image');

  readonly uploading = signal(false);
  readonly previewUrl = computed(() => this.mediaService.resolveUrl(this.imageUrl()));

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    this.uploading.set(true);
    this.mediaService.upload(file).subscribe({
      next: (mediaFile) => {
        this.imageUrl.set(mediaFile.url);
        this.uploading.set(false);
      },
      error: (err) => {
        this.uploading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Upload failed', detail: err?.message ?? 'Could not upload image' });
      }
    });
    input.value = '';
  }

  clear(): void {
    this.imageUrl.set(null);
  }
}
