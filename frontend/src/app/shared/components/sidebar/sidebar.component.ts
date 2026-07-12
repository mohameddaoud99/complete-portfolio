import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  Award,
  BarChart3,
  Briefcase,
  FolderKanban,
  GraduationCap,
  Images,
  LayoutDashboard,
  LucideAngularModule,
  Mail,
  MessageSquareQuote,
  Newspaper,
  Settings,
  Sparkles,
  UserCircle
} from 'lucide-angular';
import { NavItem } from '../../models/nav-item.model';
import { ROUTE_PATHS } from '../../utils/constants';

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', route: ROUTE_PATHS.dashboard, icon: LayoutDashboard },
  { label: 'Profile', route: ROUTE_PATHS.profile, icon: UserCircle },
  { label: 'Skills', route: ROUTE_PATHS.skills, icon: Sparkles },
  { label: 'Experiences', route: ROUTE_PATHS.experiences, icon: Briefcase },
  { label: 'Education', route: ROUTE_PATHS.education, icon: GraduationCap },
  { label: 'Certifications', route: ROUTE_PATHS.certifications, icon: Award },
  { label: 'Projects', route: ROUTE_PATHS.projects, icon: FolderKanban },
  { label: 'Articles', route: ROUTE_PATHS.articles, icon: Newspaper },
  { label: 'Testimonials', route: ROUTE_PATHS.testimonials, icon: MessageSquareQuote },
  { label: 'Messages', route: ROUTE_PATHS.messages, icon: Mail },
  { label: 'Media', route: ROUTE_PATHS.media, icon: Images },
  { label: 'Analytics', route: ROUTE_PATHS.analytics, icon: BarChart3 },
  { label: 'Settings', route: ROUTE_PATHS.settings, icon: Settings }
];

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  readonly collapsed = input(false);
  readonly navigate = output<void>();

  readonly navItems = NAV_ITEMS;
}
