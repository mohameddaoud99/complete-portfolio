import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { Experience } from '../../../../shared/models/experience.model';
import { ExperienceService } from '../../services/experience.service';

@Component({
  selector: 'app-experience-list-page',
  imports: [RouterLink, DatePipe, ButtonModule, TableModule, PageHeaderComponent],
  templateUrl: './experience-list.page.html',
  styleUrl: './experience-list.page.scss'
})
export class ExperienceListPage implements OnInit {
  private readonly experienceService = inject(ExperienceService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  readonly experiences = signal<Experience[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.loadExperiences();
  }

  loadExperiences(): void {
    this.loading.set(true);
    this.experienceService.list().subscribe((experiences) => {
      this.experiences.set(experiences);
      this.loading.set(false);
    });
  }

  edit(experience: Experience): void {
    this.router.navigate(['/experiences', experience.id, 'edit']);
  }

  confirmDelete(experience: Experience): void {
    this.confirmationService.confirm({
      header: 'Delete experience',
      message: `Are you sure you want to delete "${experience.role} at ${experience.company}"?`,
      acceptButtonProps: { severity: 'danger', label: 'Delete' },
      rejectButtonProps: { severity: 'secondary', label: 'Cancel', text: true },
      accept: () => this.delete(experience)
    });
  }

  private delete(experience: Experience): void {
    this.experienceService.delete(experience.id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Experience deleted' });
      this.loadExperiences();
    });
  }
}
