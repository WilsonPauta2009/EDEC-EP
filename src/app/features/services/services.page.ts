import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ServiceItem } from '../../core/models/portal.models';
import { PortalStoreService } from '../../core/services/portal-store.service';

@Component({
  selector: 'app-services-page',
  imports: [FormsModule],
  templateUrl: './services.page.html',
  styleUrl: './services.page.scss',
})
export class ServicesPage {
  protected readonly store = inject(PortalStoreService);
  protected readonly category = signal('Todos');
  protected readonly selected = signal<ServiceItem>(this.store.services[0]!);
  protected readonly saved = signal('');

  protected appointment = {
    name: '',
    business: '',
    email: '',
    preferredDate: '',
  };

  protected readonly categories = computed(() => ['Todos', ...new Set(this.store.services.map((item) => item.category))]);
  protected readonly filtered = computed(() =>
    this.category() === 'Todos'
      ? this.store.services
      : this.store.services.filter((item) => item.category === this.category()),
  );

  protected choose(service: ServiceItem): void {
    this.selected.set(service);
    this.saved.set('');
  }

  protected schedule(): void {
    const service = this.selected();
    if (!this.appointment.name || !this.appointment.email || !this.appointment.preferredDate) {
      this.saved.set('Complete nombre, correo y fecha tentativa para agendar.');
      return;
    }

    this.store.scheduleAppointment({
      serviceId: service.id,
      serviceTitle: service.title,
      ...this.appointment,
    });
    this.saved.set(`Asesoría piloto registrada para ${this.appointment.name}.`);
    this.appointment = { name: '', business: '', email: '', preferredDate: '' };
  }
}
