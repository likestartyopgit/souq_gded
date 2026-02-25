import React from 'react';
import { GlobalPost } from '../types';

interface FavoritesProps {
  posts: GlobalPost[];
}

const Favorites: React.FC<FavoritesProps> = ({ posts }) => {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white p-8 md:p-16 flex flex-col items-center">
      {/* Header Section from Image */}
      <div className="text-center mb-16">
        <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4">PREMIUM DISCOVERY HUB</p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">The Visual Marketplace</h1>
        <div className="w-24 h-1.5 bg-primary mx-auto rounded-full shadow-neon"></div>
      </div>

      {posts.length === 0 ? (
        <div className="w-full max-w-4xl bg-surface-dark/50 border border-white/5 rounded-[40px] p-32 text-center backdrop-blur-xl">
          <span className="material-symbols-outlined text-8xl text-white/5 mb-8">favorite_border</span>
          <p className="text-white/20 font-black uppercase tracking-[0.2em] text-lg italic">Your collection is empty</p>
          <p className="text-white/10 text-xs mt-2 uppercase tracking-widest">Start adding products to your visual marketplace</p>
        </div>
      ) : (
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {posts.map((post) => (
              <div 
                key={post.id} 
                className="group bg-surface-dark rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-2xl flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={post.thumbnail} 
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={post.title} 
                  />
                  <div className="absolute top-6 right-6 z-20">
                    <div className="size-10 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-primary shadow-neon">
                      <span className="material-symbols-outlined fill-1 text-xl">favorite</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 space-y-4">
                  <div>
                    <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-1 italic">{post.merchantName}</p>
                    <h3 className="text-xl font-black italic tracking-tighter text-white truncate uppercase">{post.title}</h3>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <p className="text-2xl font-black text-primary italic uppercase leading-none">{post.price}</p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                      <span className="material-symbols-outlined text-sm">inventory_2</span>
                      {post.capacity}
                    </div>
                  </div>

                  <button 
                    onClick={() => window.alert(`Contacting ${post.merchantName} about ${post.title}`)}
                    className="w-full py-4 bg-primary/10 border border-primary/20 text-primary rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] italic hover:bg-primary hover:text-black transition-all shadow-neon"
                  >
                    Inquiry Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Explore More Button from Image */}
          <div className="mt-20 flex justify-center">
            <button className="px-12 py-5 bg-primary text-black font-black rounded-full shadow-neon-bright hover:scale-105 active:scale-95 transition-all flex items-center gap-4 uppercase italic text-sm tracking-[0.2em]">
              EXPLORE MORE
              <span className="material-symbols-outlined font-black">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
