
import React, { useState } from 'react';
import { UserRole } from '../types';

interface AdminLoginProps {
  onLogin: (role: 'ADMIN' | 'TEAM') => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<'ADMIN' | 'TEAM'>('ADMIN');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin' || selectedRole === 'TEAM') {
      onLogin(selectedRole);
    } else {
      setError('Invalid credentials for Admin Terminal');
    }
  };

  return (
    <div className="min-h-screen bg-[#08090b] flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-role-yellow/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-lg glass border border-white/10 rounded-[40px] p-12 relative z-10 shadow-2xl flex flex-col items-center">
        <div className="size-20 bg-role-yellow rounded-3xl flex items-center justify-center text-background-dark shadow-[0_0_20px_rgba(234,179,8,0.6)] mb-8 rotate-3">
          <span className="material-symbols-outlined font-black text-4xl">admin_panel_settings</span>
        </div>
        
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-center mb-2">
          ADMIN<span className="text-role-yellow">TERMINAL</span>
        </h1>
        <p className="text-white/40 text-sm font-medium mb-12 uppercase tracking-[0.3em] text-center">SOUQHUP Kernel Management</p>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/5">
            {['ADMIN', 'TEAM'].map(role => (
              <button 
                key={role}
                type="button"
                onClick={() => setSelectedRole(role as any)}
                className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  selectedRole === role ? 'bg-role-yellow text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]' : 'text-white/40 hover:text-white'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Access Token"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-role-yellow transition-all"
            />
            {error && <p className="text-red-500 text-[10px] font-black uppercase text-center">{error}</p>}
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-role-yellow text-black font-black rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.6)] hover:scale-[1.02] transition-all active:scale-95 uppercase tracking-[0.2em] italic text-lg"
          >
            Authorize Access
          </button>
          
          <div className="text-center space-y-2">
            <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">Permissions granted by root administrator</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
