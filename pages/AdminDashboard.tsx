
import React, { useState, useRef } from 'react';
import { ServiceType } from '../types';

interface AutomationProfile {
  id: string;
  name: string;
  service: ServiceType;
  interval: number;
  strategy: 'RANDOM' | 'CHRONOLOGICAL' | 'TRENDING' | 'AI_CURATED';
  active: boolean;
  monitoredItems: number;
}

interface AdminDashboardProps {
  enabledServices: Record<ServiceType, boolean>;
  setEnabledServices: (services: Record<ServiceType, boolean>) => void;
  totalUsers: number;
  freeUsers: number;
  proUsers: number;
  totalViews: number;
  totalInteractions: number;
  adminProfile: any;
  setAdminProfile: (p: any) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  enabledServices, 
  setEnabledServices, 
  totalUsers, 
  freeUsers, 
  proUsers,
  totalViews,
  totalInteractions,
  adminProfile,
  setAdminProfile,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'AUTOMATION' | 'TEAM' | 'PROFILE'>('OVERVIEW');
  const [automationProfiles, setAutomationProfiles] = useState<AutomationProfile[]>([
    { id: '1', name: 'Look Library Rotation', service: ServiceType.MARKET_LOOK, interval: 60, strategy: 'RANDOM', active: true, monitoredItems: 8 },
    { id: '2', name: 'Hup Trending Pulse', service: ServiceType.MARKET_HUP, interval: 30, strategy: 'TRENDING', active: true, monitoredItems: 12 },
    { id: '3', name: 'Vid Feed Cycle', service: ServiceType.MARKET_VID, interval: 15, strategy: 'CHRONOLOGICAL', active: false, monitoredItems: 15 },
    { id: '4', name: 'HATOo Database Sync', service: ServiceType.HATOO, interval: 1440, strategy: 'AI_CURATED', active: true, monitoredItems: 10 },
    { id: '5', name: 'Souq Managed Rotation', service: ServiceType.SOUQ_STORE, interval: 120, strategy: 'TRENDING', active: true, monitoredItems: 5 },
    { id: '6', name: 'Profile Discoverability', service: ServiceType.USER_PROFILE, interval: 720, strategy: 'RANDOM', active: true, monitoredItems: 20 },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const stats = [
    { label: 'PLATFORM REACH: TOTAL VIEWS', value: totalViews.toLocaleString(), color: '#0df20d', icon: 'visibility', description: 'Total catalog visibility across Egypt' },
    { label: 'ENGAGEMENT: INTERACTIONS', value: totalInteractions.toLocaleString(), color: '#00e5ff', icon: 'touch_app', description: 'Total clicks, saves and inquiries' },
    { label: 'SYSTEM NODES: TOTAL USERS', value: totalUsers, color: '#facc15', icon: 'hub', description: 'Real-time connected trade entities' },
    { label: 'PREMIUM TIER: PRO ACCESS', value: proUsers, color: '#ff0055', icon: 'workspace_premium', description: 'Verified wholesale enterprises' },
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAdminProfile({ ...adminProfile, avatar: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const updateProfile = (id: string, field: keyof AutomationProfile, value: any) => {
    setAutomationProfiles(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  // Fix: Defined missing handleToggleAutomation function
  const handleToggleAutomation = (id: string) => {
    setAutomationProfiles(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-full">
      {/* ADMIN SIDEBAR */}
      <div className="w-full lg:w-80 border-r border-white/5 bg-[#08090b] p-10 flex flex-col items-center shrink-0 shadow-2xl z-20">
         <div className="relative group cursor-pointer mb-10 w-full flex flex-col items-center" onClick={() => setActiveTab('PROFILE')}>
            <div className="absolute -inset-4 bg-primary/10 rounded-[60px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img src={adminProfile.avatar} className="size-44 rounded-[48px] object-cover relative z-10 border-4 border-white/5 group-hover:border-primary transition-all duration-700 shadow-2xl" alt="Director" />
            <div className="absolute -bottom-3 -right-3 size-12 bg-primary rounded-2xl flex items-center justify-center text-black shadow-neon z-20">
               <span className="material-symbols-outlined font-black">shield_person</span>
            </div>
         </div>
         
         <div className="text-center space-y-1 mb-12">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">{adminProfile.name}</h2>
            <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em] italic">System Strategic Lead</p>
         </div>
         
         <div className="w-full space-y-4">
            <button onClick={() => window.alert('Connecting to Support...')} className="w-full py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all flex items-center justify-center gap-4 group">
               <span className="material-symbols-outlined text-xl text-primary/60 group-hover:text-primary transition-colors">contact_support</span>
               My Message
            </button>
            <button onClick={() => setActiveTab('PROFILE')} className={`w-full py-5 border rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-4 ${activeTab === 'PROFILE' ? 'bg-primary text-black' : 'bg-primary/5 border-primary/20 text-primary'}`}>
               <span className="material-symbols-outlined text-xl">settings</span>
               Profile Settings
            </button>
            <button onClick={onLogout} className="w-full py-5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 transition-all flex items-center justify-center gap-4 group">
               <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">logout</span>
               Logout System
            </button>
         </div>

         <div className="mt-auto pt-10 text-[9px] font-black text-white/10 uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="size-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Node Status: SECURE
         </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-10 lg:p-16 space-y-16 overflow-y-auto custom-scrollbar bg-[#0a0b0d]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/5">
          <div className="flex items-center gap-6">
            <div className="size-16 bg-primary rounded-3xl flex items-center justify-center text-black shadow-neon-bright rotate-3">
              <span className="material-symbols-outlined font-black text-4xl">hub</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <div className="size-2 bg-primary rounded-full animate-pulse-neon shadow-neon"></div>
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Platform Director</p>
              </div>
              <h1 className="text-7xl font-black italic uppercase tracking-tighter">SOUQ <span className="text-primary">HUP</span></h1>
            </div>
          </div>
          
          <div className="flex gap-4 bg-white/5 p-2 rounded-[32px] border border-white/5">
             {['OVERVIEW', 'AUTOMATION', 'TEAM', 'PROFILE'].map(tab => (
               <button 
                 key={tab} 
                 onClick={() => setActiveTab(tab as any)}
                 className={`px-10 py-4 rounded-[24px] text-[10px] font-black tracking-widest uppercase transition-all ${activeTab === tab ? 'bg-primary text-black shadow-neon' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
               >
                 {tab}
               </button>
             ))}
          </div>
        </div>

        {activeTab === 'PROFILE' ? (
          <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4">
             <div className="bg-surface-dark border border-white/5 rounded-[56px] p-12 space-y-10">
                <h3 className="text-2xl font-black italic uppercase text-primary">Admin Identity Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                   <div className="space-y-6">
                      <div className="relative size-64 mx-auto group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                         <img src={adminProfile.avatar} className="size-full rounded-[48px] object-cover border-4 border-white/5 group-hover:border-primary transition-all shadow-2xl" alt="" />
                         <div className="absolute inset-0 bg-black/60 rounded-[48px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-primary mb-2">add_a_photo</span>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white">Upload Avatar</p>
                         </div>
                         <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
                      </div>
                   </div>
                   <div className="space-y-8">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Full Name</label>
                         <input 
                           type="text" value={adminProfile.name} 
                           onChange={e => setAdminProfile({...adminProfile, name: e.target.value})}
                           className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-primary" 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Secure Password</label>
                         <input 
                           type="password" value={adminProfile.password} 
                           onChange={e => setAdminProfile({...adminProfile, password: e.target.value})}
                           className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-primary" 
                         />
                      </div>
                      <button 
                        onClick={() => window.alert('Identity changes committed successfully!')}
                        className="w-full py-5 bg-primary text-black font-black rounded-2xl uppercase tracking-[0.2em] italic text-xs shadow-neon hover:scale-105 transition-all"
                      >
                        Commit Identity Changes
                      </button>
                   </div>
                </div>
             </div>
          </div>
        ) : activeTab === 'OVERVIEW' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-[#0b0c10] border-2 p-10 rounded-[56px] relative overflow-hidden group transition-all hover:scale-[1.02] cursor-default" style={{ borderColor: `${stat.color}25`, boxShadow: `0 0 40px ${stat.color}08` }}>
                   <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[160px] opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none" style={{ color: stat.color }}>{stat.icon}</span>
                   <div className="relative z-10">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 italic" style={{ color: `${stat.color}80` }}>{stat.label}</p>
                      <h2 className="text-6xl font-black leading-none tracking-tighter mb-2" style={{ color: stat.color }}>{stat.value}</h2>
                      <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest mt-4 leading-relaxed italic">{stat.description}</p>
                   </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 bg-surface-dark border border-white/5 rounded-[56px] p-12 space-y-10">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white flex items-center gap-4"><span className="material-symbols-outlined text-primary text-3xl">view_quilt</span>Control Matrix</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.keys(enabledServices).filter(s => s !== ServiceType.ADMIN_DASHBOARD).map((s) => (
                      <div key={s} className="flex items-center justify-between p-7 bg-black/40 border border-white/5 rounded-[32px] hover:border-primary/40 transition-all group">
                         <span className="text-xs font-black uppercase tracking-widest text-white/60">{s}</span>
                         <button onClick={() => setEnabledServices({...enabledServices, [s as ServiceType]: !enabledServices[s as ServiceType]})} className={`relative w-16 h-8 rounded-full transition-all duration-300 ${enabledServices[s as ServiceType] ? 'bg-primary shadow-neon' : 'bg-white/10'}`}>
                           <div className={`absolute top-1 left-1 size-6 bg-background-dark rounded-full transition-transform ${enabledServices[s as ServiceType] ? 'translate-x-8' : ''}`} />
                         </button>
                      </div>
                    ))}
                  </div>
               </div>
               <div className="bg-primary shadow-neon-bright rounded-[56px] p-12 text-black flex flex-col justify-between relative overflow-hidden group">
                  <span className="material-symbols-outlined absolute -right-10 -top-10 text-[240px] text-black/5 rotate-12 transition-transform group-hover:rotate-0">auto_mode</span>
                  <div>
                    <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-4 leading-none">Rotation System</h3>
                    <p className="text-sm font-bold uppercase tracking-widest opacity-70">Cycling 850+ global stock items daily across the verified Egyptian network.</p>
                  </div>
                  <button onClick={() => setActiveTab('AUTOMATION')} className="relative z-10 w-full py-6 bg-black text-white font-black rounded-3xl uppercase tracking-widest italic text-xs mt-12 hover:scale-105 transition-all shadow-2xl">Manage Automation</button>
               </div>
            </div>
          </>
        ) : activeTab === 'AUTOMATION' ? (
          <div className="space-y-8 animate-in slide-in-from-bottom-8">
             <div className="bg-surface-dark border border-white/5 rounded-[56px] p-12 space-y-12">
                <div className="flex justify-between items-center border-b border-white/5 pb-10">
                   <div>
                      <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Daily Display Automation</h3>
                      <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em] mt-2 italic">Global content visibility orchestration</p>
                   </div>
                   <button 
                     onClick={() => window.alert('Global synchronization deployed to all nodes.')}
                     className="px-10 py-4 bg-primary text-black font-black rounded-full uppercase italic text-[11px] tracking-widest shadow-neon-bright transition-all hover:scale-105"
                   >
                     Deploy Global Sync
                   </button>
                </div>
                <div className="space-y-6">
                  {automationProfiles.map((profile) => (
                    <div key={profile.id} className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center p-8 bg-black/40 border border-white/5 rounded-[40px] hover:border-primary/30 transition-all group">
                       <div><p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1 italic">Module Target</p><h4 className="text-lg font-black text-white italic truncate uppercase">{profile.service}</h4></div>
                       <div className="flex flex-col gap-3">
                          <p className="text-[9px] font-black text-white/20 uppercase tracking-widest italic">Sync Interval</p>
                          <div className="flex items-center gap-4">
                             <input type="range" min="5" max="1440" step="5" value={profile.interval} onChange={(e) => updateProfile(profile.id, 'interval', parseInt(e.target.value))} className="flex-1 accent-primary bg-white/5 h-1.5 rounded-full appearance-none cursor-pointer" />
                             <span className="text-xs font-black text-primary italic w-12 text-right">{profile.interval >= 60 ? `${Math.floor(profile.interval / 60)}h` : `${profile.interval}m`}</span>
                          </div>
                       </div>
                       <div className="flex flex-col gap-3">
                          <p className="text-[9px] font-black text-white/20 uppercase tracking-widest italic">Display Logic</p>
                          <select value={profile.strategy} onChange={(e) => updateProfile(profile.id, 'strategy', e.target.value as any)} className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-[10px] font-black uppercase text-white outline-none focus:border-primary transition-all">
                             <option value="RANDOM">Random Pulse</option><option value="CHRONOLOGICAL">Recent Display</option><option value="TRENDING">High Interaction</option><option value="AI_CURATED">Gemini Optimized</option>
                          </select>
                       </div>
                       <div className="flex flex-col gap-3"><p className="text-[9px] font-black text-white/20 uppercase tracking-widest italic">Capacity</p><span className="text-sm font-black text-white">{profile.monitoredItems} Slots / Day</span></div>
                       <div className="flex justify-end">
                          <button onClick={() => handleToggleAutomation(profile.id)} className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest italic transition-all border ${profile.active ? 'bg-[#0df20d]/10 border-primary text-primary shadow-neon' : 'bg-white/5 border-white/10 text-white/20'}`}>
                             {profile.active ? 'ENGINE LIVE' : 'ENGINE PAUSED'}
                          </button>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-8">
             {[{ name: 'Admin Master', role: 'System Director', img: 'https://picsum.photos/seed/adm1/200/200' }, { name: 'Khaled A.', role: 'Market Moderator', img: 'https://picsum.photos/seed/adm2/200/200' }].map((user, i) => (
               <div key={i} className="bg-surface-dark border border-white/5 p-12 rounded-[56px] flex flex-col items-center text-center group hover:border-primary/30 transition-all">
                  <img src={user.img} className="size-28 rounded-[32px] object-cover mb-8 border-4 border-white/5 group-hover:border-primary transition-all" alt="" />
                  <h4 className="text-2xl font-black italic uppercase text-white tracking-tighter">{user.name}</h4>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mt-3">{user.role}</p>
                  <div className="w-full h-px bg-white/5 my-10"></div>
                  <div className="flex gap-4 w-full">
                                           <button 
                        onClick={() => window.alert(`Viewing activity logs for ${user.name}...`)}
                        className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/40"
                      >
                        Activity Logs
                      </button>
                                           <button 
                        onClick={() => window.alert(`Opening management console for ${user.name}...`)}
                        className="flex-1 py-4 bg-primary/10 border border-primary/30 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary"
                      >
                        Manage
                      </button>
                  </div>
               </div>
             ))}
             <button 
               onClick={() => window.alert('Opening secure invitation portal for new administrator...')}
               className="border-4 border-dashed border-white/5 bg-white/[0.02] rounded-[56px] flex flex-col items-center justify-center p-12 hover:border-primary/40 transition-all min-h-[400px] group"
             >
                <span className="material-symbols-outlined text-6xl text-white/10 mb-6 group-hover:text-primary transition-all">person_add</span>
                <p className="text-xs font-black uppercase tracking-widest text-white/20 group-hover:text-white">Grant Admin Access</p>
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
