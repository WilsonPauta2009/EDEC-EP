import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { BeneficiaryProject } from '../../core/models/portal.models';
import { PortalStoreService } from '../../core/services/portal-store.service';

@Component({
  selector: 'app-beneficiaries-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './beneficiaries.page.html',
  styleUrl: './beneficiaries.page.scss',
})
export class BeneficiariesPage {
  protected readonly store = inject(PortalStoreService);
  protected readonly query = signal('');
  protected readonly sector = signal('Todos');
  protected readonly selected = signal<BeneficiaryProject>(this.store.beneficiaries[0]!);

  protected readonly sectors = computed(() => ['Todos', ...new Set(this.store.beneficiaries.map((item) => item.sector))]);
  protected readonly filtered = computed(() => {
    const term = this.query().trim().toLowerCase();
    return this.store.beneficiaries.filter((item) => {
      const matchesSector = this.sector() === 'Todos' || item.sector === this.sector();
      const matchesTerm = !term || [item.name, item.parish, item.program, item.impact].join(' ').toLowerCase().includes(term);
      return matchesSector && matchesTerm;
    });
  });

  protected select(project: BeneficiaryProject): void {
    this.selected.set(project);
  }
}
