import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CallItem } from '../../core/models/portal.models';
import { PortalStoreService } from '../../core/services/portal-store.service';

@Component({
  selector: 'app-calls-page',
  imports: [FormsModule],
  templateUrl: './calls.page.html',
  styleUrl: './calls.page.scss',
})
export class CallsPage {
  protected readonly store = inject(PortalStoreService);
  protected readonly selected = signal<CallItem>(this.store.calls[0]!);
  protected readonly saved = signal('');

  protected application = {
    applicantName: '',
    businessName: '',
    email: '',
    phone: '',
    notes: '',
  };

  protected selectCall(call: CallItem): void {
    this.selected.set(call);
    this.saved.set('');
  }

  protected submit(): void {
    const call = this.selected();
    if (!this.application.applicantName || !this.application.businessName || !this.application.email) {
      this.saved.set('Complete nombre, negocio y correo para simular la postulación.');
      return;
    }

    this.store.submitApplication({
      callId: call.id,
      callTitle: call.title,
      ...this.application,
    });
    this.saved.set(`Postulación piloto registrada para ${this.application.businessName}.`);
    this.application = { applicantName: '', businessName: '', email: '', phone: '', notes: '' };
  }
}
