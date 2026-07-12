import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowUpRight, LucideAngularModule } from 'lucide-angular';
import { MediaService } from '../../../core/services/media.service';
import { I18nService } from '../../../core/services/i18n.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();

  readonly arrowIcon = ArrowUpRight;

  readonly summary = computed(() => this.i18n.pick(this.project().summary, this.project().summaryFr));
  readonly imageUrl = computed(() => this.mediaService.resolveUrl(this.project().imageUrl));
  readonly techList = computed(() =>
    (this.project().techStack ?? '')
      .split(',')
      .map((tech) => tech.trim())
      .filter(Boolean)
      .slice(0, 4)
  );

  constructor(
    private readonly mediaService: MediaService,
    readonly i18n: I18nService
  ) {}
}
