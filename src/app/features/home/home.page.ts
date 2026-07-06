import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PortalStoreService } from '../../core/services/portal-store.service';
import { KpiCardComponent } from '../../shared/kpi-card/kpi-card.component';
import { ProgressCanvasComponent } from '../../shared/progress-canvas/progress-canvas.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, KpiCardComponent, ProgressCanvasComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage implements AfterViewInit {
  @ViewChild('heroVideo') private readonly heroVideo?: ElementRef<HTMLVideoElement>;

  protected readonly store = inject(PortalStoreService);

  ngAfterViewInit(): void {
    setTimeout(() => this.startHeroVideo());
  }

  private startHeroVideo(): void {
    const video = this.heroVideo?.nativeElement;

    if (!video) {
      return;
    }

    video.muted = true;
    video.playsInline = true;
    video.load();
    void video.play().catch(() => undefined);
  }
}
