
import React, { useState, useRef } from 'react';
import UserProfileSidebar from '../components/UserProfileSidebar';
import { UserRole, ServiceType } from '../types';

interface UserProfileProps {
  profile: any;
  setProfile: (p: any) => void;
  onLogout: () => void;
  userRole: UserRole;
  adminProfile: any;
  merchantProfile: any;
  userProfile: any;
  setActiveService: (service: ServiceType) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ profile, setProfile, onLogout, userRole, adminProfile, merchantProfile, userProfile, setActiveService }) => {
  const [activeSetting, setActiveSetting] = useState<'profile_picture' | 'email_settings' | 'password_security' | ServiceType.CONTROL_PANEL | ServiceType.LIVE_ANALYTICS>('profile_picture');
  const [localProfile, setLocalProfile] = useState({ ...profile });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLocalProfile({ ...localProfile, avatar: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfile(localProfile);
    window.alert("Identity Updated Successfully");
  };

  const getRoleLabel = () => {
    if (userRole === 'ADMIN') return 'System Director';
    if (userRole === 'MERCHANT') return 'Wholesale Partner';
    return 'Verified Importer';
  };

  return (
    <div className="flex h-full bg-[#08090b]">
      <UserProfileSidebar
        userRole={userRole}
        userProfile={userProfile}
        adminProfile={adminProfile}
        merchantProfile={merchantProfile}
        onViewProfile={() => setActiveService(ServiceType.CONTROL_PANEL)}
        onSelectSetting={setActiveSetting}
        activeSetting={activeSetting}
      />
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-12">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* RIGHT CONTENT AREA */}
          <div className="flex-1 space-y-10">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
                  <span>Settings</span>
                  <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                  <span className="text-white/40">Personal Profile</span>
                </div>
                <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">Personal Settings</h1>
              </div>
              
              <div className="flex items-center gap-8">
                {((userRole === 'MERCHANT' && merchantProfile?.plan === 'FREE') || (userRole === 'IMPORTER' && userProfile?.plan === 'FREE')) && (
                  <button 
                    onClick={() => window.alert('Redirecting to Pro Upgrade...')}
                    className="flex items-center gap-2 px-6 py-2 bg-primary/10 border border-primary/40 rounded-full text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-black transition-all shadow-neon"
                  >
                    <span className="material-symbols-outlined text-sm">add_circle</span>
                    Upgrade to Pro
                  </button>
                )}
                <div className="text-right space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Profile Strength</p>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary shadow-neon w-[85%]"></div>
                    </div>
                    <span className="text-[10px] font-black text-primary italic">85%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-[48px] p-12 space-y-12 shadow-2xl">
              {/* BASIC INFORMATION */}
              <section className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-primary/40"></div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Basic Information</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-4">Full Name</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">person</span>
                      <input 
                        type="text" 
                        value={localProfile.name}
                        onChange={e => setLocalProfile({...localProfile, name: e.target.value})}
                        className="w-full bg-black/40 border border-white/5 rounded-[24px] pl-16 pr-8 py-5 text-sm font-bold text-white outline-none focus:border-primary/40 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-4">Email Address</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">mail</span>
                      <input 
                        type="email" 
                        value={localProfile.email || ''}
                        onChange={e => setLocalProfile({...localProfile, email: e.target.value})}
                        className="w-full bg-black/40 border border-white/5 rounded-[24px] pl-16 pr-8 py-5 text-sm font-bold text-white outline-none focus:border-primary/40 transition-all"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-4">Phone Number</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">call</span>
                      <input 
                        type="text" 
                        value={localProfile.phone || ''}
                        onChange={e => setLocalProfile({...localProfile, phone: e.target.value})}
                        className="w-full bg-black/40 border border-white/5 rounded-[24px] pl-16 pr-8 py-5 text-sm font-bold text-white outline-none focus:border-primary/40 transition-all"
                        placeholder="+20 123 456 7890"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* ACTIONS */}
              <div className="flex justify-end gap-4 pt-8 border-t border-white/5">
                <button 
                  onClick={() => setLocalProfile({...profile})}
                  className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-12 py-5 bg-primary text-black font-black rounded-2xl uppercase tracking-[0.2em] italic text-sm shadow-neon-bright hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
