import React, { useState } from 'react';
import { Plus, Download, Send, Wallet, FileText, Globe, TrendingUp, BarChart3, ArrowDownUp, ArrowRightLeft } from 'lucide-react';

const products = [
  { name: 'Coins', icon: ArrowDownUp, value: 267, change: -3.54, changeType: 'negative' },
  { name: 'Futures', icon: FileText, value: 0 },
  { name: 'Funds', icon: Wallet, value: 3 },
  { name: 'Earn', icon: TrendingUp },
  { name: 'Web3', icon: Globe },
  { name: 'Tax Reports', icon: FileText, isTax: true },
];

const Portfolio = () => {
  const [currency, setCurrency] = useState('INR');
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 rounded-b-3xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Overview</h1>
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm opacity-80">Portfolio value</span>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className="bg-transparent text-white font-semibold border-none focus:ring-0 text-sm"
            >
              <option value="INR">INR</option>
              <option value="USDT">USDT</option>
              <option value="BTC">BTC</option>
            </select>
          </div>
        </div>
        <div className="flex items-center mb-6">
          <span className="text-3xl font-bold text-white mr-2">₹271</span>
        </div>
        <div className="flex gap-3 mb-2">
          <button className="flex-1 flex items-center justify-center py-2 rounded-lg bg-white text-blue-700 font-semibold shadow hover:bg-blue-50">
            <Plus className="h-5 w-5 mr-2" /> Add INR
          </button>
          <button className="flex-1 flex items-center justify-center py-2 rounded-lg bg-white text-blue-700 font-semibold shadow hover:bg-blue-50">
            <Download className="h-5 w-5 mr-2" /> Deposit Crypto
          </button>
          <button className="flex-1 flex items-center justify-center py-2 rounded-lg bg-white text-blue-700 font-semibold shadow hover:bg-blue-50">
            <Send className="h-5 w-5 mr-2" /> Transfer
          </button>
        </div>
      </div>
      <div className="px-4 mt-6">
        <h2 className="text-gray-500 font-semibold mb-2">Products</h2>
        <div className="divide-y divide-gray-200 bg-white rounded-xl shadow">
          {products.map((product, idx) => (
            <div key={product.name} className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <product.icon className="h-5 w-5 text-gray-700" />
                </div>
                <span className="font-medium text-gray-900">{product.name}</span>
              </div>
              {product.isTax ? (
                <span className="flex items-center text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                  <FileText className="h-4 w-4 mr-1" /> Tax Reports
                </span>
              ) : product.value !== undefined ? (
                <div className="text-right">
                  <span className="font-semibold text-gray-900">₹{product.value}</span>
                  {product.change !== undefined && (
                    <span className={`ml-2 text-xs font-semibold ${product.changeType === 'negative' ? 'text-red-500' : 'text-green-500'}`}>
                      Today {product.change > 0 ? '+' : ''}{product.change} ({product.changeType === 'negative' ? '-' : '+'}{Math.abs(product.change / product.value * 100).toFixed(1)}%)
                    </span>
                  )}
                </div>
              ) : (
                <ArrowRightLeft className="h-5 w-5 text-gray-400" />
              )}
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-400 mt-6">
          Your investment returns may be indicative. Total portfolio value excludes Web3 assets. INR funds reflect your total value. <a href="#" className="underline">Know more</a>
        </div>
      </div>
    </div>
  );
};

export default Portfolio; 