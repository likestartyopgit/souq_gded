
import React, { useState } from 'react';
import { ServiceType, UserRole, GlobalPost } from '../types';
import MerchantSidebar from '../components/MerchantSidebar';
import MerchantHeader from '../components/MerchantHeader';
import MerchantDashboard from './MerchantDashboard';
import MerchantChannel from './MerchantChannel';
import UserProfile from './UserProfile';
import MerchantControlPanel from './MerchantControlPanel';
import MyMessage from './MyMessage';
import ChatOverlay from '../components/ChatOverlay';
import UpgradeModal from '../components/UpgradeModal';
import MarketLook from './MarketLook';
import MarketHup from './MarketHup';
import MarketVid from './MarketVid';
import HATOo from './HATOo';
import Trends from './Trends';
import Favorites from './Favorites';

interface MerchantInterfaceProps {
  merchantProfile: any;
  setMerchantProfile: (p: any) => void;
  onLogout: () => void;
  globalPosts: GlobalPost[];
  setGlobalPosts: (posts: GlobalPost[]) => void;
  likedPosts: string[];
  favoritePosts: string[];
  trendPosts: string[];
  toggleLike: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleTrend: (id: string) => void;
  enabledServices: Record<ServiceType, boolean>;
}

const MerchantInterface: React.FC<MerchantInterfaceProps> = ({
  merchantProfile,
  setMerchantProfile,
  onLogout,
  globalPosts,
  setGlobalPosts,
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
      case ServiceType.MERCHANT_DASHBOARD:
        return <MerchantDashboard merchantName={merchantProfile.name} onNavigateToStudio={() => setActiveService(ServiceType.MERCHANT_CHANNEL)} onRespond={(bName, prod) => setChatContext({ merchantId: "current_user", buyerName: bName, product: prod })} onLogout={onLogout} />;
      case ServiceType.MERCHANT_CHANNEL:
        return <MerchantChannel merchantId="m-sample" externalProfile={merchantProfile} onProfileUpdate={setMerchantProfile} onContactMerchant={(mId, prod) => setChatContext({ merchantId: mId, product: prod })} posts={globalPosts} onAddPost={(p) => setGlobalPosts([p as GlobalPost, ...globalPosts])} />;
      case ServiceType.USER_PROFILE:
        return <UserProfile profile={merchantProfile} setProfile={setMerchantProfile} onLogout={onLogout} userRole="MERCHANT" adminProfile={{}} merchantProfile={merchantProfile} userProfile={{}} setActiveService={setActiveService} />;
      case ServiceType.CONTROL_PANEL:
        return <MerchantControlPanel merchantProfile={merchantProfile} onSelectService={setActiveService} />;
      case ServiceType.MY_MESSAGE:
        return <MyMessage />;
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
      default:
        return <MerchantDashboard merchantName={merchantProfile.name} onNavigateToStudio={() => setActiveService(ServiceType.MERCHANT_CHANNEL)} onRespond={(bName, prod) => setChatContext({ merchantId: "current_user", buyerName: bName, product: prod })} onLogout={onLogout} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#08090b] text-white overflow-hidden font-display">
      <MerchantSidebar 
        activeService={activeService} 
        setActiveService={(s) => { setActiveService(s); setIsMobileMenuOpen(false); }} 
        onLogout={onLogout}
        merchantProfile={merchantProfile}
        enabledServices={enabledServices}
        onUpgradeClick={() => setShowUpgradeModal(true)}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col min-w-0 relative transition-all duration-300">
        <MerchantHeader 
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

export default MerchantInterface;
