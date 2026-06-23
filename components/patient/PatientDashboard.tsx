import React, { useState } from 'react';
import { User, SymptomLog } from '../../types';
import { CheckCircle2, Clock, Calendar, MessageSquare, Activity, FileText, ChevronRight, LogOut } from 'lucide-react';
import SymptomLogger from './SymptomLogger';

interface PatientDashboardProps {
  user: User;
  onLogout: () => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ user, onLogout }) => {
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [logs, setLogs] = useState<SymptomLog[]>([]);

  const handleSaveLog = (log: SymptomLog) => {
    setLogs([log, ...logs]);
    // In a real app, this would trigger a toast notification "Synced to Nurse"
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Mobile Header */}
      <header className="bg-white px-6 py-6 sticky top-0 z-20 border-b border-slate-100 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full border-2 border-blue-100" />
            <div>
              <p className="text-xs text-slate-500 font-medium">Good Morning,</p>
              <h1 className="text-lg font-bold text-slate-800">{user.name}</h1>
            </div>
          </div>
          <button onClick={onLogout} className="p-2 text-slate-400 hover:bg-slate-50 rounded-full">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="p-6 space-y-8 max-w-md mx-auto">
        
        {/* Today's Tasks */}
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800">Today's Tasks</h2>
                <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded-lg">1 Pending</span>
            </div>
            
            <div className="space-y-3">
                <button 
                    onClick={() => setIsLoggerOpen(true)}
                    className="w-full flex items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
                >
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Activity size={24} />
                    </div>
                    <div className="flex-1 ml-4 text-left">
                        <h3 className="font-bold text-slate-800">Log Daily Symptoms</h3>
                        <p className="text-xs text-slate-500">Morning Check-in</p>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-slate-200"></div>
                </button>

                <div className="w-full flex items-center p-4 bg-white rounded-2xl border border-slate-100 opacity-60">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                        <FileText size={24} />
                    </div>
                    <div className="flex-1 ml-4 text-left">
                        <h3 className="font-bold text-slate-800 line-through">Read Article</h3>
                        <p className="text-xs text-slate-500">Nutrition after Chemo</p>
                    </div>
                    <CheckCircle2 size={24} className="text-green-500" />
                </div>
            </div>
        </section>

        {/* Roadmap Preview */}
        <section>
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800">My Roadmap</h2>
                <button className="text-sm font-semibold text-blue-600">View Full</button>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="relative pl-6 border-l-2 border-slate-100 space-y-6">
                    <div className="relative">
                        <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-green-500 ring-4 ring-white"></div>
                        <h4 className="text-sm font-bold text-slate-800">Surgery Completed</h4>
                        <p className="text-xs text-slate-500 mt-1">Oct 10, 2023</p>
                    </div>
                    <div className="relative">
                         <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                        <h4 className="text-sm font-bold text-blue-700">Next Follow-up</h4>
                        <p className="text-xs text-blue-600 font-medium mt-1">Tomorrow, 10:00 AM</p>
                        <div className="mt-3 p-3 bg-blue-50 rounded-xl text-xs text-blue-800">
                            Dr. Carter will review your recovery progress.
                        </div>
                    </div>
                     <div className="relative opacity-50">
                        <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-slate-300 ring-4 ring-white"></div>
                        <h4 className="text-sm font-bold text-slate-800">CT Scan</h4>
                        <p className="text-xs text-slate-500 mt-1">Nov 15, 2023</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Recent Logs (Synced) */}
        {logs.length > 0 && (
          <section>
             <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Logs</h2>
             <div className="space-y-3">
               {logs.map((log) => (
                 <div key={log.id} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 font-semibold">{log.date}</p>
                      <p className="text-sm font-bold text-slate-700">Pain: {log.pain}/5 • Fatigue: {log.fatigue}/5</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">Synced</span>
                 </div>
               ))}
             </div>
          </section>
        )}
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-slate-200 py-3 px-6 flex justify-between items-center z-20 md:hidden">
        <button className="flex flex-col items-center gap-1 text-blue-600">
            <div className="p-1 rounded-lg bg-blue-50"><Activity size={20} /></div>
            <span className="text-[10px] font-bold">Home</span>
        </button>
         <button className="flex flex-col items-center gap-1 text-slate-400">
            <div className="p-1"><Calendar size={20} /></div>
            <span className="text-[10px] font-medium">Roadmap</span>
        </button>
         <button 
            onClick={() => setIsLoggerOpen(true)}
            className="flex flex-col items-center gap-1 text-white -mt-8"
        >
            <div className="p-4 rounded-full bg-blue-600 shadow-lg shadow-blue-300"><Activity size={24} /></div>
        </button>
         <button className="flex flex-col items-center gap-1 text-slate-400">
            <div className="p-1"><FileText size={20} /></div>
            <span className="text-[10px] font-medium">Results</span>
        </button>
         <button className="flex flex-col items-center gap-1 text-slate-400">
            <div className="p-1"><MessageSquare size={20} /></div>
            <span className="text-[10px] font-medium">Chat</span>
        </button>
      </nav>

      <SymptomLogger 
        isOpen={isLoggerOpen} 
        onClose={() => setIsLoggerOpen(false)} 
        onSave={handleSaveLog}
      />
    </div>
  );
};

export default PatientDashboard;