import React, { useState } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../constants';
import { Building2, Heart, ArrowRight, ShieldCheck, Stethoscope, ClipboardList } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showStaffOptions, setShowStaffOptions] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0F9FF] flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Header Section */}
      <div className="text-center mb-10 md:mb-12 max-w-3xl pt-8 md:pt-0">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 tracking-tight">National Cancer Institute</h1>
        <div className="flex flex-col items-center gap-4">
            <h2 className="text-lg md:text-xl text-slate-600 font-medium relative inline-block">
            Advanced Colorectal Cancer Care Center
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full"></span>
            </h2>
        </div>
        
        <div className="mt-10 space-y-1">
            <p className="text-slate-500 font-medium">Welcome to Healytics</p>
            <p className="text-slate-400 text-sm">Please select your access type to continue</p>
        </div>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
        
        {/* Hospital Staff Card */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden relative group hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-emerald-500"></div>
            <div className="p-6 md:p-8 flex flex-col h-full items-center text-center">
                <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Building2 size={32} className="text-teal-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Hospital Staff</h3>
                <p className="text-slate-500 text-sm mb-8 px-4">Access for medical professionals and administrators</p>
                
                <div className="w-full space-y-4 mb-8 text-left px-2 md:px-4">
                    <div className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="w-2 h-2 mt-1.5 rounded-full bg-teal-400 flex-shrink-0"></span>
                        <span><span className="font-semibold text-slate-800">Nurse Navigator</span> - Patient monitoring & care coordination</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="w-2 h-2 mt-1.5 rounded-full bg-indigo-400 flex-shrink-0"></span>
                        <span><span className="font-semibold text-slate-800">Doctor Dashboard</span> - Clinical oversight & appointments</span>
                    </div>
                     <div className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="w-2 h-2 mt-1.5 rounded-full bg-rose-400 flex-shrink-0"></span>
                        <span><span className="font-semibold text-slate-800">Admin Navigator</span> - User management & system control</span>
                    </div>
                </div>

                <div className="mt-auto w-full">
                    {!showStaffOptions ? (
                        <button 
                            onClick={() => setShowStaffOptions(true)}
                            className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-teal-200 transition-all flex items-center justify-center gap-2"
                        >
                            Continue as Hospital Staff
                            <ArrowRight size={18} />
                        </button>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
                             <button 
                                onClick={() => onLogin(MOCK_USERS[0])} // Doctor
                                className="py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl border border-indigo-200 transition-all flex flex-col items-center gap-1"
                            >
                                <Stethoscope size={20} />
                                <span className="text-xs">Doctor</span>
                            </button>
                            <button 
                                onClick={() => onLogin(MOCK_USERS[1])} // Nurse
                                className="py-3 bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold rounded-xl border border-teal-200 transition-all flex flex-col items-center gap-1"
                            >
                                <ClipboardList size={20} />
                                <span className="text-xs">Nurse</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Patient Portal Card */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden relative group hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
             <div className="p-6 md:p-8 flex flex-col h-full items-center text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Heart size={32} className="text-blue-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Patient Portal</h3>
                <p className="text-slate-500 text-sm mb-8 px-4">Personal health monitoring and care access</p>
                
                 <div className="w-full space-y-4 mb-8 text-left px-2 md:px-4">
                    <div className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="w-2 h-2 mt-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                        <span>Track symptoms and log health data daily</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="w-2 h-2 mt-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                        <span>View test results and treatment roadmap</span>
                    </div>
                     <div className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="w-2 h-2 mt-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                        <span>Connect with your care team via messaging</span>
                    </div>
                </div>

                <div className="mt-auto w-full">
                    <button 
                        onClick={() => onLogin(MOCK_USERS[2])} // Patient
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
                    >
                        Continue as Patient
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Footer Security Note */}
      <div className="mt-12 max-w-2xl w-full px-4 pb-6">
        <div className="bg-slate-100/50 border border-slate-200 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-slate-700 font-semibold text-sm mb-1">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>Secure Access</span>
            </div>
            <p className="text-xs text-slate-500">
                <span className="font-medium text-slate-600">Secure Access:</span> All portals are HIPAA-compliant and protected with industry-standard encryption
                <br className="hidden md:block" />
                <span className="md:hidden"> </span>
                Your health data privacy and security are our top priorities
            </p>
        </div>
      </div>

    </div>
  );
};

export default Login;