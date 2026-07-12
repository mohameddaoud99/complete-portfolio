import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { Education } from '../../../../shared/models/education.model';
import { EducationService } from '../../services/education.service';

@Component({
  selector: 'app-education-list-page',
  imports: [RouterLink, DatePipe, ButtonModule, TableModule, PageHeaderComponent],
  templateUrl: './education-list.page.html',
  styleUrl: './education-list.page.scss'
})
export class EducationListPage implements OnInit {
  private readonly educationService = inject(EducationService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  readonly items = signal<Education[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading.set(true);
    this.educationService.list().subscribe((items) => {
      this.items.set(items);
      this.loading.set(false);
    });
  }

  edit(item: Education): void {
    this.router.navigate(['/education', item.id, 'edit']);
  }

  confirmDelete(item: Education): void {
    this.confirmationService.confirm({
      header: 'Delete education entry',
      message: `Are you sure you want to delete "${item.degree} — ${item.institution}"?`,
      acceptButtonProps: { severity: 'danger', label: 'Delete' },
      rejectButtonProps: { severity: 'secondary', label: 'Cancel', text: true },
      accept: () => this.delete(item)
    });
  }

  private delete(item: Education): void {
    this.educationService.delete(item.id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Education entry deleted' });
      this.loadItems();
    });
  }
}
