import { Component, inject, input, model, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MediaService } from '../../../core/services/media.service';

@Component({
  selector: 'app-multi-image-upload',
  imports: [ButtonModule],
  templateUrl: './multi-image-upload.component.html',
  styleUrl: './multi-image-upload.component.scss'
})
export class MultiImageUploadComponent {
  private readonly mediaService = inject(MediaService);
  private readonly messageService = inject(MessageService);

  readonly images = model<string[]>([]);
  readonly label = input('Add image');

  readonly uploading = signal(false);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files?.length) return;

    this.uploading.set(true);
    const uploads = Array.from(files).map((file) =>
      this.mediaService.upload(file).toPromise().then((mf) => mf!.url)
    );

    Promise.all(uploads)
      .then((urls) => {
        this.images.update((prev) => [...prev, ...urls]);
        this.uploading.set(false);
      })
      .catch((err) => {
        this.uploading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Upload failed', detail: err?.message ?? 'Could not upload image' });
      });

    input.value = '';
  }

  remove(index: number): void {
    this.images.update((prev) => prev.filter((_, i) => i !== index));
  }

  resolveUrl(url: string): string | null {
    return this.mediaService.resolveUrl(url);
  }
}
