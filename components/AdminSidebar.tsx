
import React from 'react';
import { ServiceType, UserRole } from '../types';

interface AdminSidebarProps {
  activeService: ServiceType;
  setActiveService: (service: ServiceType) => void;
  onLogout: () => void;
  adminProfile: any;
  enabledServices: Record<ServiceType, boolean>;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  userRole: UserRole;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeService, setActiveService, onLogout, adminProfile, enabledServices, 
  isOpen, onClose, isCollapsed, onToggleCollapse, userRole
}) => {
  const items = [
    { type: ServiceType.CONTROL_PANEL, icon: 'grid_view', label: 'Control Panel' },
    { type: ServiceType.MARKET_LOOK, icon: 'visibility', label: 'Market Look' },
    { type: ServiceType.MARKET_HUP, icon: 'grid_view', label: 'Market Hup' },
    { type: ServiceType.MARKET_VID, icon: 'movie', label: 'Market VID' },
    { type: ServiceType.HATOO, icon: 'center_focus_strong', label: 'HATOo Vision' },
    { type: ServiceType.MERCHANT_DASHBOARD, icon: 'dashboard', label: 'Command Hub' },
    { type: ServiceType.MERCHANT_CHANNEL, icon: 'storefront', label: 'My Store' },
    { type: ServiceType.SOUQ_STORE, icon: 'layers', label: 'Stores' },
    { type: ServiceType.TRENDS, icon: 'trending_up', label: 'Trends' },
    { type: ServiceType.ADMIN_DASHBOARD, icon: 'admin_panel_settings', label: 'Admin Terminal' },
    { type: ServiceType.FAVORITES, icon: 'favorite', label: 'The Favorite' },
    { type: ServiceType.MY_MESSAGE, icon: 'chat', label: 'My Message', special: true },
    { type: ServiceType.USER_PROFILE, icon: 'settings', label: 'Settings' },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed inset-y-0 left-0 ${isCollapsed ? 'w-16' : 'w-72'} border-r border-white/5 bg-[#08090b] flex flex-col shrink-0 z-[70] h-full overflow-y-auto custom-scrollbar shadow-2xl transition-all duration-300 lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className={`p-8 flex items-center gap-4 shrink-0 ${isCollapsed ? 'justify-center' : ''}`} onClick={() => setActiveService(ServiceType.ADMIN_DASHBOARD)}>
          <div className="size-12 bg-[#eab308] rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(234,179,8,0.6)] rotate-3 cursor-pointer">
            <span className="material-symbols-outlined font-black text-3xl">hub</span>
          </div>
          {!isCollapsed && (
            <div className="cursor-pointer">
              <h1 className="text-2xl font-black tracking-tighter italic leading-none">SOUQ<span className="text-[#eab308]">HUP</span></h1>
              <p className="text-[9px] text-[#eab308]/60 uppercase font-black tracking-[0.2em] mt-1 italic">Admin Terminal</p>
            </div>
          )}
          <button onClick={onClose} className="ml-auto lg:hidden text-white/40 hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className={`px-6 mb-10 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <div className={`flex flex-col items-center text-center group cursor-pointer transition-all ${isCollapsed ? 'w-12' : ''}`} onClick={() => setActiveService(ServiceType.USER_PROFILE)}>
            <div className="relative mb-4">
              <div className="absolute -inset-1 rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity bg-[#eab308]"></div>
              <div className="relative size-24 rounded-full border-4 border-[#eab308]/20 p-1 bg-[#08090b] overflow-hidden">
                <img src={adminProfile.avatar} className="size-full rounded-full object-cover" alt="User" />
              </div>
              <div className="absolute bottom-1 right-1 size-6 bg-[#eab308] rounded-full border-4 border-[#08090b] flex items-center justify-center shadow-[0_0_10px_rgba(234,179,8,0.4)]">
                <span className="material-symbols-outlined text-[14px] text-black font-black">verified</span>
              </div>
            </div>
            {!isCollapsed && (
              <div className="space-y-1">
                <p className="text-lg font-black tracking-tight text-white group-hover:text-[#eab308] transition-colors leading-none">{adminProfile.name}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#eab308]">
                  {userRole === 'ADMIN' ? 'Root Terminal' : 'Team Member'}
                </p>
              </div>
            )}
          </div>
        </div>

        <nav className={`flex-1 px-4 space-y-2 mt-4 ${isCollapsed ? 'items-center flex flex-col' : ''}`}>
          {items.map((item) => {
            const isEnabled = enabledServices[item.type];
            
            return (
              <button
                key={item.type}
                onClick={() => setActiveService(item.type)}
                disabled={!isEnabled}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative overflow-hidden group ${
                  activeService === item.type
                    ? 'bg-[#eab308] text-black font-bold shadow-[0_0_20px_rgba(234,179,8,0.6)]'
                    : isEnabled 
                      ? (item.type === ServiceType.MY_MESSAGE 
                          ? 'text-[#eab308] border border-[#eab308]/30 hover:bg-[#eab308]/10'
                          : 'text-white/40 hover:text-white hover:bg-white/5') 
                      : 'opacity-20 cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                {!isCollapsed && (
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm tracking-tight truncate uppercase font-black italic">{item.label}</p>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={onLogout} className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-white/20 hover:text-red-500 hover:bg-red-500/5 transition-all group">
            <span className="material-symbols-outlined text-xl">logout</span>
            {!isCollapsed && <span className="text-sm font-black uppercase italic tracking-widest">Logout Account</span>}
          </button>
        </div>
        
        <button onClick={onToggleCollapse} className={`absolute top-1/2 -translate-y-1/2 ${isCollapsed ? '-right-4' : 'right-0'} transform -translate-x-1/2 bg-white/5 text-white/40 p-2 rounded-full shadow-lg hover:text-white transition-all duration-300 z-50`}>
          <span className="material-symbols-outlined">{isCollapsed ? 'chevron_right' : 'chevron_left'}</span>
        </button>
      </aside>
    </>
  );
};

export default AdminSidebar;
