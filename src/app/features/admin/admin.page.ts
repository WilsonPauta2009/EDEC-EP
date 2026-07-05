import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';

import { PortalStoreService } from '../../core/services/portal-store.service';

@Component({
  selector: 'app-admin-page',
  imports: [DatePipe],
  templateUrl: './admin.page.html',
  styleUrl: './admin.page.scss',
})
export class AdminPage {
  protected readonly store = inject(PortalStoreService);
  protected readonly message = signal('');

  protected readonly summary = computed(() => [
    { label: 'Postulaciones', value: this.store.applications().length, icon: 'edit_document' },
    { label: 'Asesorías', value: this.store.appointments().length, icon: 'event_available' },
    { label: 'Observaciones', value: this.store.feedback().length, icon: 'forum' },
    { label: 'Servicios', value: this.store.services.length, icon: 'route' },
  ]);

  protected clear(): void {
    this.store.clearDemoData();
    this.message.set('Datos de demostración reiniciados.');
  }
}
