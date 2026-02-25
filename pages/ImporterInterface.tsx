
import React, { useState } from 'react';
import { ServiceType, UserRole, GlobalPost } from '../types';
import ImporterSidebar from '../components/ImporterSidebar';
import ImporterHeader from '../components/ImporterHeader';
import MarketLook from './MarketLook';
import MarketHup from './MarketHup';
import MarketVid from './MarketVid';
import HATOo from './HATOo';
import UserProfile from './UserProfile';
import ImporterControlPanel from './ImporterControlPanel';
import SouqStore from './SouqStore';
import Favorites from './Favorites';
import Trends from './Trends';
import MyMessage from './MyMessage';
import ChatOverlay from '../components/ChatOverlay';
import UpgradeModal from '../components/UpgradeModal';

interface ImporterInterfaceProps {
  userProfile: any;
  setUserProfile: (p: any) => void;
  onLogout: () => void;
  globalPosts: GlobalPost[];
  likedPosts: string[];
  favoritePosts: string[];
  trendPosts: string[];
  toggleLike: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleTrend: (id: string) => void;
  enabledServices: Record<ServiceType, boolean>;
}

const ImporterInterface: React.FC<ImporterInterfaceProps> = ({
  userProfile,
  setUserProfile,
  onLogout,
  globalPosts,
  likedPosts,
  favoritePosts,
  trendPosts,
  toggleLike,
  toggleFavorite,
  toggleTrend,
  enabledServices
}) => {
  const [activeService, setActiveService] = useState<ServiceType>(ServiceType.CONTROL_PANEL);
  const [chatContext, setChatContext] = useState<{merchantId: string, buyerName?: string, product?: any} | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderActivePage = () => {
    switch (activeService) {
      case ServiceType.MARKET_LOOK:
        return (
          <MarketLook 
            posts={globalPosts} 
            likedPosts={likedPosts} 
            favoritePosts={favoritePosts}
            onToggleLike={toggleLike}
            onToggleFavorite={toggleFavorite}
            isAdmin={false}
            trendPosts={trendPosts}
            onToggleTrend={toggleTrend}
          />
        );
      case ServiceType.MARKET_HUP:
        return (
          <MarketHup 
            posts={globalPosts} 
            likedPosts={likedPosts} 
            favoritePosts={favoritePosts}
            onToggleLike={toggleLike}
            onToggleFavorite={toggleFavorite}
            onContactMerchant={(mId, prod) => setChatContext({ merchantId: mId, product: prod })}
            isAdmin={false}
            trendPosts={trendPosts}
            onToggleTrend={toggleTrend}
          />
        );
      case ServiceType.MARKET_VID:
        return (
          <MarketVid 
            posts={globalPosts} 
            likedPosts={likedPosts}
            favoritePosts={favoritePosts}
            onToggleLike={toggleLike}
            onToggleFavorite={toggleFavorite}
            onContactMerchant={(mId) => setChatContext({ merchantId: mId })} 
            isAdmin={false}
            trendPosts={trendPosts}
            onToggleTrend={toggleTrend}
          />
        );
      case ServiceType.HATOO:
        return <HATOo onContactMerchant={(mId) => setChatContext({ merchantId: mId })} />;
      case ServiceType.USER_PROFILE:
        return <UserProfile profile={userProfile} setProfile={setUserProfile} onLogout={onLogout} userRole="IMPORTER" adminProfile={{}} merchantProfile={{}} userProfile={userProfile} setActiveService={setActiveService} />;
      case ServiceType.CONTROL_PANEL:
        return <ImporterControlPanel userProfile={userProfile} onSelectService={setActiveService} />;
      case ServiceType.SOUQ_STORE:
        return <SouqStore />;
      case ServiceType.FAVORITES:
        return <Favorites posts={globalPosts.filter(p => favoritePosts.includes(p.id))} />;
      case ServiceType.TRENDS:
        return (
          <Trends 
            posts={globalPosts.filter(p => trendPosts.includes(p.id))} 
            likedPosts={likedPosts}
            favoritePosts={favoritePosts}
            onToggleLike={toggleLike}
            onToggleFavorite={toggleFavorite}
            onContactMerchant={(mId, prod) => setChatContext({ merchantId: mId, product: prod })}
          />
        );
      case ServiceType.MY_MESSAGE:
        return <MyMessage />;
      default:
        return <MarketLook posts={globalPosts} likedPosts={likedPosts} favoritePosts={favoritePosts} onToggleLike={toggleLike} onToggleFavorite={toggleFavorite} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#08090b] text-white overflow-hidden font-display">
      <ImporterSidebar 
        activeService={activeService} 
        setActiveService={(s) => { setActiveService(s); setIsMobileMenuOpen(false); }} 
        onLogout={onLogout}
        userProfile={userProfile}
        enabledServices={enabledServices}
        onUpgradeClick={() => setShowUpgradeModal(true)}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col min-w-0 relative transition-all duration-300">
        <ImporterHeader 
          activeService={activeService} 
          setActiveService={setActiveService} 
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {renderActivePage()}
        </main>
      </div>
      {chatContext && <ChatOverlay merchantId={chatContext.merchantId} product={chatContext.product} buyerName={chatContext.buyerName} onClose={() => setChatContext(null)} />}
      {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}
    </div>
  );
};

export default ImporterInterface;
