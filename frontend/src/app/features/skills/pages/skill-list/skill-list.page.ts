import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { Skill } from '../../../../shared/models/skill.model';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-skill-list-page',
  imports: [RouterLink, FormsModule, ButtonModule, TableModule, TagModule, RatingModule, PageHeaderComponent],
  templateUrl: './skill-list.page.html',
  styleUrl: './skill-list.page.scss'
})
export class SkillListPage implements OnInit {
  private readonly skillService = inject(SkillService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  readonly skills = signal<Skill[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.loading.set(true);
    this.skillService.list().subscribe((skills) => {
      this.skills.set(skills);
      this.loading.set(false);
    });
  }

  edit(skill: Skill): void {
    this.router.navigate(['/skills', skill.id, 'edit']);
  }

  confirmDelete(skill: Skill): void {
    this.confirmationService.confirm({
      header: 'Delete skill',
      message: `Are you sure you want to delete "${skill.name}"?`,
      acceptButtonProps: { severity: 'danger', label: 'Delete' },
      rejectButtonProps: { severity: 'secondary', label: 'Cancel', text: true },
      accept: () => this.delete(skill)
    });
  }

  private delete(skill: Skill): void {
    this.skillService.delete(skill.id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Skill deleted' });
      this.loadSkills();
    });
  }
}
