import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarDays, 
  BarChart2, 
  MessageSquare, 
  Settings, 
  Activity,
  LogOut,
  Stethoscope,
  ClipboardList
} from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { User } from '../types';

interface SidebarProps {
  user: User;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutDashboard': return <LayoutDashboard size={20} />;
      case 'Users': return <Users size={20} />;
      case 'CalendarDays': return <CalendarDays size={20} />;
      case 'BarChart2': return <BarChart2 size={20} />;
      case 'MessageSquare': return <MessageSquare size={20} />;
      case 'Settings': return <Settings size={20} />;
      default: return <Activity size={20} />;
    }
  };

  // Custom Nav items based on role could be implemented here
  const navItems = user.role === 'nurse' 
    ? [
        { name: 'Triage Board', icon: 'LayoutDashboard', active: true },
        { name: 'My Patients', icon: 'Users', active: false },
        { name: 'Messages', icon: 'MessageSquare', active: false },
        { name: 'Lab Results', icon: 'Activity', active: false },
      ]
    : NAV_ITEMS;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-30 hidden md:flex">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${user.role === 'doctor' ? 'bg-blue-600 shadow-blue-200' : 'bg-emerald-600 shadow-emerald-200'}`}>
          {user.role === 'doctor' ? <Stethoscope size={24} strokeWidth={2.5} /> : <ClipboardList size={24} strokeWidth={2.5} />}
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Healytics</h1>
          <p className="text-xs text-slate-400 font-medium capitalize">{user.role} Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Menu</p>
        {navItems.map((item) => (
          <button
            key={item.name}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              item.active
                ? user.role === 'nurse' ? 'bg-emerald-50 text-emerald-600 shadow-sm ring-1 ring-emerald-100' : 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {getIcon(item.icon)}
            {item.name}
          </button>
        ))}

        <div className="pt-8">
          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">General</p>
           <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all">
            <Settings size={20} />
            Settings
          </button>
        </div>
      </nav>

      {/* User Profile Snippet */}
      <div className="p-4 border-t border-gray-100">
        <div onClick={onLogout} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer group">
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
          <div className="flex-1 overflow-hidden">
            <h4 className="text-sm font-semibold text-slate-800 truncate group-hover:text-red-600">{user.name}</h4>
            <p className="text-xs text-slate-500 truncate capitalize">{user.role}</p>
          </div>
          <LogOut size={18} className="text-slate-400 group-hover:text-red-500" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;