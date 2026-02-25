
import React from 'react';
import { ServiceType, UserRole } from '../types';

interface SidebarProps {
  activeService: ServiceType;
  setActiveService: (service: ServiceType) => void;
  userRole: UserRole;
  onLogout: () => void;
  merchantProfile?: any;
  adminProfile?: any;
  userProfile?: any;
  enabledServices: Record<ServiceType, boolean>;
  onUpgradeClick: () => void;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeService, setActiveService, userRole, onLogout, merchantProfile, adminProfile, userProfile, enabledServices, onUpgradeClick, isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const isFreeMerchant = userRole === 'MERCHANT' && merchantProfile?.plan === 'FREE';

  const items = [
    { type: ServiceType.CONTROL_PANEL, icon: 'grid_view', label: 'Control Panel', roles: ['IMPORTER', 'MERCHANT', 'ADMIN'], pro: false },
    { type: ServiceType.MARKET_LOOK, icon: 'visibility', label: 'Market Look', roles: ['IMPORTER', 'MERCHANT', 'ADMIN'], pro: false },
    { type: ServiceType.MARKET_HUP, icon: 'grid_view', label: 'Market Hup', roles: ['IMPORTER', 'MERCHANT', 'ADMIN'], pro: true },
    { type: ServiceType.MARKET_VID, icon: 'movie', label: 'Market VID', roles: ['IMPORTER', 'MERCHANT', 'ADMIN'], pro: true },
    { type: ServiceType.HATOO, icon: 'center_focus_strong', label: 'HATOo Vision', roles: ['IMPORTER', 'MERCHANT', 'ADMIN'], pro: true },
    { type: ServiceType.MERCHANT_DASHBOARD, icon: 'dashboard', label: 'Command Hub', roles: ['ADMIN'], pro: true },
    { type: ServiceType.MERCHANT_CHANNEL, icon: 'storefront', label: 'My Store', roles: ['MERCHANT', 'ADMIN'], pro: false },
    { type: ServiceType.SOUQ_STORE, icon: 'store', label: 'Stores', roles: ['IMPORTER', 'ADMIN'], pro: false },
    { type: ServiceType.TRENDS, icon: 'trending_up', label: 'Trends', roles: ['IMPORTER', 'MERCHANT', 'ADMIN'], pro: false },
    { type: ServiceType.ADMIN_DASHBOARD, icon: 'admin_panel_settings', label: 'Admin Terminal', roles: ['ADMIN'], pro: false },
    { type: ServiceType.FAVORITES, icon: 'favorite', label: 'The Favorite', roles: ['IMPORTER', 'ADMIN'], pro: false },
    { type: ServiceType.MY_MESSAGE, icon: 'chat', label: 'My Message', roles: ['IMPORTER', 'MERCHANT', 'ADMIN'], pro: false, special: true },
    { type: ServiceType.USER_PROFILE, icon: 'settings', label: 'Settings', roles: ['IMPORTER', 'MERCHANT', 'ADMIN'], pro: false },
  ];

  const isFreeImporter = userRole === 'IMPORTER' && userProfile?.plan === 'FREE';

  const filteredItems = items.filter(item => item.roles.includes(userRole));

  const isFreeUser = userRole === 'IMPORTER' && userProfile?.plan === 'FREE';

  const displayName = userRole === 'ADMIN' ? adminProfile.name : (userRole === 'MERCHANT' ? merchantProfile.name : userProfile.name);
  const displayAvatar = userRole === 'ADMIN' ? adminProfile.avatar : (userRole === 'MERCHANT' ? merchantProfile.avatar : userProfile.avatar);

  const getPlanBadge = () => {
    if (userRole === 'ADMIN') return 'Root Terminal';
    
    if (userRole === 'MERCHANT') {
      const plan = merchantProfile?.plan || 'FREE';
      return plan === 'PRO' ? 'Verified Pro Merchant' : 'Free Merchant';
    }
    
    const plan = userProfile?.plan || 'FREE';
    switch(plan) {
      case 'KING': return 'King Importer';
      case 'SUPER': return 'Super Importer';
      case 'PRO': return 'Pro Importer';
      default: return 'Free Importer';
    }
  };

  const getPlanColorClass = () => {
    if (userRole === 'ADMIN') return 'text-primary';
    if (userRole === 'MERCHANT') {
      return merchantProfile?.plan === 'PRO' ? 'text-primary' : 'text-white/40';
    }
    return userProfile?.plan !== 'FREE' ? 'text-primary' : 'text-white/40';
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 ${isCollapsed ? 'w-16' : 'w-72'} border-r border-white/5 bg-[#08090b] flex flex-col shrink-0 z-[70] h-full overflow-y-auto custom-scrollbar shadow-2xl transition-all duration-300 lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* BRANDING */}
        <div className={`p-8 flex items-center gap-4 shrink-0 ${isCollapsed ? 'justify-center' : ''}`} onClick={() => setActiveService(userRole === 'ADMIN' ? ServiceType.ADMIN_DASHBOARD : (userRole === 'MERCHANT' ? ServiceType.MERCHANT_DASHBOARD : ServiceType.MARKET_LOOK))}>
          <div className="size-12 bg-primary rounded-2xl flex items-center justify-center text-background-dark shadow-neon-bright rotate-3 cursor-pointer">
            <span className="material-symbols-outlined font-black text-3xl">hub</span>
          </div>
          {!isCollapsed && (
            <div className="cursor-pointer">
              <h1 className="text-2xl font-black tracking-tighter italic leading-none">SOUQ<span className="text-primary">HUP</span></h1>
              <p className="text-[9px] text-primary/60 uppercase font-black tracking-[0.2em] mt-1 italic">Trade Distribution</p>
            </div>
          )}
          <button onClick={onClose} className="ml-auto lg:hidden text-white/40 hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* PROFILE SECTOR - MATCHING UPLOADED DESIGN */}
        <div className={`px-6 mb-10 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <div 
            className={`flex flex-col items-center text-center group cursor-pointer transition-all ${isCollapsed ? 'w-12' : ''}`} 
            onClick={() => setActiveService(ServiceType.USER_PROFILE)}
          >
            <div className="relative mb-4">
              {/* NEON GLOW RING */}
              <div className={`absolute -inset-1 rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity bg-primary`}></div>
              <div className={`relative size-24 rounded-full border-4 border-primary/20 p-1 bg-[#08090b] overflow-hidden`}>
                <img src={displayAvatar} className="size-full rounded-full object-cover" alt="User" />
              </div>
              {/* STATUS INDICATOR */}
              <div className="absolute bottom-1 right-1 size-6 bg-primary rounded-full border-4 border-[#08090b] flex items-center justify-center shadow-neon">
                <span className="material-symbols-outlined text-[14px] text-black font-black">verified</span>
              </div>
            </div>
            
            {!isCollapsed && (
              <div className="space-y-1">
                <p className="text-lg font-black tracking-tight text-white group-hover:text-primary transition-colors leading-none">{displayName}</p>
                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${getPlanColorClass()}`}>
                  {getPlanBadge()}
                </p>
              </div>
            )}
          </div>
        </div>

      {/* NAVIGATION */}
      <nav className={`flex-1 px-4 space-y-2 mt-4 ${isCollapsed ? 'items-center flex flex-col' : ''}`}>
        {filteredItems.map((item) => {
          const isEnabled = enabledServices[item.type];
          const isProLocked = (isFreeMerchant && item.pro) || 
            (isFreeImporter && 
              item.type !== ServiceType.MARKET_LOOK && 
              item.type !== ServiceType.CONTROL_PANEL && 
              item.type !== ServiceType.USER_PROFILE && 
              item.type !== ServiceType.MY_MESSAGE &&
              item.type !== ServiceType.FAVORITES &&
              item.type !== ServiceType.SOUQ_STORE &&
              item.type !== ServiceType.TRENDS
            );
          
          return (
            <button
              key={item.type}
              onClick={() => {
                if (isProLocked) {
                  onUpgradeClick();
                } else {
                  setActiveService(item.type);
                }
              }}
              disabled={!isEnabled}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative overflow-hidden group ${
                activeService === item.type
                  ? (item.type === ServiceType.MY_MESSAGE 
                      ? (userRole === 'ADMIN' ? 'bg-[#eab308] text-black font-bold shadow-[0_0_20px_rgba(234,179,8,0.6)]' 
                        : userRole === 'MERCHANT' ? 'bg-[#00f2ff] text-black font-bold shadow-[0_0_20px_rgba(0,242,255,0.6)]' 
                        : 'bg-[#0df20d] text-black font-bold shadow-[0_0_20px_rgba(13,242,13,0.6)]')
                      : 'bg-primary text-black font-bold shadow-neon-bright')
                  : isEnabled 
                    ? (item.type === ServiceType.MY_MESSAGE 
                        ? (userRole === 'ADMIN' ? 'text-[#eab308] border border-[#eab308]/30 hover:bg-[#eab308]/10'
                          : userRole === 'MERCHANT' ? 'text-[#00f2ff] border border-[#00f2ff]/30 hover:bg-[#00f2ff]/10'
                          : 'text-[#0df20d] border border-[#0df20d]/30 hover:bg-[#0df20d]/10')
                        : 'text-white/40 hover:text-white hover:bg-white/5') 
                    : 'opacity-20 cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {!isCollapsed && (
                <div className="flex-1 text-left min-w-0">
                <p className="text-sm tracking-tight truncate uppercase font-black italic">{item.label}</p>
                {isProLocked && (
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px] text-primary">lock</span>
                    <p className="text-[7px] font-black uppercase tracking-widest text-primary italic">Pro Locked</p>
                  </div>
                )}
              </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* LOGOUT AT BOTTOM */}
      <div className="p-4 border-t border-white/5">
        <button onClick={onLogout} className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-white/20 hover:text-red-500 hover:bg-red-500/5 transition-all group">
          <span className="material-symbols-outlined text-xl">logout</span>
          {!isCollapsed && <span className="text-sm font-black uppercase italic tracking-widest">Logout Account</span>}
        </button>
      </div>
      
      <button 
        onClick={onToggleCollapse}
        className={`absolute top-1/2 -translate-y-1/2 ${isCollapsed ? '-right-4' : 'right-0'} transform -translate-x-1/2 bg-white/5 text-white/40 p-2 rounded-full shadow-lg hover:text-white transition-all duration-300 z-50`}
      >
        <span className="material-symbols-outlined">
          {isCollapsed ? 'chevron_right' : 'chevron_left'}
        </span>
      </button>
      </aside>
    </>
  );
};

export default Sidebar;
