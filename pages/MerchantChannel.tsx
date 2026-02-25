
import React, { useState, useRef, useEffect } from 'react';
import { GlobalPost } from '../types';

interface ChannelInfo {
  name: string;
  category: string;
  bio: string;
  avatar: string;
  location: string;
  email: string;
  phone: string;
  established: string;
  plan: 'FREE' | 'PRO';
}

interface MerchantChannelProps {
  merchantId: string;
  externalProfile: ChannelInfo;
  onProfileUpdate: (profile: ChannelInfo) => void;
  onContactMerchant: (merchantId: string, product?: any) => void;
  isExternalSettingsOpen?: boolean;
  onCloseExternalSettings?: () => void;
  posts: GlobalPost[];
  onAddPost: (post: Partial<GlobalPost>) => void;
}

const MerchantChannel: React.FC<MerchantChannelProps> = ({ 
  merchantId, 
  externalProfile, 
  onProfileUpdate, 
  onContactMerchant,
  isExternalSettingsOpen,
  onCloseExternalSettings,
  posts,
  onAddPost
}) => {
  const [isStudioMode, setIsStudioMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'analytics' | 'settings'>('content');
  const [toast, setToast] = useState<string | null>(null);
  const [publicFilter, setPublicFilter] = useState<'ALL' | 'Video' | 'Image'>('ALL');
  
  const [localProfile, setLocalProfile] = useState<ChannelInfo>({ ...externalProfile });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formPost, setFormPost] = useState<Partial<GlobalPost>>({
    title: '', type: 'Video', price: '', capacity: '', thumbnail: '', description: ''
  });

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const postAssetInputRef = useRef<HTMLInputElement>(null);

  const handleAddPostInternal = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPost({
      ...formPost,
      id: Date.now().toString(),
      date: 'Just Now',
      views: 0,
      interactions: 0,
      communications: 0,
      merchantName: externalProfile.name,
      merchantAvatar: externalProfile.avatar,
      ref: '#NEW-' + Math.floor(1000+Math.random()*9000),
      description: formPost.description || "Premium wholesale stock direct from our Egyptian facility."
    });
    setIsModalOpen(false);
    showToast("Post broadcasted globally to all libraries");
  };

  const handlePostAssetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormPost(prev => ({ ...prev, thumbnail: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDownloadPost = (post: GlobalPost) => {
    showToast("Starting download...");
    const link = document.createElement('a');
    link.href = post.thumbnail;
    link.download = `SOUQHUP_${post.title}.jpg`;
    link.click();
  };

  const merchantPosts = posts.filter(p => p.merchantName === externalProfile.name);

  // STUDIO MODE (PRIVATE)
  if (isStudioMode) {
    return (
      <div className="flex flex-col min-h-full bg-[#08090b] text-white">
        <div className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-surface-dark/50 backdrop-blur-xl shrink-0 z-50">
          <div className="flex items-center gap-4">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-black">
              <span className="material-symbols-outlined font-black">video_settings</span>
            </div>
            <h1 className="text-lg font-black italic uppercase tracking-tighter">Broadcast <span className="text-primary">Studio</span></h1>
          </div>
          <div className="flex gap-3">
             <button onClick={() => setIsStudioMode(false)} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-black rounded-xl text-[10px] uppercase tracking-widest italic">Exit</button>
             <button onClick={() => { setFormPost({type: 'Video'}); setIsModalOpen(true); }} className="px-5 py-2.5 bg-primary text-black font-black rounded-xl text-[10px] uppercase tracking-widest italic shadow-neon">New Video</button>
             <button onClick={() => { setFormPost({type: 'Image'}); setIsModalOpen(true); }} className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-black rounded-xl text-[10px] uppercase tracking-widest italic border border-white/10">New Image</button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
           <div className="w-64 border-r border-white/5 p-6 space-y-2 bg-surface-dark/20 shrink-0">
              {['content', 'analytics', 'settings'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab as any)} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${activeTab === tab ? 'bg-primary/10 text-primary border border-primary/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                  <span className="material-symbols-outlined text-lg">{tab === 'content' ? 'view_list' : tab === 'analytics' ? 'monitoring' : 'account_circle'}</span>
                  <span className="text-xs font-black uppercase tracking-widest">{tab === 'content' ? 'Library' : tab === 'analytics' ? 'Insights' : 'Identity'}</span>
                </button>
              ))}
           </div>

           <div className="flex-1 overflow-y-auto custom-scrollbar p-10 bg-[#0a0b0d]">
              {activeTab === 'analytics' && (
                <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-1000">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-surface-dark border border-white/5 p-12 rounded-[48px] shadow-2xl text-center relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-10"><span className="material-symbols-outlined text-6xl">visibility</span></div>
                         <p className="text-xs font-black text-white/30 uppercase tracking-[0.4em] mb-4 italic">Total Reach</p>
                         <h2 className="text-[100px] font-black text-[#0df20d] drop-shadow-[0_0_20px_#0df20d] leading-none tracking-tighter">15.5k</h2>
                      </div>
                      <div className="bg-surface-dark border border-white/5 p-12 rounded-[48px] shadow-2xl text-center relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-10"><span className="material-symbols-outlined text-6xl">forum</span></div>
                         <p className="text-xs font-black text-white/30 uppercase tracking-[0.4em] mb-4 italic">Direct Leads</p>
                         <h2 className="text-[100px] font-black text-[#00e5ff] drop-shadow-[0_0_20px_#00e5ff] leading-none tracking-tighter">155</h2>
                      </div>
                   </div>
                </div>
              )}
              {activeTab === 'content' && (
                <div className="max-w-4xl mx-auto space-y-4">
                   <h2 className="text-xl font-black italic uppercase tracking-tighter mb-4">Catalog Management</h2>
                   {merchantPosts.map((post) => (
                      <div key={post.id} className="bg-surface-dark border border-white/5 rounded-2xl p-4 flex items-center justify-between group">
                         <div className="flex items-center gap-4">
                            <img src={post.thumbnail} className="size-20 rounded-xl object-cover border border-white/10" alt="" />
                            <div>
                               <h4 className="font-bold text-sm italic">{post.title}</h4>
                               <p className="text-[10px] text-primary font-black uppercase tracking-widest">{post.price}</p>
                            </div>
                         </div>
                         <button className="size-10 rounded-xl bg-red-500/5 hover:bg-red-500 text-red-500/40 hover:text-white transition-all flex items-center justify-center"><span className="material-symbols-outlined text-sm">delete</span></button>
                      </div>
                   ))}
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="max-w-3xl mx-auto bg-surface-dark border border-white/5 p-10 rounded-[40px] space-y-8">
                   <h2 className="text-2xl font-black italic uppercase text-primary">Identity Hub</h2>
                   <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="relative group cursor-pointer shrink-0" onClick={() => avatarInputRef.current?.click()}>
                         <img src={localProfile.avatar} className="size-32 rounded-[32px] object-cover border-4 border-primary/20 p-1" alt="" />
                         <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined">photo_camera</span></div>
                         <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => setLocalProfile(p => ({ ...p, avatar: reader.result as string }));
                              reader.readAsDataURL(file);
                            }
                         }} />
                      </div>
                      <div className="flex-1 w-full space-y-4">
                        <input type="text" value={localProfile.name} onChange={(e) => setLocalProfile(p => ({ ...p, name: e.target.value }))} className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-3 text-sm" placeholder="Enterprise Name" />
                        <input type="text" value={localProfile.phone} onChange={(e) => setLocalProfile(p => ({ ...p, phone: e.target.value }))} className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-3 text-sm" placeholder="Phone" />
                        <button onClick={() => {onProfileUpdate(localProfile); showToast("Changes Committed");}} className="w-full py-4 bg-primary text-black font-black rounded-xl uppercase text-[10px] tracking-widest italic shadow-neon transition-all hover:scale-[1.02]">Save Identity</button>
                      </div>
                   </div>
                </div>
              )}
           </div>
        </div>

        {/* UPLOAD MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
             <div className="w-full max-w-md bg-surface-dark border border-white/10 rounded-[40px] relative overflow-hidden shadow-2xl p-10">
                <h3 className="text-2xl font-black italic uppercase mb-8 text-primary">Broadcast {formPost.type}</h3>
                <form onSubmit={handleAddPostInternal} className="space-y-5">
                   {/* PREVIEW CONTAINER */}
                   <div onClick={() => postAssetInputRef.current?.click()} className="w-full aspect-square rounded-[32px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-primary/40 transition-all bg-black/20">
                      {formPost.thumbnail ? (
                        formPost.type === 'Video' ? <video src={formPost.thumbnail} className="size-full object-cover" /> : <img src={formPost.thumbnail} className="size-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <span className="material-symbols-outlined text-4xl text-white/10">{formPost.type === 'Video' ? 'movie' : 'add_photo_alternate'}</span>
                          <p className="text-[10px] font-black uppercase text-white/20 tracking-widest">Select {formPost.type}</p>
                        </div>
                      )}
                      <input 
                        type="file" 
                        ref={postAssetInputRef} 
                        className="hidden" 
                        accept={formPost.type === 'Video' ? 'video/*' : 'image/*'} 
                        onChange={handlePostAssetChange} 
                      />
                   </div>
                   <input type="text" required value={formPost.title} onChange={(e) => setFormPost(p => ({...p, title: e.target.value}))} className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-3 text-sm focus:border-primary/50 outline-none" placeholder="Stock Title" />
                   <div className="grid grid-cols-2 gap-4">
                      <input type="text" required value={formPost.price} onChange={(e) => setFormPost(p => ({...p, price: e.target.value}))} className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-3 text-sm outline-none" placeholder="Price (EGP)" />
                      <input type="text" required value={formPost.capacity} onChange={(e) => setFormPost(p => ({...p, capacity: e.target.value}))} className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-3 text-sm outline-none" placeholder="Stock Level" />
                   </div>
                   <button type="submit" className="w-full py-5 bg-primary text-black font-black rounded-2xl uppercase tracking-widest italic shadow-neon transition-all hover:scale-[1.02]">Broadcast Now</button>
                </form>
             </div>
          </div>
        )}
      </div>
    );
  }

  // PUBLIC CHANNEL VIEW
  return (
    <div className="flex flex-col min-h-full pb-32 text-white bg-[#08090b]">
      {/* CHANNEL HEAD */}
      <div className="h-64 w-full relative overflow-hidden shrink-0">
        <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop" className="size-full object-cover opacity-10" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-transparent"></div>
      </div>

      <div className="max-w-4xl w-full mx-auto px-8 -mt-24 relative z-10">
        {/* REPAIRED HEADER: Avatar left, Text centered-right */}
        <div className="flex flex-col md:flex-row items-end gap-10 mb-12 w-full max-w-3xl bg-surface-dark/40 p-10 rounded-[48px] border border-white/5 backdrop-blur-xl">
           <div className="size-48 rounded-[48px] bg-surface-dark border-4 border-[#08090b] overflow-hidden shadow-2xl shrink-0 p-1">
             <img src={externalProfile.avatar} className="size-full object-cover rounded-[40px]" alt="" />
           </div>
           <div className="flex-1 pb-4 flex flex-col justify-center h-full">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">{externalProfile.name}</h1>
                <span className="material-symbols-outlined text-primary text-4xl animate-pulse-neon">verified</span>
              </div>
              <p className="text-primary font-black uppercase tracking-[0.4em] text-xs mt-2 italic">{externalProfile.category} • {externalProfile.location}</p>
              
              <div className="flex gap-4 mt-10">
                <button onClick={() => setIsStudioMode(true)} className="px-10 py-4 bg-primary text-black font-black rounded-2xl shadow-neon transition-all hover:scale-105 uppercase tracking-widest italic text-[10px] flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">admin_panel_settings</span> Control Studio
                </button>
                <button onClick={() => onContactMerchant(merchantId)} className="px-10 py-4 bg-[#a855f7]/10 border border-[#a855f7]/20 text-[#a855f7] font-black rounded-2xl transition-all uppercase tracking-widest italic text-[10px] flex items-center gap-2 hover:bg-[#a855f7] hover:text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <span className="material-symbols-outlined text-lg">forum</span> Contact the Merchant
                </button>
              </div>
           </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="w-full flex items-center justify-center mb-24 border-y border-white/5 py-4">
           <div className="flex gap-4">
             <button onClick={() => setPublicFilter('ALL')} className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${publicFilter === 'ALL' ? 'bg-primary text-black shadow-neon' : 'bg-white/5 text-white/40'}`}>Entire Stock</button>
             <button onClick={() => setPublicFilter('Video')} className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${publicFilter === 'Video' ? 'bg-primary text-black shadow-neon' : 'bg-white/5 text-white/40'}`}>Video Feeds</button>
             <button onClick={() => setPublicFilter('Image')} className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${publicFilter === 'Image' ? 'bg-primary text-black shadow-neon' : 'bg-white/5 text-white/40'}`}>Catalog Posts</button>
          </div>
        </div>

        {/* VERTICAL SCROLL FEED */}
        <div className="w-full space-y-40 flex flex-col items-center">
          {merchantPosts.filter(p => publicFilter === 'ALL' || p.type === publicFilter).map((post) => (
            <div key={post.id} className="w-full max-w-lg flex flex-col animate-in fade-in slide-in-from-bottom-12 duration-1000">
               {/* MEDIA CONTAINER */}
               <div 
                 className="relative aspect-[9/16] rounded-[64px] overflow-hidden border-[8px] border-[#0df20d]/20 group shadow-neon transition-all"
                 onClick={() => showToast(post.description)}
               >
                  {post.type === 'Video' ? (
                    <video src={post.thumbnail} className="size-full object-cover" muted loop onMouseOver={e => (e.target as any).play()} onMouseOut={e => (e.target as any).pause()} />
                  ) : (
                    <img src={post.thumbnail} className="size-full object-cover transition-transform duration-[4s] group-hover:scale-110" alt="" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20"></div>
                  
                  {/* FLOATING ACTION OVERLAYS */}
                  <div className="absolute top-10 left-10 flex flex-col gap-5">
                     <button onClick={(e) => { e.stopPropagation(); handleDownloadPost(post); }} className="size-14 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-primary transition-all active:scale-125 shadow-xl"><span className="material-symbols-outlined text-2xl">download</span></button>
                     <button onClick={(e) => { e.stopPropagation(); showToast("Saved to favorites"); }} className="size-14 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-primary transition-all active:scale-125 shadow-xl"><span className="material-symbols-outlined text-2xl">bookmark</span></button>
                  </div>

                  <div className="absolute top-10 right-10 flex flex-col gap-3">
                     <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2"><span className="text-[10px] font-black text-white italic">{post.views} Reach</span></div>
                  </div>
               </div>

               {/* DETAILS */}
               <div className="mt-12 text-center px-6">
                  <h4 className="text-4xl font-black italic tracking-tighter uppercase mb-2">{externalProfile.name}</h4>
                  <p className="text-2xl font-black text-[#0df20d] drop-shadow-[0_0_10px_#0df20d] tracking-widest italic uppercase mb-8">{post.price}</p>
                  
                  <button onClick={() => onContactMerchant(merchantId, post)} className="w-full py-6 bg-[#08090b] border-[3px] border-[#a855f7]/40 rounded-[32px] flex items-center justify-center gap-5 group hover:bg-[#a855f7] hover:text-white transition-all shadow-2xl active:scale-95">
                     <span className="material-symbols-outlined text-2xl text-[#a855f7] group-hover:text-white font-black italic">send</span>
                     <span className="text-sm font-black uppercase tracking-[0.4em] italic">Contact the Merchant</span>
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-primary text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-neon-bright animate-in slide-in-from-top-4">
          {toast}
        </div>
      )}
    </div>
  );
};

export default MerchantChannel;
