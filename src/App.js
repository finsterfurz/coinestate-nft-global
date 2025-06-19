import React, { useState, useEffect, useContext, createContext, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// ==================== ICONS COMPONENTS ====================
const ChevronDown = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const Shield = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const Building = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const Key = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const Users = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const Globe = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const ArrowRight = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const Check = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const Menu = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const BarChart3 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const Settings = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Sun = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const Moon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

// ==================== PROJECT DATA ====================
const ALL_PROJECTS = [
  {
    slug: 'vienna-luxury-apartments',
    name: 'Vienna Luxury Apartments',
    location: 'Vienna, Austria - Innere Stadt (1st District)',
    totalValue: 12500000,
    nftCount: 2500,
    monthlyRent: 41250,
    status: 'Fully Allocated',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    description: 'Premium residential complex in Vienna\'s UNESCO heritage district featuring historic architecture with modern luxury amenities.',
    highlights: ['UNESCO Heritage Location', 'Historic Architecture', 'Premium Finishes', '3.5% Success Rate'],
    marketData: {
      pricePerSqm: 24977,
      rentPerSqm: 25,
      vacancyRate: 0.5,
      successRate: 3.5,
      propertySize: 500
    },
    privateInfo: {
      rentalBreakdown: {
        grossRent: 41250,
        maintenance: 3200,
        management: 2050,
        insurance: 890,
        netIncome: 35110
      },
      caymanFundPerformance: {
        totalPool: 87775,
        monthlyDistribution: 35.11,
        occupancyRate: 97.3
      }
    }
  },
  {
    slug: 'berlin-tech-hub',
    name: 'Berlin Tech Hub',
    location: 'Berlin, Germany - Mitte District',
    totalValue: 3500000,
    nftCount: 1800,
    monthlyRent: 15625,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&h=400&fit=crop',
    description: 'Modern office complex in Berlin\'s startup district with cutting-edge facilities and tech company tenants.',
    highlights: ['Tech Hub Location', 'Modern Infrastructure', 'Co-working Spaces', '4.8% Success Rate'],
    marketData: {
      pricePerSqm: 7000,
      rentPerSqm: 31.25,
      vacancyRate: 2.2,
      successRate: 4.8,
      propertySize: 500
    },
    privateInfo: {
      rentalBreakdown: {
        grossRent: 15625,
        maintenance: 1200,
        management: 780,
        insurance: 345,
        netIncome: 13300
      },
      caymanFundPerformance: {
        totalPool: 21945,
        monthlyDistribution: 13.30,
        occupancyRate: 94.8
      }
    }
  },
  {
    slug: 'zurich-commercial-center',
    name: 'Zurich Commercial Center',
    location: 'Zurich, Switzerland - Financial District',
    totalValue: 5250000,
    nftCount: 3000,
    monthlyRent: 15750,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
    description: 'Prime commercial real estate in Zurich\'s financial center with institutional banking tenants.',
    highlights: ['Financial District', 'Banking Tenants', 'Swiss Quality', '3.0% Success Rate'],
    marketData: {
      pricePerSqm: 10500,
      rentPerSqm: 31.5,
      vacancyRate: 2.6,
      successRate: 3.0,
      propertySize: 500
    }
  },
  {
    slug: 'munich-corporate-plaza',
    name: 'Munich Corporate Plaza',
    location: 'Munich, Germany - Maxvorstadt',
    totalValue: 4200000,
    nftCount: 2100,
    monthlyRent: 18750,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    description: 'State-of-the-art office complex in Munich\'s business district with Fortune 500 tenants.',
    highlights: ['Corporate Tenants', 'Premium Location', 'Modern Infrastructure', '4.5% Success Rate'],
    marketData: {
      pricePerSqm: 8400,
      rentPerSqm: 37.5,
      vacancyRate: 3.1,
      successRate: 4.5,
      propertySize: 500
    }
  },
  {
    slug: 'amsterdam-canal-residences',
    name: 'Amsterdam Canal Residences',
    location: 'Amsterdam, Netherlands - Grachtengordel',
    totalValue: 6800000,
    nftCount: 3400,
    monthlyRent: 27200,
    status: 'Coming Soon',
    image: 'https://images.unsplash.com/photo-1459679749680-18eb2d0bede5?w=600&h=400&fit=crop',
    description: 'Historic canal-side luxury apartments in Amsterdam\'s UNESCO World Heritage canal ring.',
    highlights: ['UNESCO Heritage', 'Canal Views', 'Historic Architecture', '4.8% Success Rate'],
    marketData: {
      pricePerSqm: 13600,
      rentPerSqm: 54.4,
      vacancyRate: 1.2,
      successRate: 4.8,
      propertySize: 500
    }
  },
  {
    slug: 'frankfurt-skyline-towers',
    name: 'Frankfurt Skyline Towers',
    location: 'Frankfurt, Germany - Bankenviertel',
    totalValue: 5500000,
    nftCount: 2750,
    monthlyRent: 22917,
    status: 'Coming Soon',
    image: 'https://images.unsplash.com/photo-1541913299-ed5fe5c5e3d3?w=600&h=400&fit=crop',
    description: 'Premium office space in Frankfurt\'s banking quarter with ECB proximity and institutional tenants.',
    highlights: ['Banking Quarter', 'ECB Proximity', 'Institutional Grade', '5.0% Success Rate'],
    marketData: {
      pricePerSqm: 11000,
      rentPerSqm: 45.8,
      vacancyRate: 4.2,
      successRate: 5.0,
      propertySize: 500
    }
  },
  {
    slug: 'paris-business-district',
    name: 'Paris Business District',
    location: 'Paris, France - La Défense',
    totalValue: 7200000,
    nftCount: 3600,
    monthlyRent: 25200,
    status: 'Coming Soon',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=400&fit=crop',
    description: 'Modern office complex in Europe\'s largest business district with multinational corporate tenants.',
    highlights: ['Largest Business District', 'Multinational Tenants', 'Metro Connected', '4.2% Success Rate'],
    marketData: {
      pricePerSqm: 14400,
      rentPerSqm: 50.4,
      vacancyRate: 6.8,
      successRate: 4.2,
      propertySize: 500
    }
  },
  {
    slug: 'london-canary-wharf',
    name: 'London Canary Wharf',
    location: 'London, UK - Canary Wharf',
    totalValue: 8900000,
    nftCount: 4450,
    monthlyRent: 31200,
    status: 'Planning',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop',
    description: 'Premium office space in London\'s financial district with major banking and finance tenants.',
    highlights: ['Financial Center', 'Banking Tenants', 'Prime Location', '4.2% Success Rate'],
    marketData: {
      pricePerSqm: 17800,
      rentPerSqm: 62.4,
      vacancyRate: 5.1,
      successRate: 4.2,
      propertySize: 500
    }
  }
];

// Get projects with private dashboard access
const DASHBOARD_PROJECTS = ALL_PROJECTS.filter(p => p.privateInfo);

// ==================== CONTEXT & STATE MANAGEMENT ====================
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    // User & Auth
    isConnected: false,
    walletAddress: '',
    kycStatus: 'unverified',
    
    // UI State
    currentPage: 'home',
    theme: 'light',
    loading: false,
    error: null,
    notifications: [],
    
    // App Data
    nftAccess: [],
    selectedProject: null,
    realTimeData: {},
    dashboardView: 'public',
    refreshInterval: null
  });

  const updateState = (updates) => {
    setState(prev => typeof updates === 'function' ? updates(prev) : { ...prev, ...updates });
  };

  const addNotification = (message, type = 'info', duration = 5000) => {
    const id = Date.now();
    const notification = { id, message, type, timestamp: Date.now() };
    
    updateState(prev => ({
      notifications: [...prev.notifications, notification]
    }));

    setTimeout(() => {
      updateState(prev => ({
        notifications: prev.notifications.filter(n => n.id !== id)
      }));
    }, duration);
  };

  const connectWallet = async () => {
    updateState({ loading: true, error: null });
    
    try {
      // Simulate wallet connection delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask not installed. Please install MetaMask to continue.');
      }

      // Simulate wallet connection
      const mockAddress = '0x742d35Cc6Bf4532B8C3F8C71F7Eab0a4A4b7c8f9';
      
      // Simulate NFT access credentials for demo
      const mockNFTs = [
        { projectSlug: 'vienna-luxury-apartments', nftId: 'VLA-247', verified: true },
        { projectSlug: 'berlin-tech-hub', nftId: 'BTH-145', verified: true }
      ];

      updateState({
        isConnected: true,
        walletAddress: mockAddress,
        nftAccess: mockNFTs,
        loading: false,
        kycStatus: 'verified' // Auto-verify for demo
      });

      addNotification('Wallet connected successfully! NFT access credentials verified.', 'success');
      startRealTimeUpdates();

    } catch (error) {
      updateState({ loading: false, error: error.message });
      addNotification(error.message, 'error');
    }
  };

  const startRealTimeUpdates = () => {
    const interval = setInterval(() => {
      updateState(prev => ({
        realTimeData: {
          ...prev.realTimeData,
          lastUpdate: Date.now(),
          prices: {
            vienna: 24977 + (Math.random() - 0.5) * 100,
            berlin: 7000 + (Math.random() - 0.5) * 50,
            zurich: 10500 + (Math.random() - 0.5) * 75
          },
          occupancy: {
            vienna: 97.3 + (Math.random() - 0.5) * 2,
            berlin: 94.8 + (Math.random() - 0.5) * 3,
            zurich: 96.1 + (Math.random() - 0.5) * 2
          }
        }
      }));
    }, 10000);

    updateState({ refreshInterval: interval });
  };

  useEffect(() => {
    return () => {
      if (state.refreshInterval) clearInterval(state.refreshInterval);
    };
  }, [state.refreshInterval]);

  const value = { 
    ...state, 
    updateState, 
    addNotification, 
    connectWallet,
    projects: ALL_PROJECTS,
    dashboardProjects: DASHBOARD_PROJECTS
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// Export the main app component
const CoinEstateApp = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            CoinEstate NFT Global Platform
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-4xl mx-auto">
            Cayman-based NFT real estate platform using NFTs as transferable access keys 
            to individual real estate dashboards with off-chain participation rights.
          </p>
        </div>
      </div>
    </AppProvider>
  );
};

export default CoinEstateApp;