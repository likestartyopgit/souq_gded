
import React, { useState } from 'react';
import { UserRole } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface PublicLoginProps {
  onLogin: (role: UserRole) => void;
}

const PublicLogin: React.FC<PublicLoginProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('IMPORTER');
  const [showBetaModal, setShowBetaModal] = useState(false);
  const [betaEmail, setBetaEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  const handleBetaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setShowBetaModal(false);
        setIsSuccess(false);
        setBetaEmail('');
      }, 2500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#08090b] flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-lg glass border border-white/10 rounded-[40px] p-12 relative z-10 shadow-2xl flex flex-col items-center">
        <div className="size-20 bg-primary rounded-3xl flex items-center justify-center text-background-dark shadow-neon-bright mb-8 rotate-3 transition-transform hover:rotate-6 cursor-pointer">
          <span className="material-symbols-outlined font-black text-4xl">hub</span>
        </div>
        
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-center mb-2">
          SOUQ<span className="text-primary">HUP</span>
        </h1>
        <p className="text-white/40 text-sm font-medium mb-12 uppercase tracking-[0.3em] text-center">Egyptian Wholesale Gateway</p>

        <form onSubmit={handleSubmit} className="w-full space-y-8">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.3em] text-center">Select Your Access Level</p>
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/5">
              {['IMPORTER', 'MERCHANT', 'ADMIN'].map(role => (
                <button 
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role as any)}
                  className={`py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    selectedRole === role 
                      ? (role === 'ADMIN' ? 'bg-role-yellow text-black shadow-[0_0_20px_rgba(234,179,8,0.4)]' : 'bg-primary text-black shadow-neon') 
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.3em] text-center">Quick Access Profiles</p>
            <div className="grid grid-cols-1 gap-3">
              <button 
                type="button"
                onClick={() => onLogin('IMPORTER')}
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary/10 hover:border-primary/40 transition-all group"
              >
                <img src="https://picsum.photos/seed/egypt-user/200/200" className="size-10 rounded-full border border-white/10" alt="" />
                <div className="text-left">
                  <p className="text-xs font-black text-white uppercase italic">Muhammad Zakaria</p>
                  <p className="text-[9px] text-primary uppercase font-bold tracking-widest">Verified Importer (KING Plan)</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-white/20 group-hover:text-primary transition-colors">login</span>
              </button>

              <button 
                type="button"
                onClick={() => onLogin('MERCHANT')}
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary/10 hover:border-primary/40 transition-all group"
              >
                <img src="https://picsum.photos/seed/m-sample/300/300" className="size-10 rounded-full border border-white/10" alt="" />
                <div className="text-left">
                  <p className="text-xs font-black text-white uppercase italic">Cairo Textiles Co.</p>
                  <p className="text-[9px] text-primary uppercase font-bold tracking-widest">Wholesale Partner (PRO)</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-white/20 group-hover:text-primary transition-colors">login</span>
              </button>

              <button 
                type="button"
                onClick={() => onLogin('ADMIN')}
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-role-yellow/10 hover:border-role-yellow/40 transition-all group"
              >
                <div className="size-10 rounded-full bg-role-yellow flex items-center justify-center text-black">
                  <span className="material-symbols-outlined">admin_panel_settings</span>
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-white uppercase italic">System Director</p>
                  <p className="text-[9px] text-role-yellow uppercase font-bold tracking-widest">Full Platform Control</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-white/20 group-hover:text-role-yellow transition-colors">login</span>
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className={`w-full py-6 font-black rounded-2xl shadow-neon-bright hover:scale-[1.02] transition-all active:scale-95 uppercase tracking-[0.2em] italic text-lg ${
              selectedRole === 'ADMIN' ? 'bg-role-yellow text-black' : 'bg-primary text-black'
            }`}
          >
            Enter {selectedRole} Hub
          </button>
          
          <div className="text-center space-y-2">
            <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">No token required for demo access</p>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 w-full">
           <button 
             onClick={() => setShowBetaModal(true)}
             className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-primary hover:border-primary/40 transition-all flex items-center justify-center gap-3 group"
           >
             <span className="material-symbols-outlined text-sm group-hover:animate-pulse">verified</span>
             Join SOUQHUP Beta
           </button>
        </div>
      </div>

      {/* Beta Modal */}
      <AnimatePresence>
        {showBetaModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-surface-dark border border-white/10 rounded-[40px] p-12 relative overflow-hidden shadow-neon"
            >
              <button 
                onClick={() => setShowBetaModal(false)}
                className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              {isSuccess ? (
                <div className="text-center py-12 space-y-6">
                  <div className="size-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto shadow-neon">
                    <span className="material-symbols-outlined text-primary text-4xl font-black">check_circle</span>
                  </div>
                  <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">Welcome to Beta</h2>
                  <p className="text-white/40 text-xs uppercase font-bold tracking-widest leading-relaxed">
                    Your request has been logged. We will contact you soon with access credentials.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">Beta Access</h2>
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Register for the next generation of wholesale</p>
                  </div>

                  <form onSubmit={handleBetaSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-4">Business Email</label>
                      <input 
                        required
                        type="email" 
                        value={betaEmail}
                        onChange={e => setBetaEmail(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary transition-all"
                        placeholder="name@company.eg"
                      />
                    </div>

                    <button 
                      disabled={isSubmitting}
                      className="w-full py-5 bg-primary text-black font-black rounded-2xl shadow-neon-bright hover:scale-[1.02] transition-all active:scale-95 uppercase tracking-[0.2em] italic text-sm disabled:opacity-50"
                    >
                      {isSubmitting ? 'Processing...' : 'Request Invitation'}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PublicLogin;
