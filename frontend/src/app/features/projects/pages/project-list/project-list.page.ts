import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { Project } from '../../../../shared/models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list-page',
  imports: [RouterLink, ButtonModule, TableModule, TagModule, PageHeaderComponent],
  templateUrl: './project-list.page.html',
  styleUrl: './project-list.page.scss'
})
export class ProjectListPage implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  readonly projects = signal<Project[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading.set(true);
    this.projectService.list().subscribe((projects) => {
      this.projects.set(projects);
      this.loading.set(false);
    });
  }

  edit(project: Project): void {
    this.router.navigate(['/projects', project.id, 'edit']);
  }

  confirmDelete(project: Project): void {
    this.confirmationService.confirm({
      header: 'Delete project',
      message: `Are you sure you want to delete "${project.title}"?`,
      acceptButtonProps: { severity: 'danger', label: 'Delete' },
      rejectButtonProps: { severity: 'secondary', label: 'Cancel', text: true },
      accept: () => this.delete(project)
    });
  }

  private delete(project: Project): void {
    this.projectService.delete(project.id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Project deleted' });
      this.loadProjects();
    });
  }
}
