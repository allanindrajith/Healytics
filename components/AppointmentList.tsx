import React from 'react';
import { Appointment } from '../types';
import { Clock, User } from 'lucide-react';

interface AppointmentListProps {
  appointments: Appointment[];
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  return (
    <div className="space-y-4">
      {appointments.map((apt) => (
        <div key={apt.id} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all bg-white">
            <div className="flex flex-col items-center justify-center w-14 h-14 bg-blue-50 rounded-xl text-blue-600 flex-shrink-0">
                <span className="text-xs font-bold uppercase">{apt.date}</span>
                <span className="text-lg font-bold">{apt.time.split(' ')[0]}</span>
            </div>
            
            <div className="flex-1">
                <h4 className="font-semibold text-slate-800">{apt.type}</h4>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><User size={12} /> {apt.doctorName}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>Patient: {apt.patientName}</span>
                </div>
            </div>

            <button className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                Details
            </button>
        </div>
      ))}
      <button className="w-full py-3 text-sm font-semibold text-slate-500 border border-dashed border-slate-300 rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-colors">
        View Full Schedule
      </button>
    </div>
  );
};

export default AppointmentList;