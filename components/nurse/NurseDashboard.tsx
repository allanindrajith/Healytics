import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import StatCard from '../StatCard';
import { NURSE_STATS, MOCK_PATIENTS } from '../../constants';
import { User, Patient } from '../../types';
import { AlertTriangle, MessageCircle, Clock, ChevronRight } from 'lucide-react';

interface NurseDashboardProps {
  user: User;
  onLogout: () => void;
}

const NurseDashboard: React.FC<NurseDashboardProps> = ({ user, onLogout }) => {
  const highRiskPatients = MOCK_PATIENTS.filter(p => p.riskScore === 'high' || p.status === 'Critical');
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Sidebar user={user} onLogout={onLogout} />

      <main className="flex-1 md:ml-64 min-w-0 flex flex-col">
        <Header />

        <div className="p-6 md:p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Nurse Triage Board</h2>
              <p className="text-slate-500 mt-1">Priority actions for today.</p>
            </div>
            <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 flex items-center gap-2">
                    <AlertTriangle size={18} />
                    {highRiskPatients.length} Critical Alerts
                </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NURSE_STATS.map((stat, idx) => (
              <StatCard key={idx} metric={stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* High Risk Triage Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                 <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-red-50/30">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <AlertTriangle size={20} className="text-red-500" />
                        Risk Triage Queue
                    </h3>
                    <button className="text-sm font-semibold text-red-600 hover:underline">View All Alerts</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase">Patient</th>
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase">Risk Score</th>
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase">Last Log</th>
                                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {highRiskPatients.map(patient => (
                                <tr key={patient.id} className="border-b border-gray-50 hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <img src={patient.avatar} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="font-bold text-slate-800">{patient.name}</p>
                                                <p className="text-xs text-slate-500">{patient.condition}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                                            High Risk
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-slate-600 text-sm">
                                        2 hours ago
                                        <p className="text-xs text-red-500">Pain: 5/5</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <button className="px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-400 text-slate-600 hover:text-blue-600 rounded-lg text-xs font-semibold transition-all">
                                            Triange
                                        </button>
                                    </td>
                                </tr>
                            ))}
                             {MOCK_PATIENTS.filter(p => p.riskScore === 'medium').map(patient => (
                                <tr key={patient.id} className="border-b border-gray-50 hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <img src={patient.avatar} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="font-bold text-slate-800">{patient.name}</p>
                                                <p className="text-xs text-slate-500">{patient.condition}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">
                                            Medium
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-slate-600 text-sm">
                                        Yesterday
                                    </td>
                                    <td className="py-4 px-6">
                                        <button className="px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-400 text-slate-600 hover:text-blue-600 rounded-lg text-xs font-semibold transition-all">
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Unread Messages</h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors">
                        <div className="relative">
                            <img src="https://picsum.photos/id/103/200/200" className="w-10 h-10 rounded-full" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <h4 className="font-bold text-sm text-slate-800">Emma Wilson</h4>
                                <span className="text-xs text-slate-400">10m ago</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 line-clamp-2">Is it normal to feel dizzy after the new medication?</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                        <div className="relative">
                            <img src="https://picsum.photos/id/338/200/200" className="w-10 h-10 rounded-full" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <h4 className="font-bold text-sm text-slate-800">Linda Davis</h4>
                                <span className="text-xs text-slate-400">1h ago</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 line-clamp-2">Rescheduling my appointment for next week.</p>
                        </div>
                    </div>
                </div>
                <button className="w-full mt-4 py-2.5 text-sm font-semibold text-emerald-600 border border-emerald-200 rounded-xl hover:bg-emerald-50 transition-colors">
                    Open Messaging Hub
                </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NurseDashboard;