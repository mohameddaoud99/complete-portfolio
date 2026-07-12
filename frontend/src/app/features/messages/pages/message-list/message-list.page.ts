import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { Message } from '../../../../shared/models/message.model';
import { ContactMessageService } from '../../services/message.service';

@Component({
  selector: 'app-message-list-page',
  imports: [DatePipe, ButtonModule, TableModule, TagModule, PageHeaderComponent],
  templateUrl: './message-list.page.html',
  styleUrl: './message-list.page.scss'
})
export class MessageListPage implements OnInit {
  private readonly contactMessageService = inject(ContactMessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly toastService = inject(MessageService);
  private readonly router = inject(Router);

  readonly messages = signal<Message[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading.set(true);
    this.contactMessageService.list().subscribe((messages) => {
      this.messages.set(messages);
      this.loading.set(false);
    });
  }

  open(message: Message): void {
    this.router.navigate(['/messages', message.id]);
  }

  confirmDelete(message: Message): void {
    this.confirmationService.confirm({
      header: 'Delete message',
      message: `Are you sure you want to delete this message from "${message.senderName}"?`,
      acceptButtonProps: { severity: 'danger', label: 'Delete' },
      rejectButtonProps: { severity: 'secondary', label: 'Cancel', text: true },
      accept: () => this.delete(message)
    });
  }

  private delete(message: Message): void {
    this.contactMessageService.delete(message.id).subscribe(() => {
      this.toastService.add({ severity: 'success', summary: 'Message deleted' });
      this.loadMessages();
    });
  }
}
