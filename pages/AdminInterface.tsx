
import React, { useState } from 'react';
import { ServiceType, UserRole, GlobalPost } from '../types';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import AdminDashboard from './AdminDashboard';
import UserProfile from './UserProfile';
import AdminControlPanel from './AdminControlPanel';
import MyMessage from './MyMessage';
import SouqStore from './SouqStore';
import MarketLook from './MarketLook';
import MarketHup from './MarketHup';
import MarketVid from './MarketVid';
import HATOo from './HATOo';
import Favorites from './Favorites';
import Trends from './Trends';
import ChatOverlay from '../components/ChatOverlay';

interface AdminInterfaceProps {
  adminProfile: any;
  setAdminProfile: (p: any) => void;
  onLogout: () => void;
  globalPosts: GlobalPost[];
  likedPosts: string[];
  favoritePosts: string[];
  trendPosts: string[];
  toggleLike: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleTrend: (id: string) => void;
  enabledServices: Record<ServiceType, boolean>;
  setEnabledServices: (s: Record<ServiceType, boolean>) => void;
  totalViews: number;
  totalInteractions: number;
}

const AdminInterface: React.FC<AdminInterfaceProps> = ({
  adminProfile,
  setAdminProfile,
  onLogout,
  globalPosts,
  likedPosts,
  favoritePosts,
  trendPosts,
  toggleLike,
  toggleFavorite,
  toggleTrend,
  enabledServices,
  setEnabledServices,
  totalViews,
  totalInteractions
}) => {
  const [activeService, setActiveService] = useState<ServiceType>(ServiceType.CONTROL_PANEL);
  const [chatContext, setChatContext] = useState<{merchantId: string, buyerName?: string, product?: any} | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderActivePage = () => {
    switch (activeService) {
      case ServiceType.ADMIN_DASHBOARD:
        return <AdminDashboard enabledServices={enabledServices} setEnabledServices={setEnabledServices} totalUsers={1542} freeUsers={1120} proUsers={422} totalViews={totalViews} totalInteractions={totalInteractions} adminProfile={adminProfile} setAdminProfile={setAdminProfile} onLogout={onLogout} />;
      case ServiceType.USER_PROFILE:
        return <UserProfile profile={adminProfile} setProfile={setAdminProfile} onLogout={onLogout} userRole="ADMIN" adminProfile={adminProfile} merchantProfile={{}} userProfile={{}} setActiveService={setActiveService} />;
      case ServiceType.CONTROL_PANEL:
        return <AdminControlPanel adminProfile={adminProfile} onSelectService={setActiveService} />;
      case ServiceType.MY_MESSAGE:
        return <MyMessage />;
      case ServiceType.SOUQ_STORE:
        return <SouqStore />;
      case ServiceType.MARKET_LOOK:
        return (
          <MarketLook 
            posts={globalPosts} 
            likedPosts={likedPosts} 
            favoritePosts={favoritePosts} 
            onToggleLike={toggleLike} 
            onToggleFavorite={toggleFavorite}
            isAdmin={true}
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
            isAdmin={true}
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
            isAdmin={true}
            trendPosts={trendPosts}
            onToggleTrend={toggleTrend}
          />
        );
      case ServiceType.HATOO:
        return <HATOo onContactMerchant={(mId) => setChatContext({ merchantId: mId })} />;
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
      default:
        return <AdminDashboard enabledServices={enabledServices} setEnabledServices={setEnabledServices} totalUsers={1542} freeUsers={1120} proUsers={422} totalViews={totalViews} totalInteractions={totalInteractions} adminProfile={adminProfile} setAdminProfile={setAdminProfile} onLogout={onLogout} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#08090b] text-white overflow-hidden font-display">
      <AdminSidebar 
        activeService={activeService} 
        setActiveService={(s) => { setActiveService(s); setIsMobileMenuOpen(false); }} 
        onLogout={onLogout}
        adminProfile={adminProfile}
        enabledServices={enabledServices}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        userRole={adminProfile.name === 'SOUQHUP ADMIN' ? 'ADMIN' : 'TEAM'}
      />
      <div className="flex-1 flex flex-col min-w-0 relative transition-all duration-300">
        <AdminHeader 
          activeService={activeService} 
          setActiveService={setActiveService} 
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {renderActivePage()}
        </main>
      </div>
      {chatContext && <ChatOverlay merchantId={chatContext.merchantId} product={chatContext.product} buyerName={chatContext.buyerName} onClose={() => setChatContext(null)} />}
    </div>
  );
};

export default AdminInterface;
