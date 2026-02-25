
import React from 'react';
import { ServiceType } from '../types';

interface MerchantControlPanelProps {
  merchantProfile: any;
  onSelectService: (service: ServiceType) => void;
}

const MerchantControlPanel: React.FC<MerchantControlPanelProps> = ({ merchantProfile, onSelectService }) => {
  const services = [
    { id: ServiceType.MARKET_LOOK, name: 'Market Look', icon: 'visibility' },
    { id: ServiceType.MARKET_HUP, name: 'Market Hub', icon: 'hub' },
    { id: ServiceType.TRENDS, name: 'Trends', icon: 'trending_up' },
    { id: ServiceType.MARKET_VID, name: 'Market VID', icon: 'videocam' },
    { id: ServiceType.FAVORITES, name: 'Favorites', icon: 'favorite' },
    { id: ServiceType.HATOO, name: 'HATOO', icon: 'shopping_cart_checkout' },
  ];

  return (
    <div className="flex-1 p-12 overflow-y-auto bg-gradient-to-br from-[#08090b] to-[#111] custom-scrollbar h-full">
      <div className="max-w-5xl mx-auto h-full flex flex-col">
        <div className="mb-8 shrink-0">
          <div className="flex items-center gap-6 mb-2">
            <div className="size-16 bg-[#00f2ff] rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,242,255,0.6)] rotate-3 shrink-0">
              <span className="material-symbols-outlined font-black text-3xl leading-none">hub</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
              SOUQ<span className="text-[#00f2ff]">HUP</span>
            </h1>
          </div>
          <div className="flex flex-col ml-2">
            <p className="text-[#00f2ff] text-lg font-black uppercase tracking-[0.2em] italic mb-0.5">Merchant Terminal</p>
            <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Wholesale Distribution & Management</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 shrink-0">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className="group relative bg-[#0d0d0d] border border-white/5 rounded-[24px] p-6 flex flex-col items-center justify-center gap-4 transition-all hover:shadow-[0_0_60px_rgba(0,242,255,0.15)] overflow-hidden"
            >
              <div className="size-16 rounded-full flex items-center justify-center text-[#00f2ff] group-hover:scale-110 transition-all duration-500">
                <span className="material-symbols-outlined text-4xl drop-shadow-[0_0_15px_rgba(0,242,255,0.5)] leading-none">
                  {service.icon}
                </span>
              </div>
              <span className="text-lg font-black italic uppercase tracking-tight text-white/90 group-hover:text-white transition-colors">{service.name}</span>
              <div className="absolute inset-0 rounded-[24px] border-2 border-[#00f2ff] transition-colors duration-300 blur-md pointer-events-none opacity-20 group-hover:opacity-100"></div>
              <div className="absolute inset-0 rounded-[24px] border border-[#00f2ff] transition-colors duration-300 pointer-events-none opacity-40 group-hover:opacity-100"></div>
            </button>
          ))}
        </div>

        <button
          onClick={() => onSelectService(ServiceType.MERCHANT_CHANNEL)}
          className="group relative w-full bg-[#0d0d0d] border border-white/5 rounded-[24px] p-8 flex flex-row items-center justify-center gap-8 transition-all hover:shadow-[0_0_60px_rgba(0,242,255,0.15)] overflow-hidden shrink-0"
        >
          <div className="size-16 rounded-full flex items-center justify-center text-[#00f2ff] group-hover:scale-110 transition-all duration-500">
            <span className="material-symbols-outlined text-4xl drop-shadow-[0_0_15px_rgba(0,242,255,0.5)] leading-none">storefront</span>
          </div>
          <span className="text-5xl font-black italic uppercase tracking-tighter text-white/90 group-hover:text-white transition-colors">My Store</span>
          <div className="absolute inset-0 rounded-[24px] border-2 border-[#00f2ff] transition-colors duration-300 blur-md pointer-events-none opacity-20 group-hover:opacity-100"></div>
          <div className="absolute inset-0 rounded-[24px] border border-[#00f2ff] transition-colors duration-300 pointer-events-none opacity-40 group-hover:opacity-100"></div>
        </button>
      </div>
    </div>
  );
};

export default MerchantControlPanel;
