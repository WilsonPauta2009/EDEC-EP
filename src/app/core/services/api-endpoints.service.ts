import { Injectable } from '@angular/core';

import { APP_ENVIRONMENT } from '../environment/app-environment';

const API_PATHS = {
  services: 'services',
  calls: 'calls',
  beneficiaries: 'beneficiaries',
  programs: 'programs',
  indicators: 'indicators',
  applications: 'applications',
  appointments: 'appointments',
  feedback: 'feedback',
} as const;

export type ApiPath = keyof typeof API_PATHS;

@Injectable({ providedIn: 'root' })
export class ApiEndpointsService {
  readonly baseUrl = APP_ENVIRONMENT.apiBaseUrl;
  readonly paths = API_PATHS;

  url(path: ApiPath): string {
    return `${this.baseUrl.replace(/\/$/, '')}/${this.paths[path]}`;
  }
}
