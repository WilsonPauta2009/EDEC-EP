import { Component, inject } from '@angular/core';
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
export class HomePage {
  protected readonly store = inject(PortalStoreService);
}
