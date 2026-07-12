import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FolderPlus, LucideAngularModule, LucideIconData, PenSquare, Sparkles, UserCog } from 'lucide-angular';
import { ROUTE_PATHS } from '../../../../shared/utils/constants';

interface QuickAction {
  label: string;
  icon: LucideIconData;
  route: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Add Project', icon: FolderPlus, route: `${ROUTE_PATHS.projects}/new` },
  { label: 'Add Skill', icon: Sparkles, route: `${ROUTE_PATHS.skills}/new` },
  { label: 'Create Article', icon: PenSquare, route: `${ROUTE_PATHS.articles}/new` },
  { label: 'Update Profile', icon: UserCog, route: ROUTE_PATHS.profile }
];

@Component({
  selector: 'app-quick-actions',
  imports: [LucideAngularModule],
  templateUrl: './quick-actions.component.html',
  styleUrl: './quick-actions.component.scss'
})
export class QuickActionsComponent {
  readonly actions = QUICK_ACTIONS;

  constructor(private readonly router: Router) {}

  go(route: string): void {
    this.router.navigateByUrl(route);
  }
}
