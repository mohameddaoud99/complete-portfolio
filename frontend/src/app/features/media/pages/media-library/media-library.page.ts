import { Component, OnInit, inject, signal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MediaService } from '../../../../core/services/media.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { MediaFile } from '../../../../shared/models/media-file.model';

@Component({
  selector: 'app-media-library-page',
  imports: [ButtonModule, PageHeaderComponent],
  templateUrl: './media-library.page.html',
  styleUrl: './media-library.page.scss'
})
export class MediaLibraryPage implements OnInit {
  private readonly mediaService = inject(MediaService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  readonly files = signal<MediaFile[]>([]);
  readonly loading = signal(true);
  readonly uploading = signal(false);

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles(): void {
    this.loading.set(true);
    this.mediaService.list().subscribe((files) => {
      this.files.set(files);
      this.loading.set(false);
    });
  }

  resolveUrl(file: MediaFile): string | null {
    return this.mediaService.resolveUrl(file.url);
  }

  isImage(file: MediaFile): boolean {
    return (file.contentType ?? '').startsWith('image/');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    this.uploading.set(true);
    this.mediaService.upload(file).subscribe({
      next: () => {
        this.uploading.set(false);
        this.loadFiles();
      },
      error: () => this.uploading.set(false)
    });
    input.value = '';
  }

  confirmDelete(file: MediaFile): void {
    this.confirmationService.confirm({
      header: 'Delete file',
      message: `Are you sure you want to delete "${file.originalFileName}"?`,
      acceptButtonProps: { severity: 'danger', label: 'Delete' },
      rejectButtonProps: { severity: 'secondary', label: 'Cancel', text: true },
      accept: () => {
        this.mediaService.delete(file.id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'File deleted' });
          this.loadFiles();
        });
      }
    });
  }
}
