
import React from 'react';
import { motion } from 'framer-motion';

const merchants = [
  {
    id: 'm1',
    name: 'Cairo Textiles Co.',
    category: 'Industrial Hub • Textiles',
    avatar: 'https://picsum.photos/seed/m1/400/400',
    cover: 'https://picsum.photos/seed/c1/1200/400',
    verified: true,
    followers: '12.4K',
    products: 142
  },
  {
    id: 'm2',
    name: 'Alexandria Glass Works',
    category: 'Manufacturing • Glassware',
    avatar: 'https://picsum.photos/seed/m2/400/400',
    cover: 'https://picsum.photos/seed/c2/1200/400',
    verified: true,
    followers: '8.2K',
    products: 86
  },
  {
    id: 'm3',
    name: 'Giza Leather Goods',
    category: 'Fashion • Leather',
    avatar: 'https://picsum.photos/seed/m3/400/400',
    cover: 'https://picsum.photos/seed/c3/1200/400',
    verified: true,
    followers: '15.1K',
    products: 210
  },
  {
    id: 'm4',
    name: 'Nile Electronics',
    category: 'Tech • Components',
    avatar: 'https://picsum.photos/seed/m4/400/400',
    cover: 'https://picsum.photos/seed/c4/1200/400',
    verified: false,
    followers: '3.5K',
    products: 45
  }
];

const SouqStore: React.FC = () => {
  return (
    <div className="p-8 pb-32 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 italic">Seller Ecosystem</h2>
        <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white mb-2"><span className="text-primary">Stores</span></h1>
        <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Connect directly with verified Egyptian manufacturers and wholesalers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {merchants.map((merchant, index) => (
          <motion.div 
            key={merchant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-surface-dark rounded-[40px] overflow-hidden border border-white/5 hover:border-primary/20 transition-all shadow-2xl"
          >
            {/* Cover Image */}
            <div className="h-48 overflow-hidden relative">
              <img src={merchant.cover} className="size-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/40 to-transparent"></div>
            </div>

            {/* Merchant Info */}
            <div className="px-8 pb-8 relative">
              <div className="flex items-end gap-6 -mt-12 mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-primary rounded-3xl blur-md opacity-0 group-hover:opacity-40 transition-opacity"></div>
                  <img src={merchant.avatar} className="relative size-24 rounded-3xl border-4 border-surface-dark object-cover shadow-2xl" alt="" />
                  {merchant.verified && (
                    <div className="absolute -bottom-2 -right-2 size-8 bg-primary rounded-full border-4 border-surface-dark flex items-center justify-center shadow-neon">
                      <span className="material-symbols-outlined text-black text-sm font-black">verified</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white group-hover:text-primary transition-colors">{merchant.name}</h3>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{merchant.category}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Followers</p>
                  <p className="text-xl font-black text-white italic">{merchant.followers}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Products</p>
                  <p className="text-xl font-black text-white italic">{merchant.products}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-primary text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] italic hover:scale-[1.02] transition-all shadow-neon">
                  Enter Channel
                </button>
                <button className="size-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/40 transition-all">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SouqStore;
