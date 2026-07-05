import { Routes } from '@angular/router';

import { ShellPage } from './core/layout/shell.page';
import { AdminPage } from './features/admin/admin.page';
import { BeneficiariesPage } from './features/beneficiaries/beneficiaries.page';
import { CallsPage } from './features/calls/calls.page';
import { DatalabPage } from './features/datalab/datalab.page';
import { HomePage } from './features/home/home.page';
import { ServicesPage } from './features/services/services.page';
import { TrackingPage } from './features/tracking/tracking.page';

export const routes: Routes = [
  {
    path: '',
    component: ShellPage,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'inicio' },
      { path: 'inicio', component: HomePage, title: 'EDEC-EP | Inicio' },
      { path: 'servicios', component: ServicesPage, title: 'EDEC-EP | Servicios PyME' },
      { path: 'convocatorias', component: CallsPage, title: 'EDEC-EP | Convocatorias' },
      { path: 'beneficiarios', component: BeneficiariesPage, title: 'EDEC-EP | Beneficiarios' },
      { path: 'seguimiento', component: TrackingPage, title: 'EDEC-EP | Seguimiento ciudadano' },
      { path: 'datalab', component: DatalabPage, title: 'EDEC-EP | DataLab' },
      { path: 'admin', component: AdminPage, title: 'EDEC-EP | Administración' },
      { path: '**', redirectTo: 'inicio' },
    ],
  },
];
