import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProgramProgress } from '../../core/models/portal.models';
import { PortalStoreService } from '../../core/services/portal-store.service';
import { ProgressCanvasComponent } from '../../shared/progress-canvas/progress-canvas.component';

@Component({
  selector: 'app-tracking-page',
  imports: [FormsModule, ProgressCanvasComponent],
  templateUrl: './tracking.page.html',
  styleUrl: './tracking.page.scss',
})
export class TrackingPage {
  protected readonly store = inject(PortalStoreService);
  protected readonly selected = signal<ProgramProgress>(this.store.programs[0]!);
  protected readonly saved = signal('');

  protected feedbackForm = {
    citizen: '',
    programId: this.store.programs[0]?.id ?? '',
    comment: '',
  };

  protected select(program: ProgramProgress): void {
    this.selected.set(program);
    this.feedbackForm.programId = program.id;
    this.saved.set('');
  }

  protected submitFeedback(): void {
    if (!this.feedbackForm.citizen || !this.feedbackForm.comment) {
      this.saved.set('Complete nombre y observación para registrar la participación.');
      return;
    }

    const program = this.store.programs.find((item) => item.id === this.feedbackForm.programId) ?? this.store.programs[0]!;
    this.store.submitFeedback({
      programId: program.id,
      program: program.program,
      citizen: this.feedbackForm.citizen,
      comment: this.feedbackForm.comment,
    });
    this.saved.set(`Observación registrada para ${program.program}.`);
    this.feedbackForm = { citizen: '', programId: program.id, comment: '' };
  }
}
