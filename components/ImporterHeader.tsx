
import React from 'react';
import { ServiceType } from '../types';

interface ImporterHeaderProps {
  activeService: ServiceType;
  setActiveService: (service: ServiceType) => void;
  onMenuClick: () => void;
}

const ImporterHeader: React.FC<ImporterHeaderProps> = ({ activeService, setActiveService, onMenuClick }) => {
  return (
    <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#08090b]/80 backdrop-blur-md z-40 shrink-0">
      <div className="flex items-center gap-4">
        {activeService === ServiceType.CONTROL_PANEL && (
          <button onClick={onMenuClick} className="lg:hidden p-2 bg-white/5 rounded-xl text-white/40 hover:text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
        )}
        {activeService !== ServiceType.CONTROL_PANEL && (
          <button onClick={() => setActiveService(ServiceType.CONTROL_PANEL)} className="flex items-center gap-2 px-4 py-2 bg-[#0df20d]/10 hover:bg-[#0df20d]/20 text-[#0df20d] rounded-xl text-[10px] font-black uppercase tracking-widest border border-[#0df20d]/20 transition-all group">
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back to Hub
          </button>
        )}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold flex items-center gap-2 italic uppercase tracking-tighter">
            {activeService}
            <span className="material-symbols-outlined text-[#0df20d] text-sm fill-1">verified</span>
          </h2>
          <p className="text-[10px] text-white/40 font-medium tracking-widest uppercase italic">Verified Egypt Hub</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-lg">search</span>
          <input type="text" placeholder="Global trade..." className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#0df20d]/50 transition-all w-48 placeholder:text-white/20" />
        </div>
        <button onClick={() => setActiveService(ServiceType.NOTIFICATION_SETTINGS)} className={`p-2 rounded-full ${activeService === ServiceType.NOTIFICATION_SETTINGS ? 'text-[#0df20d]' : 'text-white/40 hover:text-white'}`}><span className="material-symbols-outlined">notifications</span></button>
        <button onClick={() => setActiveService(ServiceType.USER_PROFILE)} className="p-2 rounded-full text-white/40 hover:text-white transition-all"><span className="material-symbols-outlined">settings</span></button>
      </div>
    </header>
  );
};

export default ImporterHeader;
