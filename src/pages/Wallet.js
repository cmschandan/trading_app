import React, { useState } from 'react';
import { ChevronDown, Star, Bell, MoreVertical, ArrowUpRight, ArrowDownRight, BarChart2, FileText, BookOpen, TrendingUp, ArrowRightLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const marginTabs = ['INR Margin', 'USDT Margin', 'Options'];
const chartTabs = ['Chart', 'Stats', 'Trades'];
const tradeTypes = ['Long', 'Short'];
const leverageOptions = ['10x', '20x', '50x'];
const marketTypes = ['Market', 'Limit', 'Stop'];

const optionSlides = [
  {
    title: 'Crypto Options',
    subtitle: 'COMING SOON',
    features: ['Trade directly with INR', 'Advanced Options chain'],
    img: 'https://dummyimage.com/300x200/eee/333&text=Options+Chain',
    caption: 'See how options work'
  },
  {
    title: 'Trade with lot sizes as low as ₹100',
    features: ['Lowest fees', 'Instant settlement'],
    img: 'https://dummyimage.com/300x200/eee/333&text=Lot+Size',
    caption: 'Trade with small lots'
  },
  {
    title: 'Trade 24×7 with multiple expiries',
    features: ['Daily, weekly, monthly expiries', 'BTC, ETH & SOL'],
    img: 'https://dummyimage.com/300x200/eee/333&text=Expiries',
    caption: 'Multiple expiry options'
  }
];

const FNO = () => {
  const [marginTab, setMarginTab] = useState(0);
  const [chartTab, setChartTab] = useState(0);
  const [tradeType, setTradeType] = useState('Long');
  const [leverage, setLeverage] = useState('10x');
  const [marketType, setMarketType] = useState('Market');
  const [optionSlide, setOptionSlide] = useState(0);
  const [joinedWaitlist, setJoinedWaitlist] = useState(false); // Simulate user waitlist status
  const navigate = useNavigate();

  // Chart content for INR/USDT Margin
  const renderChartArea = () => (
    <div className="h-64 flex items-center justify-center bg-gray-50">
      <BarChart2 className="h-24 w-24 text-blue-200" />
      <span className="ml-4 text-gray-400">TradingView Chart Placeholder ({marginTabs[marginTab]})</span>
    </div>
  );

  // Options tab content
  const renderOptionsView = () => (
    <div className="bg-white flex flex-col items-center py-8 px-2">
      {/* Text above image, updates with slide */}
      <div className="w-full max-w-md mx-auto mb-6">
        <h2 className="text-2xl font-bold text-center mb-2 flex items-center justify-center">
          {optionSlides[optionSlide].title}
          {optionSlides[optionSlide].subtitle && (
            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded font-semibold">{optionSlides[optionSlide].subtitle}</span>
          )}
        </h2>
        <div className="flex flex-col items-center gap-1 mb-2">
          {optionSlides[optionSlide].features.map((f, i) => (
            <span key={i} className="flex items-center text-base text-gray-700"><span className="mr-1">✨</span>{f}</span>
          ))}
        </div>
        <div className="text-gray-500 text-center mb-2">{optionSlides[optionSlide].caption}</div>
      </div>
      {/* Single image, not horizontally scrollable on mobile */}
      <div className="w-full max-w-md mx-auto relative mb-6">
        <div className="overflow-hidden rounded-2xl shadow-lg bg-gray-50 flex items-center justify-center">
          <img
            src={optionSlides[optionSlide].img}
            alt="Options Slide"
            className="w-full"
            style={{ height: '340px', objectFit: 'cover', borderRadius: '1rem' }}
          />
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {optionSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setOptionSlide(idx)}
              className={`w-3 h-3 rounded-full ${optionSlide === idx ? 'bg-blue-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
      {/* Waitlist always below image */}
      <div className="w-full max-w-xs mx-auto">
        {!joinedWaitlist ? (
          <>
            <div className="text-gray-500 text-center mb-4">Get early access by joining the waitlist</div>
            <button className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold text-lg" onClick={() => setJoinedWaitlist(true)}>Join Waitlist</button>
          </>
        ) : (
          <div className="w-full py-3 rounded-lg bg-green-100 text-green-700 font-bold text-lg text-center">You are on the waitlist!</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Margin Tabs */}
      <div className="flex items-center border-b border-gray-200 bg-white px-4 pt-4 overflow-x-auto whitespace-nowrap">
        {marginTabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setMarginTab(idx)}
            className={`mr-6 pb-2 text-lg font-semibold border-b-2 ${marginTab === idx ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500'}`}
            style={{ minWidth: 'auto' }}
          >
            {tab}
          </button>
        ))}
        <div className="ml-auto flex items-center space-x-2">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Pair, Price, Actions */}
      {marginTab !== 2 && (
        <div className="flex items-center px-4 py-3 bg-white border-b border-gray-100">
          <div className="flex items-center mr-4">
            <span className="bg-yellow-100 text-yellow-700 rounded-full px-2 py-1 text-xs font-bold mr-2">BTC</span>
            <span className="text-gray-700 font-semibold">• USDT</span>
          </div>
          <div className="flex-1">
            <div className="text-xl font-bold text-gray-900">1,08,004.0 <span className="text-red-500 text-base font-medium">(-2.21%)</span></div>
            <div className="text-xs text-gray-400">≈ ₹1,00,44,372</div>
          </div>
          <Star className="h-5 w-5 text-gray-400 mr-3" />
          <Bell className="h-5 w-5 text-gray-400 mr-3" />
          <MoreVertical className="h-5 w-5 text-gray-400" />
        </div>
      )}

      {/* Main Content: Chart or Options */}
      {marginTab === 2 ? (
        renderOptionsView()
      ) : (
        <>
          {/* Chart Tabs */}
          <div className="bg-white">
            <div className="flex items-center px-4 pt-2 border-b border-gray-100">
              {chartTabs.map((tab, idx) => (
                <button
                  key={tab}
                  onClick={() => setChartTab(idx)}
                  className={`mr-6 pb-2 text-base font-semibold border-b-2 ${chartTab === idx ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500'}`}
                >
                  {tab}
                </button>
              ))}
              <div className="ml-auto flex items-center space-x-2">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            {/* Chart Area (switches for INR/USDT Margin) */}
            {renderChartArea()}
          </div>

          {/* Trade Controls */}
          <div className="bg-white px-4 py-4 border-b border-gray-100">
            <div className="flex items-center mb-4">
              <div className="flex border rounded-lg overflow-hidden mr-4">
                {tradeTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setTradeType(type)}
                    className={`px-6 py-2 font-semibold ${tradeType === type ? (type === 'Long' ? 'text-green-600 border-b-2 border-green-500 bg-green-50' : 'text-red-600 border-b-2 border-red-500 bg-red-50') : 'text-gray-500 bg-white'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <select
                value={leverage}
                onChange={e => setLeverage(e.target.value)}
                className="border rounded px-2 py-1 text-sm mr-4"
              >
                {leverageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <select
                value={marketType}
                onChange={e => setMarketType(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                {marketTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Market Price"
                className="w-full border rounded-lg px-4 py-2 text-lg"
              />
            </div>
            <button className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold text-lg mt-2">Place Order</button>
          </div>

          {/* Add funds notice */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
            <span className="text-gray-700">Add <span className="text-green-600 font-bold">₹2100</span> to start trading</span>
            <button className="text-blue-600 font-semibold flex items-center" onClick={() => navigate('/withdraw')}>Withdraw</button>
          </div>
        </>
      )}
    </div>
  );
};

export default FNO; 