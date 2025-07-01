import React, { useState } from 'react';
import { Star, SlidersHorizontal, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Favorites', value: 'favorites', icon: Star },
  { label: 'Attractive', value: 'attractive' },
  { label: 'Meme', value: 'meme' },
  { label: 'Staking', value: 'staking' },
];

const coins = [
  { id: 1, name: 'ETH', symbol: 'ETH', icon: '🟦', volume: '$360,6M', price: '$1.878,80', change: -1.62 },
  { id: 2, name: 'arb_ETH', symbol: 'ARB', icon: '🟨', volume: '$132,18M', price: '$1.878,80', change: 1.62 },
  { id: 3, name: 'WBTC', symbol: 'WBTC', icon: '🟧', volume: '$50,56M', price: '$30.001,96', change: -1.64 },
  { id: 4, name: 'ARB', symbol: 'ARB', icon: '🟦', volume: '$31,55M', price: '$1,11', change: 3.71 },
  { id: 5, name: 'WETH', symbol: 'WETH', icon: '⚫', volume: '$24,34M', price: '$1.878,56', change: -1.62 },
  { id: 6, name: 'MATIC', symbol: 'MATIC', icon: '🟪', volume: '$19,36M', price: '$0,666', change: -4.42 },
  { id: 7, name: 'OP_ETH', symbol: 'OP', icon: '🟩', volume: '$15,5M', price: '$1.878,47', change: 1.62 },
  { id: 8, name: 'WBTC', symbol: 'WBTC', icon: '🟧', volume: '$11,5M', price: '$30.034,60', change: -0.57 },
  { id: 9, name: 'WSTETH', symbol: 'WSTETH', icon: '🟪', volume: '$11,49M', price: '$2.121,39', change: -1.61 },
];

const Exchange = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Filter coins by search and tab (mock logic)
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#101312] min-h-screen pb-20">
      <div className="px-4 pt-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white"><span className="text-white">Market</span> <span className="text-gray-400 font-normal">Trade</span></h1>
        <button className="p-2 rounded-lg bg-[#181c1b] text-gray-300 hover:bg-[#232826]">
          <SlidersHorizontal className="h-5 w-5" />
        </button>
      </div>
      <div className="px-4 mt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Swap over 210.00 tokens on more than 10 chains"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#181c1b] text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>
      <div className="px-4 mt-4 overflow-x-auto">
        <div className="flex space-x-4 border-b border-[#232826]">
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center py-2 px-1 text-sm font-semibold border-b-2 transition-colors duration-200 ${activeTab === tab.value ? 'border-yellow-400 text-yellow-400' : 'border-transparent text-gray-300 hover:text-white'}`}
            >
              {tab.icon && <tab.icon className="h-4 w-4 mr-1" />}
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="px-2 sm:px-4 mt-2">
        <div className="flex text-xs text-gray-400 py-2 border-b border-[#232826]">
          <div className="flex-1">Name/Revenue</div>
          <div className="w-32 text-right">Last price</div>
          <div className="w-20 text-right">24h change</div>
        </div>
        <div>
          {filteredCoins.map(coin => (
            <div
              key={coin.id}
              className="flex items-center py-3 border-b border-gray-200 card cursor-pointer hover:bg-gray-100 transition"
              onClick={() => navigate('/choose-payment', { state: { amount: parseFloat(coin.price.replace(/[^\d.]/g, '')), walletBalance: 5000 } })}
            >
              <div className="flex-1 flex items-center space-x-3">
                <span className="h-8 w-8 rounded-full flex items-center justify-center text-lg bg-white/10">
                  {coin.icon}
                </span>
                <div>
                  <div className="font-semibold text-gray-900">{coin.name}</div>
                  <div className="text-xs text-gray-500">{coin.volume}</div>
                </div>
              </div>
              <div className="w-32 text-right font-semibold text-gray-900">{coin.price}</div>
              <div className="w-20 text-right">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${coin.change >= 0 ? 'bg-green-600/80 text-white' : 'bg-red-600/80 text-white'}`}>
                  {coin.change >= 0 ? '+' : ''}{coin.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exchange; 