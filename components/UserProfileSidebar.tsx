import React from 'react';
import { UserRole, ServiceType } from '../types';

interface UserProfileSidebarProps {
  userRole: UserRole;
  userProfile?: any;
  adminProfile?: any;
  merchantProfile?: any;
  onViewProfile: () => void;
  onSelectSetting: (setting: 'profile_picture' | 'email_settings' | 'password_security' | ServiceType.CONTROL_PANEL | ServiceType.LIVE_ANALYTICS) => void;
  activeSetting: 'profile_picture' | 'email_settings' | 'password_security' | ServiceType.CONTROL_PANEL | ServiceType.LIVE_ANALYTICS;
}

const UserProfileSidebar: React.FC<UserProfileSidebarProps> = ({ userRole, userProfile, adminProfile, merchantProfile, onViewProfile, onSelectSetting, activeSetting }) => {
  const displayName = userRole === 'ADMIN' ? adminProfile.name : (userRole === 'MERCHANT' ? merchantProfile.name : userProfile.name);
  const displayAvatar = userRole === 'ADMIN' ? adminProfile.avatar : (userRole === 'MERCHANT' ? merchantProfile.avatar : userProfile.avatar);

  const getRoleLabel = () => {
    if (userRole === 'ADMIN') return 'System Director';
    if (userRole === 'MERCHANT') return 'Wholesale Partner';
    return 'Verified Importer';
  };

  return (
    <div className="w-80 shrink-0 h-full overflow-y-auto custom-scrollbar p-8 space-y-8">
      {/* PROFILE CARD - MATCHING IMAGE DESIGN */}
      <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8 flex flex-col items-center text-center shadow-2xl">
        <div className="relative mb-6">
          <div className="absolute -inset-2 rounded-full blur-xl opacity-40 bg-primary"></div>
          <div className="relative size-28 rounded-full border-4 border-primary/20 p-1 bg-[#08090b] overflow-hidden">
            <img src={displayAvatar} className="size-full rounded-full object-cover" alt="Profile" />
          </div>
          <div className="absolute bottom-1 right-1 size-6 bg-primary rounded-full border-4 border-[#08090b] flex items-center justify-center text-black shadow-neon">
            <span className="material-symbols-outlined text-[10px] font-black">photo_camera</span>
          </div>
        </div>

        <h2 className="text-xl font-black italic uppercase text-white tracking-tighter mb-1">{displayName}</h2>
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-6 italic">{getRoleLabel()}</p>

        <button 
          className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-black transition-all"
        >
          Change Photo
        </button>
      </div>

      {/* SETTINGS MENU - MATCHING IMAGE DESIGN */}
      <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-4 space-y-2 shadow-2xl">
        <button
          onClick={() => onSelectSetting('profile_picture')}
          className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative overflow-hidden group ${activeSetting === 'profile_picture' ? 'bg-primary/10 text-primary font-bold' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
        >
          {activeSetting === 'profile_picture' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-neon"></div>}
          <span className="material-symbols-outlined text-xl">person</span>
          <p className="flex-1 text-left text-sm tracking-tight truncate uppercase font-black italic">Account</p>
        </button>

        <button
          onClick={() => {}}
          className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative overflow-hidden group text-white/40 hover:text-white hover:bg-white/5`}
        >
          <span className="material-symbols-outlined text-xl">payments</span>
          <p className="flex-1 text-left text-sm tracking-tight truncate uppercase font-black italic">Billing</p>
        </button>
      </div>

      {/* BACK TO DASHBOARD */}
      <button 
        onClick={onViewProfile}
        className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:border-primary/40 transition-all flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Back to Dashboard
      </button>
    </div>
  );
};

export default UserProfileSidebar;
