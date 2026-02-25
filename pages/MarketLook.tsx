
import React from 'react';
import { GlobalPost } from '../types';

interface MarketLookProps {
  posts: GlobalPost[];
  likedPosts: string[];
  favoritePosts: string[];
  onToggleLike: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  isAdmin?: boolean;
  trendPosts?: string[];
  onToggleTrend?: (id: string) => void;
}

const MarketLook: React.FC<MarketLookProps> = ({ 
  posts, 
  likedPosts, 
  favoritePosts, 
  onToggleLike, 
  onToggleFavorite,
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
      // Simulate interaction delay
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
      // Fallback for CORS
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {posts.filter(post => post.type === 'Image').map((post) => {
          const isLiked = likedPosts.includes(post.id);
          const isFavorited = favoritePosts.includes(post.id);

          return (
            <div 
              key={post.id} 
              className="aspect-square rounded-2xl overflow-hidden border border-white/5 hover:border-primary/40 transition-all cursor-pointer group bg-surface-dark relative shadow-neon hover:shadow-neon-bright"
            >
              <div className="absolute inset-0 border-2 border-primary/10 group-hover:border-primary/40 transition-colors z-10 pointer-events-none rounded-2xl"></div>
              <img 
                src={post.thumbnail} 
                className="size-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[0.5] group-hover:grayscale-0" 
                alt={post.title} 
                onClick={() => window.alert(`Viewing details for: ${post.title}`)}
              />
              
              {/* Overlay Buttons */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); onToggleLike(post.id); }}
                  className={`size-10 rounded-full flex items-center justify-center transition-all ${isLiked ? 'bg-red-500 text-white shadow-lg shadow-red-500/40' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  <span className={`material-symbols-outlined ${isLiked ? 'fill-1' : ''}`}>favorite</span>
                </button>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); onToggleFavorite(post.id); }}
                  className={`size-10 rounded-full flex items-center justify-center transition-all ${isFavorited ? 'bg-primary text-black shadow-lg shadow-primary/40' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  <span className={`material-symbols-outlined ${isFavorited ? 'fill-1' : ''}`}>bookmark</span>
                </button>

                <button 
                  onClick={(e) => { e.stopPropagation(); handleDownload(post); }}
                  className="size-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-50"
                  disabled={downloadingId === post.id}
                >
                  {downloadingId === post.id ? (
                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <span className="material-symbols-outlined">download</span>
                  )}
                </button>

                {isAdmin && onToggleTrend && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleTrend(post.id); }}
                    className={`size-10 rounded-full flex items-center justify-center transition-all ${trendPosts.includes(post.id) ? 'bg-primary text-black shadow-lg shadow-primary/40' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    title="Add to Trends"
                  >
                    <span className="material-symbols-outlined">trending_up</span>
                  </button>
                )}
              </div>

              {/* Info Badge */}
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <p className="text-[10px] font-black text-white uppercase truncate tracking-widest bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  {post.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketLook;
