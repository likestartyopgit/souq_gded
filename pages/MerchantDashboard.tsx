
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Inquiry {
  id: number;
  userName: string;
  company: string;
  timeAgo: string;
  productName: string;
  status: string;
  needs: string;
  quantity: string;
  location: string;
  userAvatar: string;
  productImage: string;
  aiInsight?: string;
}

interface MerchantDashboardProps {
  merchantName: string;
  onNavigateToStudio: () => void;
  onRespond: (buyerName: string, product: any) => void;
  onLogout: () => void;
}

const MerchantDashboard: React.FC<MerchantDashboardProps> = ({ merchantName, onNavigateToStudio, onRespond, onLogout }) => {
  const [expandedInquiryId, setExpandedInquiryId] = useState<number | null>(null);
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
  const [isBoosting, setIsBoosting] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: 1,
      userName: "Ahmed M.",
      company: "Giza Wholesale",
      timeAgo: "14m ago",
      productName: "Premium Egyptian Cotton Batch #001",
      status: "New Interaction",
      needs: "Looking for a high-volume supply for our winter collection. Requires 500+ kg weekly consistent delivery to Giza industrial zone. Please confirm thread count availability.",
      quantity: "500kg / Week",
      location: "Giza, Egypt",
      userAvatar: "https://picsum.photos/seed/user1/100/100",
      productImage: "https://images.unsplash.com/photo-1558227691-41ea78d1f631?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 2,
      userName: "Sara H.",
      company: "Alex Textiles Ltd.",
      timeAgo: "1h ago",
      productName: "Industrial Canvas Batch #004",
      status: "Follow-up",
      needs: "Need samples for the waterproof grade. We're testing for tent manufacturing. If quality matches specs, we're looking at a 2-ton initial order.",
      quantity: "2 Tons (Initial)",
      location: "Alexandria, Egypt",
      userAvatar: "https://picsum.photos/seed/user2/100/100",
      productImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 3,
      userName: "Omar Z.",
      company: "Delta Logistics",
      timeAgo: "3h ago",
      productName: "Raw Denim Stock #022",
      status: "New Interaction",
      needs: "Requesting quote for full export batch. Interested in 14oz weight only. Provide port logistics breakdown to Port Said.",
      quantity: "Full Container",
      location: "Port Said, Egypt",
      userAvatar: "https://picsum.photos/seed/user3/100/100",
      productImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400&auto=format&fit=crop"
    }
  ]);

  const toggleInquiry = (id: number) => {
    setExpandedInquiryId(expandedInquiryId === id ? null : id);
  };

  const handleBoost = () => {
    setIsBoosting(true);
    setTimeout(() => setIsBoosting(false), 3000);
  };

  const getAIInsight = async (inquiry: Inquiry) => {
    setAnalyzingId(inquiry.id);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this wholesale inquiry for ${merchantName}.
        Buyer: ${inquiry.userName} from ${inquiry.company}.
        Needs: ${inquiry.needs}
        Quantity: ${inquiry.quantity}
        Summarize in one short punchy sentence: Is this a hot lead? What is the main urgency? Return text only.`
      });

      const insight = response.text || "Insight unavailable";
      setInquiries(prev => prev.map(inq => inq.id === inquiry.id ? { ...inq, aiInsight: insight } : inq));
    } catch (err) {
      console.error("AI Insight Error:", err);
    } finally {
      setAnalyzingId(null);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto pb-32">
      {/* Onboarding Simulation Bar */}
      <div className="mb-12 p-6 bg-primary/5 border border-primary/20 rounded-3xl flex items-center justify-between">
        <div className="flex items-center gap-6">
           <div className="size-12 rounded-2xl bg-primary text-black flex items-center justify-center shadow-neon">
             <span className="material-symbols-outlined font-black">fact_check</span>
           </div>
           <div>
             <h4 className="text-sm font-black italic uppercase text-primary">Verification Checklist</h4>
             <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Complete these steps to unlock global reach</p>
           </div>
        </div>
        <div className="flex gap-4">
           {[
             { label: 'Identity', done: true },
             { label: 'Business Docs', done: true },
             { label: 'Market Access', done: false },
           ].map((step, i) => (
             <div key={i} className={`px-4 py-2 rounded-xl border text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${step.done ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 text-white/20'}`}>
               <span className="material-symbols-outlined text-xs">{step.done ? 'check_circle' : 'pending'}</span>
               {step.label}
             </div>
           ))}
        </div>
      </div>

      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">Merchant <span className="text-primary">Command</span></h1>
          <p className="text-white/40 mt-1 uppercase tracking-widest text-xs font-bold">Communication Hub • {merchantName}</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onLogout}
            className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Logout Terminal
          </button>
          <div className="bg-primary/5 border border-primary/20 px-6 py-3 rounded-2xl flex flex-col items-end shadow-neon">
            <span className="text-[9px] font-black uppercase text-primary tracking-widest">Total Conversations</span>
            <span className="text-2xl font-black text-white">1,842</span>
          </div>
          <div className="bg-white/5 border border-white/5 px-6 py-3 rounded-2xl flex flex-col items-end">
            <span className="text-[9px] font-black uppercase text-white/40 tracking-widest">Catalog Interactions</span>
            <span className="text-2xl font-black text-white">42.8k</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-surface-dark border border-white/5 rounded-[40px] p-8">
            <div className="flex justify-between items-center mb-8 px-2">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">stream</span>
                Inquiry Stream
              </h3>
              <div className="flex gap-4 items-center">
                 <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">Gemini Analysis Active</p>
                 <span className="size-2 bg-primary rounded-full animate-pulse shadow-neon"></span>
              </div>
            </div>
            
            <div className="space-y-4">
              {inquiries.map(inq => (
                <div 
                  key={inq.id} 
                  className={`flex flex-col p-6 rounded-3xl border transition-all relative overflow-hidden ${
                    expandedInquiryId === inq.id 
                    ? 'bg-primary/5 border-primary/40' 
                    : 'bg-white/[0.02] border-white/5 hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5 cursor-pointer flex-1" onClick={() => toggleInquiry(inq.id)}>
                      <div className={`size-12 rounded-full flex items-center justify-center transition-all ${expandedInquiryId === inq.id ? 'bg-primary text-black' : 'bg-white/5 text-white/20'}`}>
                        <span className="material-symbols-outlined">{expandedInquiryId === inq.id ? 'expand_less' : 'chat'}</span>
                      </div>
                      <div>
                        <h4 className={`font-bold transition-colors ${expandedInquiryId === inq.id ? 'text-primary' : ''}`}>{inq.userName} ({inq.company})</h4>
                        <p className="text-xs text-white/40 truncate max-w-md">Ref: "{inq.productName}"</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-[10px] text-white/20 font-medium">{inq.timeAgo}</span>
                      <button 
                        disabled={analyzingId === inq.id}
                        onClick={(e) => { e.stopPropagation(); getAIInsight(inq); }}
                        className={`px-3 py-1 text-[8px] font-black uppercase rounded-full border transition-all flex items-center gap-1 ${
                        inq.aiInsight ? 'bg-primary text-black border-primary' : 'bg-white/5 text-white/40 border-white/10 hover:border-primary hover:text-primary'
                      }`}>
                        {analyzingId === inq.id ? (
                           <>
                            <span className="material-symbols-outlined text-[10px] animate-spin">progress_activity</span>
                            Analyzing...
                           </>
                        ) : inq.aiInsight ? (
                           <>
                            <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
                            Insight Ready
                           </>
                        ) : (
                          <>
                           <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
                           Get AI Insight
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {inq.aiInsight && (
                    <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-xl animate-in slide-in-from-left-4 duration-500">
                       <p className="text-[10px] text-primary/80 font-black italic tracking-tight">
                         <span className="material-symbols-outlined text-[12px] align-middle mr-1">bolt</span>
                         {inq.aiInsight}
                       </p>
                    </div>
                  )}

                  {expandedInquiryId === inq.id && (
                    <div className="mt-8 pt-8 border-t border-primary/10 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-6">
                          <div className="flex items-center gap-4">
                            <img src={inq.userAvatar} className="size-16 rounded-2xl border border-white/10" alt="User" />
                            <div>
                              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Lead Identity</p>
                              <p className="text-sm font-bold">{inq.userName}</p>
                              <p className="text-[10px] text-white/40">{inq.location}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                             <div>
                               <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Target Volume</p>
                               <p className="text-sm font-black italic">{inq.quantity}</p>
                             </div>
                          </div>
                        </div>

                        <div className="md:col-span-2 space-y-6">
                          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 relative">
                            <span className="material-symbols-outlined absolute -top-3 -left-3 text-primary bg-background-dark rounded-full p-1 border border-primary/20">format_quote</span>
                            <p className="text-sm text-white/80 leading-relaxed font-medium">{inq.needs}</p>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-primary/10 border border-primary/20 rounded-2xl">
                             <img src={inq.productImage} className="size-14 rounded-xl object-cover shrink-0" alt="" />
                             <div className="flex-1 min-w-0">
                                <p className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">Reference Item</p>
                                <h5 className="text-xs font-bold truncate">{inq.productName}</h5>
                             </div>
                             <button 
                               onClick={() => onRespond(inq.userName, { title: inq.productName, imageUrl: inq.productImage, id: `ref-${inq.id}` })}
                               className="px-6 py-3 bg-primary text-black font-black rounded-xl shadow-neon transition-all hover:scale-105 active:scale-95 text-[10px] uppercase tracking-widest italic flex items-center gap-2"
                             >
                               <span className="material-symbols-outlined text-sm">send</span> Respond
                             </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary shadow-neon-bright rounded-[40px] p-8 text-black group overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-2 opacity-60">Interaction Growth</h4>
                <p className="text-5xl font-black tracking-tighter italic mb-8">+28%</p>
                <button className="w-full py-4 bg-black text-white font-black rounded-2xl uppercase text-xs tracking-widest italic hover:scale-105 transition-all">My Message</button>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-black/5 rotate-12 transition-transform group-hover:scale-110">trending_up</span>
            </div>
            <div className="bg-surface-dark border border-white/5 rounded-[40px] p-8 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-2 text-white/30">Active Market Vids</h4>
                <div className="flex items-center gap-3 mt-4">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="size-16 rounded-2xl bg-white/5 border border-white/10 overflow-hidden group cursor-pointer" onClick={onNavigateToStudio}>
                       <img src={`https://picsum.photos/seed/vid-sq-${i}/100/100`} className="size-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
                     </div>
                   ))}
                   <button 
                    onClick={onNavigateToStudio}
                    className="size-16 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center text-white/20 hover:border-primary/50 hover:text-primary transition-all"
                   >
                      <span className="material-symbols-outlined">add</span>
                   </button>
                </div>
              </div>
              <button 
                onClick={onNavigateToStudio}
                className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl uppercase text-xs tracking-widest border border-white/5 mt-6 transition-all"
              >
                Upload New Feed
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-surface-dark border border-white/5 rounded-[40px] p-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-6">Engagement Score</h4>
            <div className="space-y-6">
              {[
                { label: 'Chat Responsiveness', val: '98%', color: 'bg-primary' },
                { label: 'Profile Authority', val: '#12', color: 'bg-white' },
                { label: 'Interaction Consistency', val: '99%', color: 'bg-primary' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                    <span className="text-white/40">{item.label}</span>
                    <span>{item.val}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} ${item.color === 'bg-primary' ? 'shadow-neon' : ''}`} style={{ width: item.val }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-[40px] bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 flex flex-col items-center text-center">
             <span className={`material-symbols-outlined text-primary text-5xl mb-4 ${isBoosting ? 'animate-spin' : 'animate-pulse-neon'}`}>
               {isBoosting ? 'sync' : 'hub'}
             </span>
             <h4 className="text-xl font-black italic uppercase mb-2">Market Discovery</h4>
             <p className="text-xs text-white/40 leading-relaxed mb-6">Increase your profile visibility to the entire importer network for 48 hours.</p>
             <button 
              onClick={handleBoost}
              disabled={isBoosting}
              className={`w-full py-4 font-black rounded-2xl shadow-neon-bright hover:scale-105 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${isBoosting ? 'bg-white/10 text-white/40' : 'bg-primary text-black'}`}
             >
               {isBoosting ? 'Boosting Signal...' : 'Boost Channel Now'}
               {!isBoosting && <span className="material-symbols-outlined text-sm">rocket_launch</span>}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
