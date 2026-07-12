import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { Testimonial } from '../../../../shared/models/testimonial.model';
import { TestimonialService } from '../../services/testimonial.service';

@Component({
  selector: 'app-testimonial-list-page',
  imports: [RouterLink, ButtonModule, TableModule, TagModule, PageHeaderComponent],
  templateUrl: './testimonial-list.page.html',
  styleUrl: './testimonial-list.page.scss'
})
export class TestimonialListPage implements OnInit {
  private readonly testimonialService = inject(TestimonialService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  readonly items = signal<Testimonial[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading.set(true);
    this.testimonialService.list().subscribe((items) => {
      this.items.set(items);
      this.loading.set(false);
    });
  }

  edit(item: Testimonial): void {
    this.router.navigate(['/testimonials', item.id, 'edit']);
  }

  confirmDelete(item: Testimonial): void {
    this.confirmationService.confirm({
      header: 'Delete testimonial',
      message: `Are you sure you want to delete the testimonial from "${item.authorName}"?`,
      acceptButtonProps: { severity: 'danger', label: 'Delete' },
      rejectButtonProps: { severity: 'secondary', label: 'Cancel', text: true },
      accept: () => this.delete(item)
    });
  }

  private delete(item: Testimonial): void {
    this.testimonialService.delete(item.id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Testimonial deleted' });
      this.loadItems();
    });
  }
}
