
export enum ServiceType {
  MARKET_LOOK = 'Market Look',
  MARKET_HUP = 'Market Hup',
  MARKET_VID = 'Market VID',
  HATOO = 'HATOo',
  SOUQ_STORE = 'Souq Store',
  NOTIFICATION_SETTINGS = 'Notification Settings',
  USER_PROFILE = 'User Profile',
  MERCHANT_DASHBOARD = 'Merchant Dashboard',
  MERCHANT_CHANNEL = 'Merchant Channel',
  ADMIN_DASHBOARD = 'Admin Dashboard',
  CONTROL_PANEL = 'Control Panel',
  LOGIN = 'Login',
  FAVORITES = 'Favorites',
  TRENDS = 'Trends',
  LIVE_ANALYTICS = 'Live Analytics',
  MY_MESSAGE = 'My Message'
}

export type UserRole = 'IMPORTER' | 'MERCHANT' | 'ADMIN' | 'TEAM';
export type ImporterPlan = 'FREE' | 'PRO' | 'SUPER' | 'KING';
export type MerchantPlan = 'FREE' | 'PRO';

export interface Merchant {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  category: string;
  location?: string;
  joinedDate?: string;
  rating?: number;
  plan?: MerchantPlan;
}

export interface Importer {
  name: string;
  avatar: string;
  password?: string;
  plan: ImporterPlan;
}

export interface Product {
  id: string;
  title: string;
  imageUrl: string;
  merchant?: Merchant;
  category?: string;
  engagement?: {
    views: string;
    inquiries: string;
    shares: string;
  };
}

export interface GlobalPost {
  id: string;
  title: string;
  type: 'Video' | 'Image';
  date: string;
  views: number;
  interactions: number;
  communications: number;
  thumbnail: string;
  ref: string;
  capacity: string;
  price: string;
  description: string;
  merchantName: string;
  merchantAvatar: string;
}
