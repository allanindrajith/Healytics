import React from 'react';
import { StatMetric } from '../types';
import { Users, Calendar, Activity, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  metric: StatMetric;
}

const StatCard: React.FC<StatCardProps> = ({ metric }) => {
  const getIcon = () => {
    switch (metric.icon) {
      case 'users': return <Users size={24} className="text-white" />;
      case 'calendar': return <Calendar size={24} className="text-white" />;
      case 'activity': return <Activity size={24} className="text-white" />;
      case 'dollar': return <DollarSign size={24} className="text-white" />;
      default: return <Activity size={24} className="text-white" />;
    }
  };

  const isTrendPositive = metric.trend > 0;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-opacity-20 ${metric.color} bg-opacity-90 shadow-indigo-200`}>
          {getIcon()}
        </div>
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${isTrendPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {isTrendPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{Math.abs(metric.trend)}%</span>
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-slate-800 mb-1">{metric.value}</h3>
        <p className="text-sm text-slate-500 font-medium">{metric.label}</p>
      </div>
    </div>
  );
};

export default StatCard;