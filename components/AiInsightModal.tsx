import React from 'react';
import { AiInsight } from '../types';
import { Sparkles, X, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

interface AiInsightModalProps {
  isOpen: boolean;
  onClose: () => void;
  insights: AiInsight[];
  isLoading: boolean;
}

const AiInsightModal: React.FC<AiInsightModalProps> = ({ isOpen, onClose, insights, isLoading }) => {
  if (!isOpen) return null;

  const getIcon = (type: AiInsight['type']) => {
    switch (type) {
      case 'positive': return <CheckCircle2 className="text-emerald-500" size={20} />;
      case 'warning': return <AlertTriangle className="text-amber-500" size={20} />;
      default: return <Info className="text-blue-500" size={20} />;
    }
  };

  const getBgColor = (type: AiInsight['type']) => {
    switch (type) {
      case 'positive': return 'bg-emerald-50 border-emerald-100';
      case 'warning': return 'bg-amber-50 border-amber-100';
      default: return 'bg-blue-50 border-blue-100';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                 <Sparkles size={20} className="text-yellow-200" />
              </div>
              <h3 className="text-xl font-bold">Gemini Health Insights</h3>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          <p className="text-indigo-100 text-sm mt-2">
            AI-powered analysis of your current dashboard metrics.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-slate-500 font-medium animate-pulse">Analyzing health metrics...</p>
            </div>
          ) : insights.length > 0 ? (
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className={`p-4 rounded-xl border ${getBgColor(insight.type)} flex gap-4`}>
                  <div className="mt-0.5 flex-shrink-0">
                    {getIcon(insight.type)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">{insight.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-12 text-slate-500">
                <p>No insights available. Try adding an API Key.</p>
             </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button onClick={onClose} className="px-6 py-2.5 bg-white border border-gray-300 rounded-xl font-semibold text-slate-700 hover:bg-gray-50 transition-colors text-sm shadow-sm">
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default AiInsightModal;