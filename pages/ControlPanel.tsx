
import React from 'react';
import { ServiceType, UserRole } from '../types';

interface ControlPanelProps {
  userProfile: any;
  merchantProfile: any;
  adminProfile: any;
  userRole: UserRole;
  onSelectService: (service: ServiceType) => void;
  onLogout: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  userProfile, 
  merchantProfile, 
  adminProfile, 
  userRole, 
  onSelectService,
  onLogout 
}) => {
  const profile = userRole === 'ADMIN' ? adminProfile : (userRole === 'MERCHANT' ? merchantProfile : userProfile);

  const services = [
    { id: ServiceType.MARKET_LOOK, name: 'Market Look', icon: 'visibility' },
    { id: ServiceType.MARKET_HUP, name: 'Market Hub', icon: 'hub' },
    { id: ServiceType.MARKET_VID, name: 'Market VID', icon: 'videocam' },
    { id: ServiceType.HATOO, name: 'HATOO', icon: 'shopping_cart_checkout' },
  ];

  return (
    <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-gradient-to-br from-[#0a0a0a] to-[#111] custom-scrollbar h-full">
      <div className="max-w-5xl mx-auto h-full flex flex-col">
        <div className="mb-4 md:mb-8 shrink-0">
          <div className="flex items-center gap-4 md:gap-6 mb-2">
            <div className="size-12 md:size-16 bg-primary rounded-xl md:rounded-2xl flex items-center justify-center text-black shadow-neon-bright rotate-3 shrink-0 overflow-visible">
              <span className="material-symbols-outlined font-black text-2xl md:text-3xl leading-none select-none">hub</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter text-white leading-none select-none">
              SOUQ<span className="text-primary">HUP</span>
            </h1>
          </div>
          <div className="flex flex-col ml-1 md:ml-2">
            <p className="text-primary text-base md:text-lg font-black uppercase tracking-[0.2em] italic mb-0.5">Control Panel</p>
            <p className="text-white/40 text-[10px] md:text-xs font-medium uppercase tracking-widest">Manage your SOUQHUP ecosystem services</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4 shrink-0">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className="group relative bg-[#0d0d0d] border border-white/5 rounded-[16px] md:rounded-[24px] p-4 md:p-6 flex flex-col items-center justify-center gap-2 md:gap-4 transition-all hover:shadow-[0_0_60px_rgba(168,85,247,0.15)] overflow-hidden"
            >
              <div className="size-12 md:size-16 rounded-full flex items-center justify-center text-primary group-hover:text-[#a855f7] group-hover:scale-110 transition-all duration-500">
                <span className="material-symbols-outlined text-3xl md:text-4xl drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] leading-none">
                  {service.icon}
                </span>
              </div>
              <span className="text-base md:text-lg font-black italic uppercase tracking-tight text-white/90 group-hover:text-white transition-colors">{service.name}</span>
              
              {/* Neon Glow Effect - Primary by default, Purple on hover */}
              <div className="absolute inset-0 rounded-[16px] md:rounded-[24px] border-2 border-primary group-hover:border-[#a855f7] transition-colors duration-300 blur-md pointer-events-none opacity-20 group-hover:opacity-100"></div>
              <div className="absolute inset-0 rounded-[16px] md:rounded-[24px] border border-primary group-hover:border-[#a855f7] transition-colors duration-300 pointer-events-none opacity-40 group-hover:opacity-100"></div>
            </button>
          ))}
        </div>

        <button
          onClick={() => onSelectService(ServiceType.SOUQ_STORE)}
          className="group relative w-full bg-[#0d0d0d] border border-white/5 rounded-[16px] md:rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 transition-all hover:shadow-[0_0_60px_rgba(168,85,247,0.15)] overflow-hidden shrink-0"
        >
          <div className="size-12 md:size-16 rounded-full flex items-center justify-center text-primary group-hover:text-[#a855f7] group-hover:scale-110 transition-all duration-500">
            <span className="material-symbols-outlined text-3xl md:text-4xl drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] leading-none">storefront</span>
          </div>
          <span className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white/90 group-hover:text-white transition-colors">Souq Store</span>

          {/* Neon Glow Effect - Primary by default, Purple on hover */}
          <div className="absolute inset-0 rounded-[16px] md:rounded-[24px] border-2 border-primary group-hover:border-[#a855f7] transition-colors duration-300 blur-md pointer-events-none opacity-20 group-hover:opacity-100"></div>
          <div className="absolute inset-0 rounded-[16px] md:rounded-[24px] border border-primary group-hover:border-[#a855f7] transition-colors duration-300 pointer-events-none opacity-40 group-hover:opacity-100"></div>
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
