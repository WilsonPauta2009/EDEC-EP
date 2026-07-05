import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { PortalStoreService } from '../services/portal-store.service';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-shell-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell.page.html',
  styleUrl: './shell.page.scss',
})
export class ShellPage {
  protected readonly store = inject(PortalStoreService);
  protected readonly session = inject(SessionService);
}
