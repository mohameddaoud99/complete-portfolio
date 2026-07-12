import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { Message } from '../../../../shared/models/message.model';
import { ContactMessageService } from '../../services/message.service';

@Component({
  selector: 'app-message-detail-page',
  imports: [ButtonModule, PageHeaderComponent],
  templateUrl: './message-detail.page.html',
  styleUrl: './message-detail.page.scss'
})
export class MessageDetailPage implements OnInit {
  private readonly contactMessageService = inject(ContactMessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly toastService = inject(MessageService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly message = signal<Message | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/messages']);
      return;
    }

    this.contactMessageService.get(id).subscribe((message) => {
      this.message.set(message);
      if (!message.read) {
        this.contactMessageService.markAsRead(id).subscribe((updated) => this.message.set(updated));
      }
    });
  }

  confirmDelete(): void {
    const message = this.message();
    if (!message) {
      return;
    }

    this.confirmationService.confirm({
      header: 'Delete message',
      message: `Are you sure you want to delete this message from "${message.senderName}"?`,
      acceptButtonProps: { severity: 'danger', label: 'Delete' },
      rejectButtonProps: { severity: 'secondary', label: 'Cancel', text: true },
      accept: () => {
        this.contactMessageService.delete(message.id).subscribe(() => {
          this.toastService.add({ severity: 'success', summary: 'Message deleted' });
          this.router.navigate(['/messages']);
        });
      }
    });
  }
}
