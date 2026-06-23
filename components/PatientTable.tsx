import React from 'react';
import { Patient } from '../types';
import { MoreHorizontal, ExternalLink } from 'lucide-react';

interface PatientTableProps {
  patients: Patient[];
}

const PatientTable: React.FC<PatientTableProps> = ({ patients }) => {
  const getStatusStyle = (status: Patient['status']) => {
    switch (status) {
      case 'Recovered': return 'bg-emerald-50 text-emerald-600 ring-emerald-500/20';
      case 'Treatment': return 'bg-blue-50 text-blue-600 ring-blue-500/20';
      case 'New': return 'bg-purple-50 text-purple-600 ring-purple-500/20';
      case 'Critical': return 'bg-rose-50 text-rose-600 ring-rose-500/20';
      default: return 'bg-slate-50 text-slate-600 ring-slate-500/20';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Patient Name</th>
            <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">ID</th>
            <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Age/Gender</th>
            <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
            <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Condition</th>
            <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {patients.map((patient) => (
            <tr key={patient.id} className="group hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-none">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <img src={patient.avatar} alt={patient.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                  <div>
                    <p className="font-semibold text-slate-800">{patient.name}</p>
                    <p className="text-xs text-slate-400">Last Visit: {patient.lastVisit}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 text-slate-500 font-medium">#{patient.id}</td>
              <td className="py-3 px-4 text-slate-600">{patient.age} / {patient.gender}</td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getStatusStyle(patient.status)}`}>
                  {patient.status}
                </span>
              </td>
              <td className="py-3 px-4 text-slate-600">{patient.condition}</td>
              <td className="py-3 px-4 text-right">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <MoreHorizontal size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;