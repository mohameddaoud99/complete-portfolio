import { Component, computed, input, model, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MediaService } from '../../../core/services/media.service';

@Component({
  selector: 'app-image-upload',
  imports: [ButtonModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss'
})
export class ImageUploadComponent {
  readonly imageUrl = model<string | null>(null);
  readonly label = input('Upload image');

  readonly uploading = signal(false);
  readonly previewUrl = computed(() => this.mediaService.resolveUrl(this.imageUrl()));

  constructor(private readonly mediaService: MediaService) {}

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
      error: () => this.uploading.set(false)
    });
    input.value = '';
  }

  clear(): void {
    this.imageUrl.set(null);
  }
}
