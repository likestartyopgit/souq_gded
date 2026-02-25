
import React from 'react';
import { GlobalPost } from '../types';

interface TrendsProps {
  posts: GlobalPost[];
  likedPosts: string[];
  favoritePosts: string[];
  onToggleLike: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onContactMerchant: (merchantId: string, product: any) => void;
}

const Trends: React.FC<TrendsProps> = ({ 
  posts, 
  likedPosts, 
  favoritePosts, 
  onToggleLike, 
  onToggleFavorite,
  onContactMerchant
}) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center p-32">
        <div className="size-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin shadow-neon"></div>
      </div>
    );
  }

  return (
    <div className="p-8 pb-32 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 italic">Market Pulse</h2>
        <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white mb-2">Market <span className="text-primary">Trends</span></h1>
        <p className="text-white/40 text-sm font-medium uppercase tracking-widest">The most sought-after products in the Egyptian wholesale market</p>
      </div>

      {posts.length === 0 ? (
        <div className="w-full bg-surface-dark/50 border border-white/5 rounded-[40px] p-32 text-center backdrop-blur-xl">
          <span className="material-symbols-outlined text-8xl text-white/5 mb-8">trending_up</span>
          <p className="text-white/20 font-black uppercase tracking-[0.2em] text-lg italic">No trending items yet</p>
          <p className="text-white/10 text-xs mt-2 uppercase tracking-widest">Admin curated trending products will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                <div className="absolute top-6 right-6 flex flex-col gap-3 z-20">
                  <button 
                    onClick={() => onToggleFavorite(post.id)}
                    className={`size-12 rounded-full backdrop-blur-md border border-white/10 flex items-center justify-center transition-all shadow-lg ${
                      favoritePosts.includes(post.id) ? 'bg-primary text-black' : 'bg-black/40 text-white/60 hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined fill-1">favorite</span>
                  </button>
                  <div className="size-12 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center text-primary shadow-neon">
                    <span className="material-symbols-outlined font-black">trending_up</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                   <div className="flex items-center gap-3 mb-4">
                      <img src={post.merchantAvatar} className="size-8 rounded-full border border-primary/40" alt="" />
                      <p className="text-primary text-[10px] font-black uppercase tracking-widest">{post.merchantName}</p>
                   </div>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-black italic tracking-tighter text-white truncate uppercase mb-1">{post.title}</h3>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Ref: {post.ref}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <p className="text-3xl font-black text-primary italic uppercase leading-none">{post.price}</p>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    <span className="material-symbols-outlined text-sm">inventory_2</span>
                    {post.capacity}
                  </div>
                </div>

                <button 
                  onClick={() => onContactMerchant(post.id, post)}
                  className="w-full py-5 bg-primary/10 border border-primary/20 text-primary rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] italic hover:bg-primary hover:text-black transition-all shadow-neon"
                >
                  Contact the Merchant
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trends;
