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
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
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
  // Additional projects truncated for brevity - the full data would include all 8 projects
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask not installed. Please install MetaMask to continue.');
      }

      const mockAddress = '0x742d35Cc6Bf4532B8C3F8C71F7Eab0a4A4b7c8f9';
      const mockNFTs = [
        { projectSlug: 'vienna-luxury-apartments', nftId: 'VLA-247', verified: true },
        { projectSlug: 'berlin-tech-hub', nftId: 'BTH-145', verified: true }
      ];

      updateState({
        isConnected: true,
        walletAddress: mockAddress,
        nftAccess: mockNFTs,
        loading: false,
        kycStatus: 'verified'
      });

      addNotification('Wallet connected successfully! NFT access credentials verified.', 'success');

    } catch (error) {
      updateState({ loading: false, error: error.message });
      addNotification(error.message, 'error');
    }
  };

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

// ==================== UTILITY COMPONENTS ====================
const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8', xl: 'w-12 h-12' };
  return (
    <div className={`animate-spin rounded-full border-2 border-blue-600 border-t-transparent ${sizes[size]} ${className}`}></div>
  );
};

const NotificationCenter = () => {
  const { notifications, updateState } = useApp();

  const removeNotification = (id) => {
    updateState(prev => ({ notifications: prev.notifications.filter(n => n.id !== id) }));
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg transform transition-all duration-300 animate-slideIn ${
            notification.type === 'success' ? 'bg-green-100 border-green-200 text-green-800' :
            notification.type === 'error' ? 'bg-red-100 border-red-200 text-red-800' :
            notification.type === 'warning' ? 'bg-yellow-100 border-yellow-200 text-yellow-800' :
            'bg-blue-100 border-blue-200 text-blue-800'
          }`}
        >
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium">{notification.message}</p>
            <button onClick={() => removeNotification(notification.id)} className="ml-4 text-gray-500 hover:text-gray-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ==================== NAVIGATION ====================
const Navigation = () => {
  const { currentPage, updateState, theme } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    updateState(prev => ({ theme: prev.theme === 'light' ? 'dark' : 'light' }));
  };

  const navItems = [
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'dashboard', label: 'Dashboard' }
  ];

  return (
    <nav className={`fixed top-0 w-full backdrop-blur-sm border-b z-50 transition-colors ${
      theme === 'dark' ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={() => updateState({ currentPage: 'home' })}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <Building className={`h-8 w-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                CoinEstate
              </span>
              <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-full">NFT</span>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map(item => (
                <button 
                  key={item.id}
                  onClick={() => updateState({ currentPage: item.id })}
                  className={`transition-colors ${
                    currentPage === item.id
                      ? theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                      : theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              
              <button 
                onClick={() => updateState({ currentPage: 'dashboard' })}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Access
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t ${
            theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
          }`}>
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => { updateState({ currentPage: item.id }); setIsMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2 transition-colors ${
                  theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => { updateState({ currentPage: 'dashboard' }); setIsMenuOpen(false); }}
              className="w-full text-left bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Access
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// ==================== HOMEPAGE ====================
const Homepage = () => {
  const { updateState, theme } = useApp();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <section className={`pt-24 pb-16 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                theme === 'dark' 
                  ? 'bg-blue-900/50 text-blue-300' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                <Globe className="h-4 w-4" />
                <span>Cayman Islands Regulated</span>
              </div>
              
              <h1 className={`text-5xl lg:text-6xl font-bold leading-tight mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Access Premium
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Real Estate</span>
                <br />Through NFT Keys
              </h1>
              
              <p className={`text-xl mb-8 leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                CoinEstateNFT provides community governance access to real estate projects through KYC-verified NFT credentials. Each NFT serves as your voting key to property decisions, operational control, and community participation opportunities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={() => updateState({ currentPage: 'dashboard' })}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Key className="h-5 w-5" />
                  <span>Get Your Governance NFT</span>
                </button>
                <button 
                  onClick={() => updateState({ currentPage: 'projects' })}
                  className={`border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                    theme === 'dark' ? 'hover:bg-blue-600 hover:text-white' : 'hover:bg-blue-50'
                  }`}
                >
                  <span>View Projects</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>KYC Verified Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Transferable Rights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Cayman Regulated</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className={`rounded-2xl shadow-2xl p-8 border ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-100'
              }`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Property Access
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Active</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className={`rounded-lg p-4 ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          Vienna Luxury #247
                        </span>
                        <Key className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className={`mt-2 text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        NFT #0247/2500
                      </div>
                    </div>
                    
                    <div className={`rounded-lg p-4 ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Dashboard Access
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Property Data</span>
                          <span className="text-green-600 text-sm">✓ Unlocked</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Performance Metrics</span>
                          <span className="text-green-600 text-sm">✓ Unlocked</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Participation Rights</span>
                          <span className="text-green-600 text-sm">✓ Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-indigo-600 text-white p-3 rounded-lg shadow-lg">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==================== DASHBOARD PAGE ====================
const DashboardPage = () => {
  const { 
    isConnected, 
    walletAddress, 
    kycStatus, 
    nftAccess, 
    loading, 
    error,
    connectWallet,
    theme,
    dashboardProjects
  } = useApp();

  const hasNFTAccess = (projectSlug) => {
    return nftAccess.some(nft => nft.projectSlug === projectSlug && nft.verified);
  };

  const canAccessPrivate = isConnected && kycStatus === 'verified';

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <section className={`pt-24 pb-12 border-b ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Governance Dashboard
          </h1>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your property voting rights and community governance through NFT credentials.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Legal Compliance Banner */}
        <div className={`border rounded-lg p-4 mb-8 ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-start">
            <Shield className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <div className="flex-1">
              <h4 className={`text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-blue-300' : 'text-blue-900'
              }`}>Governance Credential Dashboard</h4>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-blue-200' : 'text-blue-700'
              }`}>
                This dashboard provides governance access to real estate voting decisions via NFT credentials. NFTs represent 
                <strong> voting rights and operational control</strong> - not securities, ownership interests, or investment contracts. 
                Governance participation and voting rewards are administered by CoinEstate Foundation under Cayman Islands regulations.
              </p>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <X className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-800 font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Wallet Connection */}
        {!isConnected ? (
          <div className={`rounded-xl p-8 shadow-sm border text-center mb-8 ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl mx-auto mb-6 flex items-center justify-center shadow-lg">
              <Key className="w-10 h-10 text-white" />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Connect Your Web3 Wallet
            </h3>
            <p className={`mb-8 max-w-md mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Connect MetaMask or another Web3 wallet to verify your NFT governance credentials and unlock community voting dashboard.
            </p>
            <button
              onClick={connectWallet}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center space-x-2 mx-auto"
            >
              {loading && <LoadingSpinner size="sm" className="text-white" />}
              <span>{loading ? 'Connecting...' : 'Connect Wallet'}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Connected Wallet Info */}
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-green-800'
                  }`}>
                    Wallet Connected
                  </span>
                  <span className={`text-xs font-mono ${
                    theme === 'dark' ? 'text-gray-400' : 'text-green-600'
                  }`}>
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-green-700'}`}>
                    Governance Keys: {nftAccess.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Projects Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {dashboardProjects.map((project) => {
                const userHasAccess = hasNFTAccess(project.slug);
                const showPrivateData = canAccessPrivate && userHasAccess;
                const nftForProject = nftAccess.find(nft => nft.projectSlug === project.slug);
                
                return (
                  <div key={project.slug} className={`rounded-xl shadow-sm border overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {project.name}
                          </h3>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            {project.location}
                          </p>
                        </div>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          userHasAccess ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {userHasAccess ? (
                            <>
                              <Key className="w-3 h-3 mr-1" />
                              Governance Key: {nftForProject?.nftId}
                            </>
                          ) : (
                            <>
                              <Shield className="w-3 h-3 mr-1" />
                              No Governance Key
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Public Information */}
                      <div className="mb-6">
                        <h4 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Public Information
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Property Cost</div>
                            <div className="font-semibold">€{(project.totalValue / 1000000).toFixed(1)}M</div>
                          </div>
                          <div>
                            <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Monthly Rent</div>
                            <div className="font-semibold">€{project.monthlyRent.toLocaleString()}</div>
                          </div>
                          <div className="col-span-2">
                            <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>NFT Distribution</div>
                            <div className="font-semibold">{project.nftCount - 500} / {project.nftCount} distributed</div>
                          </div>
                        </div>
                      </div>

                      {/* Private Dashboard Access */}
                      {showPrivateData && project.privateInfo ? (
                        <div className={`border-t pt-6 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                          <h4 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Governance Dashboard
                          </h4>
                          
                          <div className="mb-4">
                            <div className="text-xs text-gray-500 mb-2">Rental Income Breakdown</div>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Gross Rent</span>
                                <span>€{project.privateInfo.rentalBreakdown.grossRent.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-red-600">
                                <span>- Maintenance</span>
                                <span>€{project.privateInfo.rentalBreakdown.maintenance.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-red-600">
                                <span>- Management</span>
                                <span>€{project.privateInfo.rentalBreakdown.management.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-red-600">
                                <span>- Insurance</span>
                                <span>€{project.privateInfo.rentalBreakdown.insurance.toLocaleString()}</span>
                              </div>
                              <div className={`flex justify-between font-semibold border-t pt-1 ${
                                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                              }`}>
                                <span>Net Income</span>
                                <span>€{project.privateInfo.rentalBreakdown.netIncome.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="text-xs text-gray-500 mb-2">Foundation Performance</div>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div>
                                <div className="text-xs text-gray-400">Community Pool</div>
                                <div className="font-medium">€{project.privateInfo.caymanFundPerformance.totalPool?.toLocaleString() || '0'}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-400">Per Vote/Month</div>
                                <div className="font-medium">€{project.privateInfo.caymanFundPerformance.monthlyDistribution || '0'}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-400">Occupancy</div>
                                <div className="font-medium">{project.privateInfo.caymanFundPerformance.occupancyRate || '0'}%</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : !userHasAccess ? (
                        <div className={`border-t pt-6 text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                          }`}>
                            <Shield className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-500">NFT governance credential required</p>
                          <p className="text-xs text-gray-400 mt-1">Community voting dashboard with rental decisions, governance reports, and Foundation performance</p>
                        </div>
                      ) : (
                        <div className={`border-t pt-6 text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                          <p className="text-sm text-gray-500">Complete KYC verification to access private dashboard</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== SIMPLE PAGES ====================
const ProjectsPage = () => {
  const { theme } = useApp();
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <section className={`pt-24 pb-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Real Estate Projects
          </h1>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Explore our portfolio of premium real estate dashboard access opportunities.
          </p>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => {
  const { theme } = useApp();
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <section className={`pt-24 pb-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            About CoinEstate
          </h1>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Learn more about our mission and approach to NFT-based real estate access.
          </p>
        </div>
      </section>
    </div>
  );
};

const HowItWorksPage = () => {
  const { theme } = useApp();
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <section className={`pt-24 pb-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            How It Works
          </h1>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Detailed explanation of our NFT access credential system.
          </p>
        </div>
      </section>
    </div>
  );
};

// ==================== FOOTER ====================
const Footer = () => {
  const { updateState, theme } = useApp();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Building className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">CoinEstate</span>
              <span className="text-sm bg-blue-900 text-blue-300 px-2 py-1 rounded-full">NFT</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              NFT-based real estate dashboard access under Cayman Islands regulatory framework.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm mb-4">
            © 2025 CoinEstate Foundation. All rights reserved. Regulated under Cayman Islands law.
          </p>
          <p className="text-xs text-gray-500 max-w-4xl mx-auto">
            <strong>Disclaimer:</strong> CoinEstate NFTs are governance credentials only. 
            They do not represent securities or investment contracts. Community voting participation and rewards are 
            voluntary and administered under Cayman Islands regulations.
          </p>
        </div>
      </div>
    </footer>
  );
};

// ==================== MAIN APP ====================
const CoinEstateApp = () => {
  const { currentPage, theme } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'about':
        return <AboutPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      default:
        return <Homepage />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <Navigation />
      <main>{renderPage()}</main>
      <Footer />
      <NotificationCenter />
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

// ==================== MAIN EXPORT ====================
const ProfessionalCoinEstate = () => {
  return (
    <AppProvider>
      <CoinEstateApp />
    </AppProvider>
  );
};

export default ProfessionalCoinEstate;