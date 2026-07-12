import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { Certification } from '../../../../shared/models/certification.model';
import { CertificationService } from '../../services/certification.service';

@Component({
  selector: 'app-certification-list-page',
  imports: [RouterLink, DatePipe, ButtonModule, TableModule, PageHeaderComponent],
  templateUrl: './certification-list.page.html',
  styleUrl: './certification-list.page.scss'
})
export class CertificationListPage implements OnInit {
  private readonly certificationService = inject(CertificationService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  readonly items = signal<Certification[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading.set(true);
    this.certificationService.list().subscribe((items) => {
      this.items.set(items);
      this.loading.set(false);
    });
  }

  edit(item: Certification): void {
    this.router.navigate(['/certifications', item.id, 'edit']);
  }

  confirmDelete(item: Certification): void {
    this.confirmationService.confirm({
      header: 'Delete certification',
      message: `Are you sure you want to delete "${item.name}"?`,
      acceptButtonProps: { severity: 'danger', label: 'Delete' },
      rejectButtonProps: { severity: 'secondary', label: 'Cancel', text: true },
      accept: () => this.delete(item)
    });
  }

  private delete(item: Certification): void {
    this.certificationService.delete(item.id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Certification deleted' });
      this.loadItems();
    });
  }
}
