
import React from 'react';

interface UpgradeModalProps {
  onClose: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose }) => {
  const benefits = [
    { icon: 'grid_view', title: 'Market Hup Access', desc: 'Unlock advanced grid views and bulk trade management tools.' },
    { icon: 'movie', title: 'Market VID Feed', desc: 'Engage with high-conversion video catalogs and live broadcasts.' },
    { icon: 'center_focus_strong', title: 'HATOo Visual Search', desc: 'Identify products instantly using AI-powered camera recognition.' },
    { icon: 'dashboard', title: 'Command Hub', desc: 'Full analytics dashboard to track your wholesale performance.' },
    { icon: 'verified', title: 'Verified Badge', desc: 'Gain trust with a verified badge on your profile and posts.' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="w-full max-w-2xl glass border border-primary/20 rounded-[32px] md:rounded-[48px] p-6 md:p-12 relative z-10 shadow-neon-bright animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 size-10 md:size-12 bg-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-white/40 hover:text-white transition-all"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <div className="size-16 md:size-20 bg-primary rounded-2xl md:rounded-3xl flex items-center justify-center text-background-dark shadow-neon-bright mb-4 md:mb-6 rotate-3">
            <span className="material-symbols-outlined font-black text-3xl md:text-4xl">workspace_premium</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-2 md:mb-4">
            Upgrade to <span className="text-primary">PRO</span>
          </h2>
          <p className="text-white/40 text-[10px] md:text-sm font-medium uppercase tracking-[0.3em] max-w-md">
            Unlock the full potential of Egypt's premier wholesale network
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group">
              <div className="size-12 shrink-0 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                <span className="material-symbols-outlined">{benefit.icon}</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-widest text-white">{benefit.title}</h4>
                <p className="text-[10px] text-white/40 leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button 
            onClick={() => {
              window.alert('Redirecting to secure payment gateway...');
              onClose();
            }}
            className="flex-1 py-5 bg-primary text-black font-black rounded-2xl shadow-neon-bright hover:scale-[1.02] transition-all active:scale-95 uppercase tracking-[0.2em] italic text-sm"
          >
            Start 14-Day Free Trial
          </button>
          <button 
            onClick={onClose}
            className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl uppercase tracking-[0.2em] italic text-sm transition-all"
          >
            Maybe Later
          </button>
        </div>

        <p className="text-center mt-8 text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">
          EGP 450 / Month • Cancel Anytime • Secure Checkout
        </p>
      </div>
    </div>
  );
};

export default UpgradeModal;
