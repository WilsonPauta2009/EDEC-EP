import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Indicator } from '../../core/models/portal.models';
import { PortalStoreService } from '../../core/services/portal-store.service';

@Component({
  selector: 'app-datalab-page',
  imports: [DecimalPipe],
  templateUrl: './datalab.page.html',
  styleUrl: './datalab.page.scss',
})
export class DatalabPage {
  protected readonly store = inject(PortalStoreService);
  private readonly maxValue = Math.max(...this.store.indicators.map((item) => item.value));

  protected ratio(indicator: Indicator): number {
    return Math.max(8, Math.round((indicator.value / this.maxValue) * 100));
  }
}
