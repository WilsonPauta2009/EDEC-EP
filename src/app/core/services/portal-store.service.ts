import { Injectable, computed, signal } from '@angular/core';

import {
  ApplicationRecord,
  AppointmentRecord,
  ArticleRequirement,
  BeneficiaryProject,
  CallItem,
  CitizenFeedback,
  Indicator,
  IntegrationSource,
  Kpi,
  NavItem,
  ProgramProgress,
  ServiceItem,
} from '../models/portal.models';

const STORAGE_KEYS = {
  applications: 'edec-ep:applications',
  appointments: 'edec-ep:appointments',
  feedback: 'edec-ep:feedback',
};

@Injectable({ providedIn: 'root' })
export class PortalStoreService {
  readonly navItems: NavItem[] = [
    { label: 'Inicio', path: '/inicio', icon: 'space_dashboard', summary: 'Vista ejecutiva del piloto.' },
    { label: 'Servicios PyME', path: '/servicios', icon: 'route', summary: 'Rutas de atención por necesidad.' },
    { label: 'Convocatorias', path: '/convocatorias', icon: 'campaign', summary: 'Bases, requisitos y postulación.' },
    { label: 'Beneficiarios', path: '/beneficiarios', icon: 'verified', summary: 'Proyectos apoyados e impacto.' },
    { label: 'Seguimiento', path: '/seguimiento', icon: 'query_stats', summary: 'Avance público de programas.' },
    { label: 'DataLab', path: '/datalab', icon: 'monitoring', summary: 'Indicadores y datos abiertos.' },
    { label: 'Admin', path: '/admin', icon: 'admin_panel_settings', summary: 'Backoffice piloto.' },
  ];

  readonly services: ServiceItem[] = [
    {
      id: 'emprende',
      title: 'Emprende en Cuenca',
      audience: 'Emprendedores y negocios nacientes',
      category: 'Emprendimiento',
      icon: 'rocket_launch',
      description: 'Diagnóstico, formalización, capacitación y ruta para primera venta o primer canal digital.',
      deliverables: ['Ficha de diagnóstico', 'Plan de acción', 'Agenda de capacitación', 'Seguimiento inicial'],
      priority: 'Alta',
    },
    {
      id: 'pyme',
      title: 'PyME competitiva',
      audience: 'Pequeñas y medianas empresas',
      category: 'Productividad',
      icon: 'storefront',
      description: 'Acompañamiento para productividad, transformación digital, acceso a mercados y mejora comercial.',
      deliverables: ['Asesoría PyME', 'Plan digital', 'Indicadores de mejora', 'Conexión a convocatorias'],
      priority: 'Alta',
    },
    {
      id: 'innova',
      title: 'Innova Cuenca',
      audience: 'Startups, academia, makers y empresas',
      category: 'Innovación',
      icon: 'hub',
      description: 'Retos de innovación, prototipos, laboratorios y pilotos público-privados con trazabilidad.',
      deliverables: ['Reto publicado', 'Equipo postulado', 'Prototipo', 'Medición de impacto'],
      priority: 'Media',
    },
    {
      id: 'eps',
      title: 'Economía popular y solidaria',
      audience: 'Asociaciones, artesanos y unidades productivas',
      category: 'EPS',
      icon: 'diversity_3',
      description: 'Registro, catálogo, ferias, ruedas comerciales y fortalecimiento asociativo.',
      deliverables: ['Ficha asociativa', 'Catálogo', 'Ferias', 'Reporte de ventas'],
      priority: 'Alta',
    },
  ];

  readonly calls: CallItem[] = [
    {
      id: 'capital-semilla',
      title: 'Capital semilla para innovación productiva',
      category: 'Innovación',
      status: 'Abierta',
      deadline: '15 agosto 2026',
      summary: 'Apoyo a prototipos con impacto económico, ambiental o social en Cuenca.',
      requirements: ['RUC/RIMPE activo', 'Plan de trabajo', 'Presupuesto referencial'],
      documents: ['Bases técnicas', 'Formato de postulación', 'Matriz de evaluación'],
    },
    {
      id: 'vitrina-pyme',
      title: 'Vitrina PyME Cuenca',
      category: 'Comercialización',
      status: 'Abierta',
      deadline: '30 agosto 2026',
      summary: 'Selección de emprendimientos para catálogo digital, rueda de negocios y feria local.',
      requirements: ['Ficha de producto', 'Fotografías', 'Declaración responsable'],
      documents: ['Convocatoria', 'Requisitos', 'Cronograma'],
    },
    {
      id: 'digitalizacion',
      title: 'Retos de transformación digital',
      category: 'Tecnología',
      status: 'Próxima',
      deadline: '10 septiembre 2026',
      summary: 'Soluciones para comercio electrónico, datos, procesos y presencia digital PyME.',
      requirements: ['Diagnóstico digital', 'Equipo responsable', 'Indicadores de resultado'],
      documents: ['Términos de referencia', 'Guía de postulación'],
    },
  ];

  readonly beneficiaries: BeneficiaryProject[] = [
    {
      id: 'bioempaques',
      name: 'Bioempaques Tomebamba',
      sector: 'Manufactura sostenible',
      parish: 'El Vecino',
      program: 'Capital semilla',
      status: 'En ejecución',
      progress: 68,
      impact: 'Reducir plásticos de un solo uso en comercios locales.',
    },
    {
      id: 'cafe-sayausi',
      name: 'Café de altura Sayausí',
      sector: 'Agroindustria',
      parish: 'Sayausí',
      program: 'Vitrina PyME',
      status: 'Completado',
      progress: 100,
      impact: 'Nuevo canal digital para productores asociados.',
    },
    {
      id: 'textil-circular',
      name: 'Textil circular Cuenca',
      sector: 'Moda y reciclaje',
      parish: 'Yanuncay',
      program: 'Innova Cuenca',
      status: 'En ejecución',
      progress: 54,
      impact: 'Reutilización de fibras y capacitación a talleres barriales.',
    },
    {
      id: 'madera-cuenca',
      name: 'Madera fina Cuenca',
      sector: 'Artesanía y mobiliario',
      parish: 'San Joaquín',
      program: 'Economía popular y solidaria',
      status: 'Planificado',
      progress: 35,
      impact: 'Catálogo digital para talleres artesanales con identidad local.',
    },
  ];

  readonly programs: ProgramProgress[] = [
    {
      id: 'plan-cantonal',
      program: 'Plan Cantonal de Fomento',
      owner: 'Dirección de Desarrollo Productivo',
      status: 'En ejecución',
      progress: 72,
      budget: '$ 180.000',
      milestone: 'Publicar indicadores por línea estratégica.',
    },
    {
      id: 'convocatorias-pyme',
      program: 'Convocatorias PyME',
      owner: 'Unidad de Emprendimiento',
      status: 'En ejecución',
      progress: 61,
      budget: '$ 95.000',
      milestone: 'Validación documental de postulaciones.',
    },
    {
      id: 'datalab',
      program: 'DataLab Productivo',
      owner: 'Tecnología / Gobierno Abierto',
      status: 'Planificado',
      progress: 38,
      budget: '$ 64.000',
      milestone: 'Integración con fuentes municipales priorizadas.',
    },
    {
      id: 'seguimiento',
      program: 'Seguimiento ciudadano',
      owner: 'Participación Ciudadana',
      status: 'En ejecución',
      progress: 49,
      budget: '$ 42.000',
      milestone: 'Tablero de hitos, responsables y observaciones.',
    },
  ];

  readonly indicators: Indicator[] = [
    { label: 'Talleres ejecutados', value: 42, unit: 'eventos', detail: 'Capacitaciones y asistencias técnicas registradas.' },
    { label: 'Participantes', value: 1840, unit: 'personas', detail: 'Beneficiarios directos de programas productivos.' },
    { label: 'Postulaciones', value: 312, unit: 'formularios', detail: 'Registros en convocatorias activas.' },
    { label: 'Parroquias cubiertas', value: 18, unit: 'territorios', detail: 'Cobertura cantonal del piloto.' },
  ];

  readonly integrationSources: IntegrationSource[] = [
    {
      id: 'municipio-tramites',
      entity: 'Municipio de Cuenca',
      source: 'Trámites, geoportal y transparencia',
      purpose: 'Relacionar servicios productivos con trámites municipales y datos territoriales.',
      status: 'Planificado',
    },
    {
      id: 'edec-catalogo',
      entity: 'EDEC EP',
      source: 'Catálogo de emprendimientos, ferias y repositorio',
      purpose: 'Publicar beneficiarios, eventos, proyectos y documentos institucionales.',
      status: 'Disponible',
    },
    {
      id: 'etapa-servicios',
      entity: 'ETAPA EP',
      source: 'Servicios, comunicados y aplicativos',
      purpose: 'Cruzar información de conectividad, agua, saneamiento y soporte territorial.',
      status: 'Requiere convenio',
    },
  ];

  readonly articleRequirements: ArticleRequirement[] = [
    { literal: 'a)', title: 'Plan Cantonal', implementation: 'Micrositio, documentos, avances e indicadores del plan.', route: '/inicio' },
    { literal: 'b)', title: 'Convocatorias', implementation: 'Publicación de bases, requisitos, cronograma y postulación.', route: '/convocatorias' },
    { literal: 'c)', title: 'Beneficiarios', implementation: 'Fichas públicas de proyectos apoyados e impacto esperado.', route: '/beneficiarios' },
    { literal: 'd)', title: 'Seguimiento ciudadano', implementation: 'Avance de programas, responsables, presupuesto e hitos.', route: '/seguimiento' },
  ];

  readonly applications = signal<ApplicationRecord[]>(this.read<ApplicationRecord[]>(STORAGE_KEYS.applications, []));
  readonly appointments = signal<AppointmentRecord[]>(this.read<AppointmentRecord[]>(STORAGE_KEYS.appointments, []));
  readonly feedback = signal<CitizenFeedback[]>(this.read<CitizenFeedback[]>(STORAGE_KEYS.feedback, []));

  readonly kpis = computed<Kpi[]>(() => [
    { label: 'Convocatorias activas', value: String(this.calls.filter((item) => item.status === 'Abierta').length), caption: `${this.applications().length} postulaciones piloto`, tone: 'teal' },
    { label: 'Servicios priorizados', value: String(this.services.length), caption: `${this.appointments().length} asesorías agendadas`, tone: 'blue' },
    { label: 'Beneficiarios visibles', value: String(this.beneficiaries.length), caption: 'Fichas públicas administrables', tone: 'gold' },
    { label: 'Observaciones ciudadanas', value: String(this.feedback().length), caption: 'Participación guardada localmente', tone: 'slate' },
  ]);

  submitApplication(record: Omit<ApplicationRecord, 'id' | 'createdAt'>): void {
    this.applications.update((records) => {
      const next = [{ ...record, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...records];
      this.write(STORAGE_KEYS.applications, next);
      return next;
    });
  }

  scheduleAppointment(record: Omit<AppointmentRecord, 'id' | 'createdAt'>): void {
    this.appointments.update((records) => {
      const next = [{ ...record, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...records];
      this.write(STORAGE_KEYS.appointments, next);
      return next;
    });
  }

  submitFeedback(record: Omit<CitizenFeedback, 'id' | 'createdAt'>): void {
    this.feedback.update((records) => {
      const next = [{ ...record, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...records];
      this.write(STORAGE_KEYS.feedback, next);
      return next;
    });
  }

  clearDemoData(): void {
    this.applications.set([]);
    this.appointments.set([]);
    this.feedback.set([]);
    this.write(STORAGE_KEYS.applications, []);
    this.write(STORAGE_KEYS.appointments, []);
    this.write(STORAGE_KEYS.feedback, []);
  }

  private read<T>(key: string, fallback: T): T {
    try {
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : fallback;
    } catch {
      return fallback;
    }
  }

  private write<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // El piloto puede ejecutarse en navegadores con almacenamiento restringido.
    }
  }
}
