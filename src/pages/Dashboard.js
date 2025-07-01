import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Send, 
  Download, 
  Plus, 
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff,
  DollarSign,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  Wallet,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

// New listings mock data (now 20 coins)
const newListings = [
  { id: 1, name: 'Arbitrum', symbol: 'ARB', icon: '🔵', listed: '2 min ago', daysAgo: 2, price: 1.11, change: 3.71, changeType: 'positive' },
  { id: 2, name: 'SampleCoin', symbol: 'SMP', icon: '🟡', listed: '5 min ago', daysAgo: 3, price: 101, change: 2.12, changeType: 'positive' },
  { id: 3, name: 'Solana', symbol: 'SOL', icon: '⚫', listed: '10 min ago', daysAgo: 1, price: 22.5, change: 5.23, changeType: 'positive' },
  { id: 4, name: 'Dogecoin', symbol: 'DOGE', icon: '🐶', listed: '15 min ago', daysAgo: 2, price: 0.08, change: -0.5, changeType: 'negative' },
  { id: 5, name: 'Litecoin', symbol: 'LTC', icon: '⚪', listed: '20 min ago', daysAgo: 1, price: 95.2, change: 1.1, changeType: 'positive' },
  { id: 6, name: 'Ethereum', symbol: 'ETH', icon: '🔵', listed: '25 min ago', daysAgo: 2, price: 1478.10, change: 4.75, changeType: 'positive' },
  { id: 7, name: 'Polygon', symbol: 'MATIC', icon: '🟣', listed: '30 min ago', daysAgo: 3, price: 0.666, change: -4.42, changeType: 'negative' },
  { id: 8, name: 'Binance', symbol: 'BNB', icon: '🟢', listed: '35 min ago', daysAgo: 2, price: 270.10, change: 21.59, changeType: 'positive' },
  { id: 9, name: 'Wrapped ETH', symbol: 'WETH', icon: 'Ξ', listed: '40 min ago', daysAgo: 1, price: 1878.56, change: -1.62, changeType: 'negative' },
  { id: 10, name: 'Cardano', symbol: 'ADA', icon: '🔵', listed: '45 min ago', daysAgo: 2, price: 1.25, change: 2.5, changeType: 'positive' },
  { id: 11, name: 'Shiba Inu', symbol: 'SHIB', icon: '🐕', listed: '50 min ago', daysAgo: 3, price: 0.00003, change: 0.5, changeType: 'positive' },
  { id: 12, name: 'Avalanche', symbol: 'AVAX', icon: '🔴', listed: '55 min ago', daysAgo: 2, price: 35.2, change: 3.2, changeType: 'positive' },
  { id: 13, name: 'Polkadot', symbol: 'DOT', icon: '🔴', listed: '1 hr ago', daysAgo: 1, price: 6.5, change: -2.1, changeType: 'negative' },
  { id: 14, name: 'Uniswap', symbol: 'UNI', icon: '🟣', listed: '1 hr 5 min ago', daysAgo: 2, price: 25.1, change: 1.7, changeType: 'positive' },
  { id: 15, name: 'Cosmos', symbol: 'ATOM', icon: '🟣', listed: '1 hr 10 min ago', daysAgo: 3, price: 12.3, change: 0.9, changeType: 'positive' },
  { id: 16, name: 'VeChain', symbol: 'VET', icon: '⚫', listed: '1 hr 15 min ago', daysAgo: 2, price: 0.12, change: 2.2, changeType: 'positive' },
  { id: 17, name: 'Stellar', symbol: 'XLM', icon: '⚪', listed: '1 hr 20 min ago', daysAgo: 1, price: 0.32, change: -0.8, changeType: 'negative' },
  { id: 18, name: 'TRON', symbol: 'TRX', icon: '🔴', listed: '1 hr 25 min ago', daysAgo: 2, price: 0.09, change: 1.1, changeType: 'positive' },
  { id: 19, name: 'Aave', symbol: 'AAVE', icon: '🟣', listed: '1 hr 30 min ago', daysAgo: 3, price: 320, change: 2.8, changeType: 'positive' },
  { id: 20, name: 'Monero', symbol: 'XMR', icon: '⚫', listed: '1 hr 35 min ago', daysAgo: 2, price: 250, change: -1.5, changeType: 'negative' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState('top-gain');
  const [listingSlide, setListingSlide] = useState(0);
  const [visibleListings, setVisibleListings] = useState(2);
  const [listingScrollStep, setListingScrollStep] = useState(1);

  const navigate = useNavigate();

  // Monthly stats slider data
  const monthlyStats = [
    {
      id: 1,
      title: 'This Month Purchased',
      amount: '$2,450.00',
      change: '+15.3%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      id: 2,
      title: 'This Month Interest',
      amount: '$189.50',
      change: '+8.7%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Total Trades',
      amount: '47',
      change: '+12',
      changeType: 'positive',
      icon: Calendar,
      color: 'bg-purple-500'
    }
  ];

  // Mock market data
  const marketData = [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 30780,
      change: 11.75,
      changeType: 'positive',
      volume: '360.6M',
      icon: '₿',
      category: 'top-gain'
    },
    {
      id: 2,
      name: 'Binance',
      symbol: 'BNB',
      price: 270.10,
      change: 21.59,
      changeType: 'positive',
      volume: '132.18M',
      icon: '🟡',
      category: 'top-gain'
    },
    {
      id: 3,
      name: 'Ethereum',
      symbol: 'ETH',
      price: 1478.10,
      change: 4.75,
      changeType: 'positive',
      volume: '50.56M',
      icon: 'Ξ',
      category: 'top-gain'
    },
    {
      id: 4,
      name: 'Arbitrum',
      symbol: 'ARB',
      price: 1.11,
      change: 3.71,
      changeType: 'positive',
      volume: '31.55M',
      icon: '🔵',
      category: 'new-coin'
    },
    {
      id: 5,
      name: 'Wrapped ETH',
      symbol: 'WETH',
      price: 1878.56,
      change: -1.62,
      changeType: 'negative',
      volume: '24.34M',
      icon: 'Ξ',
      category: 'top-loss'
    },
    {
      id: 6,
      name: 'Polygon',
      symbol: 'MATIC',
      price: 0.666,
      change: -4.42,
      changeType: 'negative',
      volume: '19.36M',
      icon: '🟣',
      category: 'top-loss'
    }
  ];

  // Add more mock coins to ensure at least 10
  while (marketData.length < 10) {
    marketData.push({
      id: 100 + marketData.length,
      name: 'SampleCoin',
      symbol: 'SMP',
      price: 100 + marketData.length,
      change: (Math.random() * 10 - 5).toFixed(2),
      changeType: Math.random() > 0.5 ? 'positive' : 'negative',
      volume: (Math.random() * 100).toFixed(2) + 'M',
      icon: '🟡',
      category: ['top-gain', 'top-loss', 'new-coin'][marketData.length % 3],
    });
  }

  const quickActions = [
    { name: 'Add Money', icon: Plus, color: 'bg-green-500' },
    { name: 'Send', icon: Send, color: 'bg-blue-500' },
    { name: 'Receive', icon: Download, color: 'bg-purple-500' },
    { name: 'Earn', icon: TrendingUp, color: 'bg-yellow-500' }
  ];

  // Auto-slide effect for monthly stats
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % monthlyStats.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [monthlyStats.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % monthlyStats.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + monthlyStats.length) % monthlyStats.length);
  };

  // Filter market data by category
  const topGainers = marketData.filter(coin => coin.category === 'top-gain');
  const topLosers = marketData.filter(coin => coin.category === 'top-loss');
  const newCoins = marketData.filter(coin => coin.category === 'new-coin');

  // Top coins mock data
  const topCoins = [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 30780,
      change: 11.75,
      color: 'from-purple-700 to-purple-500',
      icon: '₿',
      chartColor: '#a855f7',
      chartData: [10, 12, 9, 14, 13, 15, 14]
    },
    {
      id: 2,
      name: 'Binance',
      symbol: 'BNB',
      price: 270.10,
      change: 21.59,
      color: 'from-green-700 to-green-500',
      icon: '🟢',
      chartColor: '#22c55e',
      chartData: [8, 9, 10, 11, 10, 12, 13]
    },
    {
      id: 3,
      name: 'Ethereum',
      symbol: 'ETH',
      price: 1478.10,
      change: 4.75,
      color: 'from-blue-700 to-blue-500',
      icon: '🔵',
      chartColor: '#3b82f6',
      chartData: [7, 8, 7, 9, 8, 10, 11]
    }
  ];

  const filterOptions = [
    { label: 'Top Gain', value: 'top-gain' },
    { label: 'Top Loss', value: 'top-loss' },
    { label: 'New Coin', value: 'new-coin' },
  ];

  const filteredCoins = marketData.filter((coin) => coin.category === activeFilter);

  // Responsive visible count and scroll step
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setVisibleListings(4);
        setListingScrollStep(4);
      } else {
        setVisibleListings(2);
        setListingScrollStep(1);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxListingSlide = Math.max(0, newListings.length - visibleListings);
  const handlePrevListing = () => setListingSlide((prev) => Math.max(0, prev - listingScrollStep));
  const handleNextListing = () => setListingSlide((prev) => Math.min(maxListingSlide, prev + listingScrollStep));

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your portfolio today
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>

      {/* Wallet Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Main Wallet Card */}
        <div className="lg:col-span-2">
          <div className="card bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">My Wallet - Account {selectedAccount + 1}</h3>
                <p className="text-blue-100">Total Balance</p>
              </div>
              <div className="h-12 w-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-3xl font-bold mb-2">
                {showBalance ? `$${user?.accounts[selectedAccount]?.balance.toLocaleString()}` : '****'}
              </div>
              <div className="flex items-center text-blue-100">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+2.5% from last month</span>
              </div>
            </div>

            {/* Monthly Stats Slider */}
            <div className="mb-6 relative">
              <div className="relative h-20 overflow-hidden rounded-lg bg-white bg-opacity-10">
                {monthlyStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.id}
                      className={`absolute inset-0 flex items-center justify-between p-4 transition-opacity duration-500 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`h-10 w-10 ${stat.color} rounded-lg flex items-center justify-center mr-3`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-blue-100">{stat.title}</p>
                          <p className="text-lg font-semibold">{stat.amount}</p>
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-300' : 'text-red-300'
                      }`}>
                        {stat.change}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Slider Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-1 rounded-full transition-all duration-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-1 rounded-full transition-all duration-200"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              
              {/* Slider Indicators */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {monthlyStats.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.name}
                    className="flex flex-col items-center p-3 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200"
                  >
                    <div className={`h-8 w-8 ${action.color} rounded-lg flex items-center justify-center mb-2`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-medium">{action.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Account Selector */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Accounts</h3>
          <div className="space-y-3">
            {user?.accounts?.map((account, index) => (
              <button
                key={account.id}
                onClick={() => setSelectedAccount(index)}
                className={`w-full p-4 rounded-lg border transition-colors duration-200 ${
                  selectedAccount === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{account.name}</p>
                    <p className="text-sm text-gray-600">
                      {showBalance ? `$${account.balance.toLocaleString()}` : '****'}
                    </p>
                  </div>
                  {selectedAccount === index && (
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Top Coin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topCoins.map((coin) => (
          <div key={coin.id} className={`rounded-xl p-5 bg-gradient-to-br ${coin.color} text-white shadow-lg relative overflow-hidden`}>
            <div className="flex items-center mb-2">
              <div className="h-10 w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3 text-2xl">
                {coin.icon}
              </div>
              <div>
                <div className="font-semibold text-lg">{coin.name}</div>
                <div className="text-xs opacity-80">{coin.symbol}</div>
              </div>
            </div>
            {/* Mini Chart (SVG for now) */}
            <svg height="32" width="100%" viewBox="0 0 100 32" className="my-2">
              <polyline
                fill="none"
                stroke={coin.chartColor}
                strokeWidth="3"
                points="0,20 15,15 30,18 45,10 60,12 75,8 100,15"
                opacity="0.7"
              />
            </svg>
            <div className="flex items-end justify-between mt-2">
              <div className="text-xl font-bold">${coin.price.toLocaleString()}</div>
              <div className={`flex items-center text-sm font-semibold ${coin.change > 0 ? 'text-green-300' : 'text-red-300'}`}>
                {coin.change > 0 ? '+' : ''}{coin.change}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Market Table with Filters */}
      <div className="card mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Market</h2>
          <div className="flex space-x-2">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setActiveFilter(opt.value)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeFilter === opt.value
                    ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.table
              key={activeFilter}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="min-w-full text-sm bg-transparent"
            >
              <thead>
                <tr className="text-gray-400">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-right">Last price</th>
                  <th className="py-3 px-4 text-right">Change</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoins.slice(0, 10).map((coin) => (
                  <tr key={coin.id} className="hover:bg-gray-900 transition">
                    <td className="py-3 px-4 flex items-center space-x-3">
                      <span className={`h-8 w-8 rounded-full flex items-center justify-center text-lg ${coin.icon === '🟡' ? 'bg-yellow-400' : 'bg-white'} shadow`}>
                        {coin.icon}
                      </span>
                      <div>
                        <div className="font-medium text-white">{coin.name}</div>
                        <div className="text-xs text-gray-400">{coin.symbol}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-200 font-semibold">₹{coin.price.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${coin.changeType === 'positive' ? 'bg-green-600/80 text-white' : 'bg-red-600/80 text-white'}`}>
                        {coin.changeType === 'positive' ? '+' : ''}{coin.change}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
          </AnimatePresence>
          <div className="flex justify-center mt-4">
            <button
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              onClick={() => navigate('/coins')}
            >
              Show All Coins
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {[
              { type: 'buy', coin: 'BTC', amount: '0.5', value: '$15,390', time: '2 hours ago' },
              { type: 'sell', coin: 'ETH', amount: '2.1', value: '$3,104', time: '5 hours ago' },
              { type: 'buy', coin: 'BNB', amount: '5.0', value: '$1,350', time: '1 day ago' },
            ].map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center mr-3 ${
                    tx.type === 'buy' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {tx.type === 'buy' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {tx.type === 'buy' ? 'Bought' : 'Sold'} {tx.amount} {tx.coin}
                    </p>
                    <p className="text-sm text-gray-500">{tx.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{tx.value}</p>
                  <p className={`text-sm ${tx.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'buy' ? '+' : '-'}{tx.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div>
                <p className="text-sm text-green-700">Total Profit</p>
                <p className="text-2xl font-bold text-green-800">+$2,459.34</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">24h Change</p>
                <p className="text-lg font-semibold text-green-600">+5.2%</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">7d Change</p>
                <p className="text-lg font-semibold text-red-600">-2.1%</p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700 mb-2">Top Performer</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-6 w-6 bg-yellow-100 rounded-lg flex items-center justify-center mr-2">
                    <span className="text-xs font-medium">₿</span>
                  </div>
                  <span className="font-medium text-blue-900">Bitcoin</span>
                </div>
                <span className="text-green-600 font-semibold">+11.75%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* New Listings Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card mt-2"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">New Listings</h3>
        <div className="relative">
          <button
            onClick={handlePrevListing}
            disabled={listingSlide === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow ${listingSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-blue-100'}`}
          >
            <ChevronLeft className="h-5 w-5 text-blue-600" />
          </button>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(0%)`, width: '100%' }}
            >
              {newListings.slice(listingSlide, listingSlide + visibleListings).map((coin) => (
                <div key={coin.id} className="relative flex-1 rounded-xl bg-gray-900 p-3 flex flex-col items-center shadow">
                  {/* Days Ago Badge */}
                  <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                    {coin.daysAgo} {coin.daysAgo === 1 ? 'day' : 'days'}
                  </span>
                  <span className={`h-10 w-10 rounded-full flex items-center justify-center text-2xl mb-2 ${coin.icon === '🟡' ? 'bg-yellow-400' : 'bg-white'} shadow`}>
                    {coin.icon}
                  </span>
                  <div className="font-medium text-white text-sm mb-1">{coin.name}</div>
                  <div className="text-xs text-gray-400 mb-2">Listed {coin.listed}</div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-200 text-sm">₹{coin.price.toLocaleString()}</div>
                    <div className={`text-xs font-semibold ${coin.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>{coin.changeType === 'positive' ? '+' : ''}{coin.change}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleNextListing}
            disabled={listingSlide === maxListingSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow ${listingSlide === maxListingSlide ? 'opacity-30 cursor-not-allowed' : 'hover:bg-blue-100'}`}
          >
            <ChevronRight className="h-5 w-5 text-blue-600" />
          </button>
        </div>
      </motion.div>
      <div className="mb-40" />
    </div>
  );
};

export default Dashboard;