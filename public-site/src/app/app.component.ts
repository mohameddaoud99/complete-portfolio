import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './core/services/api.service';
import { SeoService } from './core/services/seo.service';
import { BackToTopComponent } from './shared/components/back-to-top/back-to-top.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ScrollProgressComponent } from './shared/components/scroll-progress/scroll-progress.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, BackToTopComponent, ScrollProgressComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.apiService.getProfile().subscribe((profile) => {
      if (profile.avatarUrl) {
        this.seoService.setFavicon(profile.avatarUrl);
      }
    });
  }
}
