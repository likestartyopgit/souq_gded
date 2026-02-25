
import React, { useState, useEffect } from 'react';
import { ServiceType, UserRole, GlobalPost, ImporterPlan } from './types';
import ImporterInterface from './pages/ImporterInterface';
import MerchantInterface from './pages/MerchantInterface';
import AdminInterface from './pages/AdminInterface';
import PublicLogin from './pages/PublicLogin';
import AdminLogin from './pages/AdminLogin';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('souqhup_isLoggedIn') === 'true');
  const [userRole, setUserRole] = useState<UserRole>(() => (localStorage.getItem('souqhup_userRole') as UserRole) || 'IMPORTER');
  const [loginType, setLoginType] = useState<'PUBLIC' | 'ADMIN'>(() => (localStorage.getItem('souqhup_loginType') as any) || 'PUBLIC');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [favoritePosts, setFavoritePosts] = useState<string[]>([]);
  const [trendPosts, setTrendPosts] = useState<string[]>([]);

  const [adminProfile, setAdminProfile] = useState(() => {
    const saved = localStorage.getItem('souqhup_adminProfile');
    return saved ? JSON.parse(saved) : {
      name: "SOUQHUP ADMIN",
      avatar: "https://picsum.photos/seed/admin-system/400/400",
      password: "admin"
    };
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('souqhup_userProfile');
    return saved ? JSON.parse(saved) : {
      name: "Muhammad Zakaria",
      avatar: "https://picsum.photos/seed/egypt-user/200/200",
      password: "user",
      plan: "KING" as ImporterPlan
    };
  });

  const [merchantProfile, setMerchantProfile] = useState(() => {
    const saved = localStorage.getItem('souqhup_merchantProfile');
    return saved ? JSON.parse(saved) : {
      name: "Cairo Textiles Co.",
      category: "Industrial Hub • Textiles",
      bio: "Leading gateway for wholesale fabrics in Egypt for over 30 years.",
      avatar: "https://picsum.photos/seed/m-sample/300/300",
      location: "Port Said, Egypt",
      email: "info@cairotextiles.eg",
      phone: "+20 10 1234 5678",
      established: "1994",
      plan: "PRO",
      password: "merchant"
    };
  });

  const [enabledServices, setEnabledServices] = useState<Record<ServiceType, boolean>>({
    [ServiceType.MARKET_LOOK]: true,
    [ServiceType.MARKET_HUP]: true,
    [ServiceType.MARKET_VID]: true,
    [ServiceType.HATOO]: true,
    [ServiceType.SOUQ_STORE]: true,
    [ServiceType.NOTIFICATION_SETTINGS]: true,
    [ServiceType.USER_PROFILE]: true,
    [ServiceType.MERCHANT_DASHBOARD]: true,
    [ServiceType.MERCHANT_CHANNEL]: true,
    [ServiceType.ADMIN_DASHBOARD]: true,
    [ServiceType.CONTROL_PANEL]: true,
    [ServiceType.LOGIN]: true,
    [ServiceType.FAVORITES]: true,
    [ServiceType.TRENDS]: true,
    [ServiceType.MY_MESSAGE]: true,
    [ServiceType.LIVE_ANALYTICS]: true,
  });

  const [globalPosts, setGlobalPosts] = useState<GlobalPost[]>([
    { 
      id: '1', title: 'Egyptian Cotton Premium', type: 'Video', date: '2d ago', views: 5400, interactions: 1200, communications: 42,
      thumbnail: 'https://images.unsplash.com/photo-1558227691-41ea78d1f631?q=80&w=600&auto=format&fit=crop', 
      ref: '#EX-1024', capacity: '500kg', price: 'EGP 450/kg', merchantName: merchantProfile.name, merchantAvatar: merchantProfile.avatar,
      description: 'Long-staple Giza cotton, perfect for export-quality textiles.'
    },
    { 
      id: '2', title: 'Industrial Silk Yarn', type: 'Image', date: '5d ago', views: 3200, interactions: 420, communications: 18,
      thumbnail: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600&auto=format&fit=crop', 
      ref: '#EX-1025', capacity: '200kg', price: 'EGP 1,200/unit', merchantName: merchantProfile.name, merchantAvatar: merchantProfile.avatar,
      description: 'Soft silk fibers intended for high-end upholstery and luxury garments.'
    }
  ]);

  const totalViews = globalPosts.reduce((acc, p) => acc + p.views, 0);
  const totalInteractions = globalPosts.reduce((acc, p) => acc + p.interactions, 0);

  useEffect(() => {
    const root = document.documentElement;
    let color = '#0df20d';
    let shadow = 'rgba(13, 242, 13, 0.4)';
    let rgb = '13, 242, 13';

    if (userRole === 'ADMIN' || userRole === 'TEAM') {
      color = '#eab308';
      shadow = 'rgba(234, 179, 8, 0.4)';
      rgb = '234, 179, 8';
    } else if (userRole === 'MERCHANT') {
      color = '#00f2ff';
      shadow = 'rgba(0, 242, 255, 0.4)';
      rgb = '0, 242, 255';
    }

    root.style.setProperty('--primary-color', color);
    root.style.setProperty('--primary-shadow', shadow);
    root.style.setProperty('--primary-rgb', rgb);

    localStorage.setItem('souqhup_isLoggedIn', isLoggedIn.toString());
    localStorage.setItem('souqhup_userRole', userRole);
    localStorage.setItem('souqhup_loginType', loginType);
    localStorage.setItem('souqhup_adminProfile', JSON.stringify(adminProfile));
    localStorage.setItem('souqhup_userProfile', JSON.stringify(userProfile));
    localStorage.setItem('souqhup_merchantProfile', JSON.stringify(merchantProfile));
  }, [isLoggedIn, userRole, loginType, adminProfile, userProfile, merchantProfile]);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === 'ADMIN' || role === 'TEAM') {
      setLoginType('ADMIN');
    } else {
      setLoginType('PUBLIC');
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('souqhup_isLoggedIn');
  };

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const isLiked = prev.includes(postId);
      if (!isLiked) {
        // When liking, also add to favorites if not already there (as requested)
        setFavoritePosts(fPrev => fPrev.includes(postId) ? fPrev : [...fPrev, postId]);
        return [...prev, postId];
      } else {
        return prev.filter(id => id !== postId);
      }
    });
  };

  const toggleFavorite = (postId: string) => {
    setFavoritePosts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const toggleTrend = (postId: string) => {
    setTrendPosts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="relative">
        {loginType === 'PUBLIC' ? (
          <PublicLogin onLogin={handleLogin} />
        ) : (
          <AdminLogin onLogin={handleLogin} />
        )}
        <button 
          onClick={() => setLoginType(prev => prev === 'PUBLIC' ? 'ADMIN' : 'PUBLIC')}
          className="fixed bottom-8 right-8 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:border-primary/40 transition-all z-50"
        >
          Switch to {loginType === 'PUBLIC' ? 'Admin Terminal' : 'Market Gateway'}
        </button>
      </div>
    );
  }

  if (userRole === 'ADMIN' || userRole === 'TEAM') {
    return (
      <AdminInterface 
        adminProfile={adminProfile}
        setAdminProfile={setAdminProfile}
        onLogout={handleLogout}
        globalPosts={globalPosts}
        likedPosts={likedPosts}
        favoritePosts={favoritePosts}
        trendPosts={trendPosts}
        toggleLike={toggleLike}
        toggleFavorite={toggleFavorite}
        toggleTrend={toggleTrend}
        enabledServices={enabledServices}
        setEnabledServices={setEnabledServices}
        totalViews={totalViews}
        totalInteractions={totalInteractions}
      />
    );
  }

  if (userRole === 'MERCHANT') {
    return (
      <MerchantInterface 
        merchantProfile={merchantProfile}
        setMerchantProfile={setMerchantProfile}
        onLogout={handleLogout}
        globalPosts={globalPosts}
        setGlobalPosts={setGlobalPosts}
        likedPosts={likedPosts}
        favoritePosts={favoritePosts}
        trendPosts={trendPosts}
        toggleLike={toggleLike}
        toggleFavorite={toggleFavorite}
        toggleTrend={toggleTrend}
        enabledServices={enabledServices}
      />
    );
  }

  return (
    <ImporterInterface 
      userProfile={userProfile}
      setUserProfile={setUserProfile}
      onLogout={handleLogout}
      globalPosts={globalPosts}
      likedPosts={likedPosts}
      favoritePosts={favoritePosts}
      trendPosts={trendPosts}
      toggleLike={toggleLike}
      toggleFavorite={toggleFavorite}
      toggleTrend={toggleTrend}
      enabledServices={enabledServices}
    />
  );
};

export default App;
