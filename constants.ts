import { Patient, Appointment, StatMetric, ChartDataPoint, User } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Dr. Alex Carter', role: 'doctor', avatar: 'https://picsum.photos/id/1005/100/100' },
  { id: 'u2', name: 'Nurse Brenda', role: 'nurse', avatar: 'https://picsum.photos/id/64/100/100' },
  { id: 'u3', name: 'Sarah Johnson', role: 'patient', avatar: 'https://picsum.photos/id/64/200/200' }
];

export const MOCK_PATIENTS: Patient[] = [
  { id: 'P001', name: 'Sarah Johnson', age: 32, gender: 'Female', status: 'Treatment', lastVisit: 'Oct 24, 2023', avatar: 'https://picsum.photos/id/64/200/200', condition: 'Colorectal Cancer', riskScore: 'medium', diagnosisStage: 'Stage II', tumorLocation: 'Sigmoid Colon' },
  { id: 'P002', name: 'Michael Chen', age: 45, gender: 'Male', status: 'Recovered', lastVisit: 'Oct 23, 2023', avatar: 'https://picsum.photos/id/91/200/200', condition: 'Post-Surgery', riskScore: 'low', diagnosisStage: 'Stage I', tumorLocation: 'Ascending Colon' },
  { id: 'P003', name: 'Emma Wilson', age: 28, gender: 'Female', status: 'New', lastVisit: 'Oct 25, 2023', avatar: 'https://picsum.photos/id/103/200/200', condition: 'Migraine', riskScore: 'low' },
  { id: 'P004', name: 'James Rod', age: 54, gender: 'Male', status: 'Critical', lastVisit: 'Oct 25, 2023', avatar: 'https://picsum.photos/id/177/200/200', condition: 'Cardiac Arrhythmia', riskScore: 'high', diagnosisStage: 'Stage III', tumorLocation: 'Rectum' },
  { id: 'P005', name: 'Linda Davis', age: 61, gender: 'Female', status: 'Treatment', lastVisit: 'Oct 22, 2023', avatar: 'https://picsum.photos/id/338/200/200', condition: 'Arthritis', riskScore: 'medium' },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'A001', doctorName: 'Dr. Smith', patientName: 'Sarah Johnson', time: '09:00 AM', type: 'Consultation', date: 'Today' },
  { id: 'A002', doctorName: 'Dr. Lee', patientName: 'James Rod', time: '10:30 AM', type: 'Emergency', date: 'Today' },
  { id: 'A003', doctorName: 'Dr. Patel', patientName: 'Emma Wilson', time: '11:15 AM', type: 'Checkup', date: 'Today' },
  { id: 'A004', doctorName: 'Dr. Smith', patientName: 'Robert Fox', time: '02:00 PM', type: 'Surgery', date: 'Tomorrow' },
];

export const DASHBOARD_STATS: StatMetric[] = [
  { label: 'Total Patients', value: '1,452', trend: 12.5, trendLabel: 'vs last month', icon: 'users', color: 'bg-blue-500' },
  { label: 'Appointments', value: '84', trend: -2.4, trendLabel: 'vs yesterday', icon: 'calendar', color: 'bg-purple-500' },
  { label: 'Operations', value: '28', trend: 5.1, trendLabel: 'vs last month', icon: 'activity', color: 'bg-rose-500' },
  { label: 'Hospital Earnings', value: '$42,500', trend: 8.2, trendLabel: 'vs last month', icon: 'dollar', color: 'bg-emerald-500' },
];

export const NURSE_STATS: StatMetric[] = [
  { label: 'High Risk Alerts', value: '12', trend: 4, trendLabel: 'new today', icon: 'alert', color: 'bg-red-500' },
  { label: 'Pending Reviews', value: '5', trend: -2, trendLabel: 'vs yesterday', icon: 'activity', color: 'bg-orange-500' },
  { label: 'Messages', value: '18', trend: 5, trendLabel: 'unread', icon: 'users', color: 'bg-blue-500' },
  { label: 'Test Results', value: '7', trend: 0, trendLabel: 'awaiting', icon: 'calendar', color: 'bg-indigo-500' },
];

export const CHART_DATA: ChartDataPoint[] = [
  { name: 'Mon', patients: 45, consultations: 30 },
  { name: 'Tue', patients: 52, consultations: 45 },
  { name: 'Wed', patients: 38, consultations: 35 },
  { name: 'Thu', patients: 65, consultations: 50 },
  { name: 'Fri', patients: 48, consultations: 40 },
  { name: 'Sat', patients: 55, consultations: 60 },
  { name: 'Sun', patients: 35, consultations: 25 },
];

export const NAV_ITEMS = [
  { name: 'Dashboard', icon: 'LayoutDashboard', active: true },
  { name: 'Patients', icon: 'Users', active: false },
  { name: 'Schedule', icon: 'CalendarDays', active: false },
  { name: 'Analytics', icon: 'BarChart2', active: false },
  { name: 'Messages', icon: 'MessageSquare', active: false },
  { name: 'Settings', icon: 'Settings', active: false },
];