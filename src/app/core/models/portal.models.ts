export type CallStatus = 'Abierta' | 'Próxima' | 'Cerrada';
export type Priority = 'Alta' | 'Media' | 'Baja';
export type ProgramStatus = 'En ejecución' | 'Planificado' | 'Completado' | 'Observado';
export type IntegrationStatus = 'Disponible' | 'Planificado' | 'Requiere convenio';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  summary: string;
}

export interface Kpi {
  label: string;
  value: string;
  caption: string;
  tone: 'teal' | 'blue' | 'gold' | 'slate';
}

export interface ServiceItem {
  id: string;
  title: string;
  audience: string;
  category: string;
  icon: string;
  description: string;
  deliverables: string[];
  priority: Priority;
}

export interface CallItem {
  id: string;
  title: string;
  category: string;
  status: CallStatus;
  deadline: string;
  summary: string;
  requirements: string[];
  documents: string[];
}

export interface BeneficiaryProject {
  id: string;
  name: string;
  sector: string;
  parish: string;
  program: string;
  status: ProgramStatus;
  progress: number;
  impact: string;
}

export interface ProgramProgress {
  id: string;
  program: string;
  owner: string;
  status: ProgramStatus;
  progress: number;
  budget: string;
  milestone: string;
}

export interface Indicator {
  label: string;
  value: number;
  unit: string;
  detail: string;
}

export interface ApplicationRecord {
  id: string;
  callId: string;
  callTitle: string;
  applicantName: string;
  businessName: string;
  email: string;
  phone: string;
  notes: string;
  createdAt: string;
}

export interface AppointmentRecord {
  id: string;
  serviceId: string;
  serviceTitle: string;
  name: string;
  business: string;
  email: string;
  preferredDate: string;
  createdAt: string;
}

export interface CitizenFeedback {
  id: string;
  programId: string;
  program: string;
  citizen: string;
  comment: string;
  createdAt: string;
}

export interface ArticleRequirement {
  literal: string;
  title: string;
  implementation: string;
  route: string;
}

export interface IntegrationSource {
  id: string;
  entity: string;
  source: string;
  purpose: string;
  status: IntegrationStatus;
}
