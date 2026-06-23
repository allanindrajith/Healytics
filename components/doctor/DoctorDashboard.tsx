import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import StatCard from '../StatCard';
import AnalyticsChart from '../AnalyticsChart';
import PatientTable from '../PatientTable';
import AppointmentList from '../AppointmentList';
import AiInsightModal from '../AiInsightModal';
import AddPatientModal from '../AddPatientModal';
import { DASHBOARD_STATS, CHART_DATA, MOCK_PATIENTS, MOCK_APPOINTMENTS } from '../../constants';
import { generateHealthInsights } from '../../services/geminiService';
import { AiInsight, Patient, User } from '../../types';
import { Sparkles, Filter, Download, Plus, Stethoscope } from 'lucide-react';

interface DoctorDashboardProps {
  user: User;
  onLogout: () => void;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ user, onLogout }) => {
  const [isInsightModalOpen, setIsInsightModalOpen] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [insights, setInsights] = useState<AiInsight[]>([]);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);

  const handleGenerateInsights = async () => {
    setIsInsightModalOpen(true);
    setIsLoadingInsights(true);
    const result = await generateHealthInsights(DASHBOARD_STATS, CHART_DATA);
    setInsights(result);
    setIsLoadingInsights(false);
  };

  const handleAddPatient = (newPatientData: Omit<Patient, 'id' | 'avatar' | 'lastVisit'>) => {
    const newPatient: Patient = {
      ...newPatientData,
      id: `P00${patients.length + 1}`,
      lastVisit: 'Today',
      avatar: `https://picsum.photos/id/${Math.floor(Math.random() * 100) + 300}/200/200`
    };
    setPatients([newPatient, ...patients]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Sidebar user={user} onLogout={onLogout} />

      <main className="flex-1 md:ml-64 min-w-0 flex flex-col">
        <Header />

        <div className="p-6 md:p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Clinical Overview</h2>
              <p className="text-slate-500 mt-1">Welcome back, {user.name}. Here's your practice summary.</p>
            </div>
            <div className="flex items-center gap-3">
               <button 
                onClick={handleGenerateInsights}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:-translate-y-0.5 transition-all"
              >
                <Sparkles size={18} className="text-yellow-200 animate-pulse" />
                <span>AI Clinical Insights</span>
              </button>
              <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all">
                <Download size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DASHBOARD_STATS.map((stat, idx) => (
              <StatCard key={idx} metric={stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Practice Analytics</h3>
                  <p className="text-sm text-slate-500">Visits vs Consultations</p>
                </div>
                <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <AnalyticsChart data={CHART_DATA} />
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">Today's Appointments</h3>
                <a href="#" className="text-sm font-semibold text-blue-600 hover:underline">See All</a>
              </div>
              <AppointmentList appointments={MOCK_APPOINTMENTS} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Patient List</h3>
              <div className="flex gap-2">
                 <button 
                  onClick={() => setIsAddPatientOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all shadow-sm"
                 >
                   <Plus size={16} />
                   New Patient
                 </button>
              </div>
            </div>
            <PatientTable patients={patients} />
          </div>

        </div>
      </main>

      <AiInsightModal 
        isOpen={isInsightModalOpen} 
        onClose={() => setIsInsightModalOpen(false)} 
        insights={insights} 
        isLoading={isLoadingInsights} 
      />
      
      <AddPatientModal
        isOpen={isAddPatientOpen}
        onClose={() => setIsAddPatientOpen(false)}
        onAdd={handleAddPatient}
      />
    </div>
  );
};

export default DoctorDashboard;