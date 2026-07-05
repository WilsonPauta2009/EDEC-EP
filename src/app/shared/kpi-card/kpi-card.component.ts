import { Component, input } from '@angular/core';

import { Kpi } from '../../core/models/portal.models';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss',
})
export class KpiCardComponent {
  readonly kpi = input.required<Kpi>();
}
