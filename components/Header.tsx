import React from 'react';
import { Search, Bell, HelpCircle, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-6 md:px-8 sticky top-0 z-20">
      {/* Mobile/Tablet spacing fix - empty div or hamburger could go here */}
      <div className="md:hidden">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <span className="font-bold">H</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-lg">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search patients, doctors, appointments..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative">
            <HelpCircle size={22} />
        </button>
        <button className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative">
          <Bell size={22} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden md:block"></div>

        <button className="flex items-center gap-2 md:gap-3 hover:bg-slate-50 p-2 rounded-xl transition-all">
            <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-slate-800">Oct 24, 2023</p>
            </div>
            <div className="bg-blue-100 p-1 rounded-lg">
                <ChevronDown size={16} className="text-blue-600" />
            </div>
        </button>
      </div>
    </header>
  );
};

export default Header;