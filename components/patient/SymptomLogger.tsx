import React, { useState } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { SymptomLog } from '../../types';

interface SymptomLoggerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (log: SymptomLog) => void;
}

const SymptomLogger: React.FC<SymptomLoggerProps> = ({ isOpen, onClose, onSave }) => {
  const [pain, setPain] = useState(2);
  const [fatigue, setFatigue] = useState(2);
  const [nausea, setNausea] = useState(1);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: SymptomLog = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      pain,
      fatigue,
      nausea,
      notes
    };
    onSave(newLog);
    onClose();
  };

  const getSliderColor = (val: number) => {
    if (val < 3) return 'accent-emerald-500';
    if (val < 4) return 'accent-yellow-500';
    return 'accent-red-500';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:px-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Daily Check-in</h3>
            <p className="text-sm text-slate-500">How are you feeling today?</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Pain Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">Pain Level</label>
              <span className={`text-sm font-bold px-2 py-1 rounded-lg ${pain > 3 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>{pain}/5</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="5" 
              value={pain}
              onChange={(e) => setPain(parseInt(e.target.value))}
              className={`w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer ${getSliderColor(pain)}`}
            />
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>None</span>
              <span>Severe</span>
            </div>
          </div>

          {/* Fatigue Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">Fatigue</label>
              <span className={`text-sm font-bold px-2 py-1 rounded-lg ${fatigue > 3 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>{fatigue}/5</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="5" 
              value={fatigue}
              onChange={(e) => setFatigue(parseInt(e.target.value))}
              className={`w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer ${getSliderColor(fatigue)}`}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
             <label className="text-sm font-bold text-slate-700">Notes for Nurse</label>
             <textarea 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none"
                rows={3}
                placeholder="Any new symptoms or questions?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
             />
          </div>
          
          <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2">
            <Save size={20} />
            Submit Log
          </button>
        </form>
      </div>
    </div>
  );
};

export default SymptomLogger;