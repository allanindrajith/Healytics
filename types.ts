export type UserRole = 'patient' | 'nurse' | 'doctor' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  status: 'Recovered' | 'Treatment' | 'New' | 'Critical';
  lastVisit: string;
  avatar: string;
  condition: string;
  riskScore?: 'low' | 'medium' | 'high';
  diagnosisStage?: string;
  tumorLocation?: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  patientName: string;
  time: string;
  type: 'Consultation' | 'Checkup' | 'Emergency' | 'Surgery';
  date: string;
}

export interface StatMetric {
  label: string;
  value: string | number;
  trend: number;
  trendLabel: string;
  icon: 'users' | 'calendar' | 'activity' | 'dollar' | 'alert';
  color: string;
}

export interface ChartDataPoint {
  name: string;
  patients: number;
  consultations: number;
}

export interface AiInsight {
  title: string;
  description: string;
  type: 'positive' | 'warning' | 'neutral';
}

export interface SymptomLog {
  id: string;
  date: string;
  pain: number;
  fatigue: number;
  nausea: number;
  notes: string;
}