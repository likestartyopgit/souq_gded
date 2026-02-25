
import React from 'react';
import { GlobalPost } from '../types';

interface MarketHupProps {
  posts: GlobalPost[];
  likedPosts: string[];
  favoritePosts: string[];
  onToggleLike: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onContactMerchant: (merchantId: string, product: any) => void;
  isAdmin?: boolean;
  trendPosts?: string[];
  onToggleTrend?: (id: string) => void;
}

const MarketHup: React.FC<MarketHupProps> = ({ 
  posts, 
  likedPosts, 
  favoritePosts, 
  onToggleLike, 
  onToggleFavorite, 
  onContactMerchant,
  isAdmin = false,
  trendPosts = [],
  onToggleTrend
}) => {
  const [downloadingId, setDownloadingId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = async (post: GlobalPost) => {
    setDownloadingId(post.id);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const response = await fetch(post.thumbnail);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${post.title.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      window.open(post.thumbnail, '_blank');
    } finally {
      setDownloadingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center p-32">
        <div className="size-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin shadow-neon"></div>
      </div>
    );
  }

  return (
    <div className="p-8 pb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
        {posts.filter(post => post.type === 'Image').map((post) => {
          const isLiked = likedPosts.includes(post.id);
          const isFavorited = favoritePosts.includes(post.id);

          return (
            <div key={post.id} className="bg-surface-dark rounded-3xl border border-white/5 hover:border-primary/20 transition-all group overflow-hidden flex flex-col relative shadow-neon hover:shadow-neon-bright">
              <div className="absolute inset-0 border-2 border-primary/5 group-hover:border-primary/30 transition-colors z-10 pointer-events-none rounded-3xl"></div>
              <div className="relative aspect-square overflow-hidden">
                 <img src={post.thumbnail} className="size-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                 
                 {/* Hover Overlay */}
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-20">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleLike(post.id); }}
                      className={`size-12 rounded-full flex items-center justify-center transition-all ${isLiked ? 'bg-red-500 text-white shadow-lg shadow-red-500/40' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      <span className={`material-symbols-outlined ${isLiked ? 'fill-1' : ''}`}>favorite</span>
                    </button>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleFavorite(post.id); }}
                      className={`size-12 rounded-full flex items-center justify-center transition-all ${isFavorited ? 'bg-primary text-black shadow-lg shadow-primary/40' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      <span className={`material-symbols-outlined ${isFavorited ? 'fill-1' : ''}`}>bookmark</span>
                    </button>

                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDownload(post); }}
                      className="size-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-50"
                      disabled={downloadingId === post.id}
                    >
                      {downloadingId === post.id ? (
                        <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <span className="material-symbols-outlined">download</span>
                      )}
                    </button>

                    {isAdmin && onToggleTrend && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); onToggleTrend(post.id); }}
                        className={`size-12 rounded-full flex items-center justify-center transition-all ${trendPosts.includes(post.id) ? 'bg-primary text-black shadow-lg shadow-primary/40' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        title="Add to Trends"
                      >
                        <span className="material-symbols-outlined">trending_up</span>
                      </button>
                    )}
                 </div>

                 <div className="absolute top-4 left-4 flex gap-2 z-20">
                    <div className="px-3 py-1 bg-black/60 rounded-full border border-white/10 text-[9px] font-black text-[#0df20d]">{post.views} Views</div>
                 </div>
              </div>
              <div className="p-6 space-y-4 relative z-20">
                 <div>
                    <h4 className="text-sm font-black text-white/40 uppercase tracking-widest">{post.merchantName}</h4>
                    <h3 className="text-lg font-black italic tracking-tighter text-white truncate">{post.title}</h3>
                 </div>
                 <p className="text-2xl font-black text-[#0df20d] drop-shadow-[0_0_10px_#0df20d] italic uppercase leading-none">{post.price}</p>
                 <button 
                   onClick={() => onContactMerchant('m-sample', post)} 
                   className="w-full py-4 bg-[#0df20d]/10 border border-[#0df20d]/20 text-[#0df20d] rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] italic hover:bg-[#0df20d] hover:text-black transition-all shadow-neon hover:shadow-[0_0_20px_rgba(13,242,13,0.6)] flex items-center justify-center gap-2 group/btn"
                 >
                   <span className="material-symbols-outlined text-sm group-hover/btn:animate-pulse">chat_bubble</span>
                   Contact the Merchant
                 </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketHup;
