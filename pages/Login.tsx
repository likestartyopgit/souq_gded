
import React, { useState } from 'react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  adminProfile: any;
  merchantProfile: any;
  userProfile: any;
}

const Login: React.FC<LoginProps> = ({ onLogin, adminProfile, merchantProfile, userProfile }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('IMPORTER');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-lg glass border border-white/10 rounded-[32px] md:rounded-[40px] p-6 md:p-12 relative z-10 shadow-2xl flex flex-col items-center">
        <div className="size-16 md:size-20 bg-primary rounded-2xl md:rounded-3xl flex items-center justify-center text-background-dark shadow-neon-bright mb-6 md:mb-8 rotate-3">
          <span className="material-symbols-outlined font-black text-3xl md:text-4xl">hub</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-center mb-2">
          SOUQ<span className="text-primary">HUP</span>
        </h1>
        <p className="text-white/40 text-[10px] md:text-sm font-medium mb-8 md:mb-12 uppercase tracking-[0.3em] text-center">Egyptian Wholesale Gateway</p>

        <form onSubmit={handleSubmit} className="w-full space-y-4 md:space-y-6">
          <div className="grid grid-cols-3 gap-1 md:gap-2 p-1 md:p-1.5 bg-white/5 rounded-2xl border border-white/5">
            {['IMPORTER', 'MERCHANT', 'ADMIN'].map(role => (
              <button 
                key={role}
                type="button"
                onClick={() => setSelectedRole(role as any)}
                className={`py-2 md:py-3 rounded-xl font-black text-[8px] md:text-[10px] uppercase tracking-widest transition-all ${
                  selectedRole === role ? 'bg-primary text-black shadow-neon' : 'text-white/40 hover:text-white'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {error && <p className="text-red-500 text-[10px] font-black uppercase text-center">{error}</p>}
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-primary text-black font-black rounded-2xl shadow-neon-bright hover:scale-[1.02] transition-all active:scale-95 uppercase tracking-[0.2em] italic text-lg"
          >
            Enter Market
          </button>
          
          <div className="text-center space-y-2">
            <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">Quick Access Enabled: No password required</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
