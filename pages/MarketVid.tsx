
import React from 'react';
import { GlobalPost } from '../types';

interface MarketVidProps {
  posts: GlobalPost[];
  likedPosts: string[];
  favoritePosts: string[];
  onToggleLike: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onContactMerchant: (merchantId: string) => void;
  isAdmin?: boolean;
  trendPosts?: string[];
  onToggleTrend?: (id: string) => void;
}

const MarketVid: React.FC<MarketVidProps> = ({ 
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
  const vids = posts.filter(p => p.type === 'Video');
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
      link.download = `${post.title.replace(/\s+/g, '_')}.mp4`;
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
    <div className="h-full w-full bg-[#08090b] flex flex-col items-center overflow-y-scroll snap-y snap-mandatory custom-scrollbar">
      {vids.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
           <span className="material-symbols-outlined text-7xl text-white/10 mb-6">videocam_off</span>
           <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white/20">No Video Feeds Available</h3>
        </div>
      ) : (
        vids.map((vid) => (
          <div key={vid.id} className="w-full h-full snap-start snap-always flex items-center justify-center p-4 min-h-screen">
            <div className="relative h-[75vh] md:h-[80vh] w-full max-w-[320px] aspect-[9/16] bg-surface-dark rounded-[2rem] md:rounded-[3rem] overflow-hidden border-[4px] md:border-[6px] border-[#0df20d]/20 shadow-neon-bright group">
               {/* ACTUAL VIDEO */}
               <video src={vid.thumbnail} className="size-full object-cover" autoPlay muted loop />
               
               {/* OVERLAYS */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/30"></div>
               
               {/* TOP INFO */}
               <div className="absolute top-10 left-10 right-10 flex justify-between items-start">
                  <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                    <span className="size-2 bg-[#0df20d] rounded-full animate-pulse shadow-neon"></span>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Direct Feed</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => onToggleLike(vid.id)}
                      className={`size-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all ${likedPosts.includes(vid.id) ? 'text-red-500 bg-red-500/20 border-red-500/40' : 'text-white/60 hover:text-primary'}`}
                    >
                      <span className={`material-symbols-outlined ${likedPosts.includes(vid.id) ? 'fill-1' : ''}`}>favorite</span>
                    </button>
                    <button 
                      onClick={() => onToggleFavorite(vid.id)}
                      className={`size-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all ${favoritePosts.includes(vid.id) ? 'text-primary bg-primary/20 border-primary/40' : 'text-white/60 hover:text-primary'}`}
                    >
                      <span className={`material-symbols-outlined ${favoritePosts.includes(vid.id) ? 'fill-1' : ''}`}>bookmark</span>
                    </button>
                    <button 
                      onClick={() => handleDownload(vid)}
                      className="size-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-primary transition-all disabled:opacity-50"
                      disabled={downloadingId === vid.id}
                    >
                      {downloadingId === vid.id ? (
                        <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <span className="material-symbols-outlined">download</span>
                      )}
                    </button>
                    {isAdmin && onToggleTrend && (
                      <button 
                        onClick={() => onToggleTrend(vid.id)}
                        className={`size-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all ${trendPosts.includes(vid.id) ? 'text-primary bg-primary/20 border-primary/40' : 'text-white/60 hover:text-primary'}`}
                        title="Add to Trends"
                      >
                        <span className="material-symbols-outlined">trending_up</span>
                      </button>
                    )}
                  </div>
               </div>

                {/* BOTTOM CAPTION & MERCHANT */}
               <div className="absolute bottom-0 left-0 right-0 p-10 space-y-6">
                  <div>
                    <h4 className="text-4xl font-black italic text-white uppercase tracking-tighter drop-shadow-2xl mb-2">{vid.title}</h4>
                  </div>
                  
                  <div className="flex flex-col gap-6 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <img src={vid.merchantAvatar} className="size-14 rounded-2xl border-2 border-[#0df20d]/40 shadow-xl" alt="" />
                         <div>
                            <h5 className="font-black text-white italic uppercase tracking-tight text-lg">{vid.merchantName}</h5>
                            <p className="text-xl font-black text-[#0df20d] uppercase tracking-wider italic leading-none">{vid.price}</p>
                         </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => onContactMerchant('m-sample')} 
                      className="w-full py-5 bg-[#ff4e00]/10 border border-[#ff4e00]/20 text-[#ff4e00] rounded-2xl shadow-[0_0_20px_rgba(255,78,0,0.3)] uppercase italic text-xs tracking-widest transition-all hover:bg-[#ff4e00] hover:text-white hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                    >
                      Contact the Merchant <span className="material-symbols-outlined">send</span>
                    </button>
                  </div>
               </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MarketVid;
