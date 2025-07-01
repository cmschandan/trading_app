import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  { label: 'Watchlist', value: 'watchlist' },
  { label: 'Categories', value: 'categories' },
  { label: 'All', value: 'all' },
];

// Mock coins data
const allCoins = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 30780, change: 11.75, icon: '₿', changeType: 'positive' },
  { id: 2, name: 'Binance', symbol: 'BNB', price: 270.10, change: 21.59, icon: '🟢', changeType: 'positive' },
  { id: 3, name: 'Ethereum', symbol: 'ETH', price: 1478.10, change: 4.75, icon: '🔵', changeType: 'positive' },
  { id: 4, name: 'Polygon', symbol: 'MATIC', price: 0.666, change: -4.42, icon: '🟣', changeType: 'negative' },
  { id: 5, name: 'Arbitrum', symbol: 'ARB', price: 1.11, change: 3.71, icon: '🔵', changeType: 'positive' },
  { id: 6, name: 'Wrapped ETH', symbol: 'WETH', price: 1878.56, change: -1.62, icon: 'Ξ', changeType: 'negative' },
  { id: 7, name: 'SampleCoin', symbol: 'SMP', price: 101, change: 2.12, icon: '🟡', changeType: 'positive' },
  { id: 8, name: 'Solana', symbol: 'SOL', price: 22.5, change: 5.23, icon: '⚫', changeType: 'positive' },
  { id: 9, name: 'Dogecoin', symbol: 'DOGE', price: 0.08, change: -0.5, icon: '🐶', changeType: 'negative' },
  { id: 10, name: 'Litecoin', symbol: 'LTC', price: 95.2, change: 1.1, icon: '⚪', changeType: 'positive' },
];

const AllCoins = () => {
  const [activeTab, setActiveTab] = useState('all');

  // For demo, all tabs show the same coins. You can filter as needed.
  const coinsToShow = allCoins;

  return (
    <div className="max-w-2xl mx-auto py-6 px-2 sm:px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">All Coins</h1>
      <div className="flex justify-center mb-6 space-x-2">
        {tabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${activeTab === tab.value ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow divide-y divide-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {coinsToShow.map(coin => (
              <div key={coin.id} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-3">
                  <span className={`h-10 w-10 rounded-full flex items-center justify-center text-xl ${coin.icon === '🟡' ? 'bg-yellow-400' : 'bg-white'} shadow`}>
                    {coin.icon}
                  </span>
                  <div>
                    <div className="font-semibold text-gray-900">{coin.name}</div>
                    <div className="text-xs text-gray-500">{coin.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-800">₹{coin.price.toLocaleString()}</div>
                  <div className={`text-xs font-semibold ${coin.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>{coin.changeType === 'positive' ? '+' : ''}{coin.change}%</div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AllCoins; 