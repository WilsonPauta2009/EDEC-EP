import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  readonly user = signal({
    displayName: 'Equipo EDEC-EP',
    role: 'Administrador piloto',
    organization: 'Empresa Publica Municipal de Desarrollo Economico de Cuenca',
    visible: false,
  });

  readonly initials = computed(() =>
    this.user()
      .displayName.split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join(''),
  );
}
