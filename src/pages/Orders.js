import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockOrders = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  type: i % 2 === 0 ? 'Buy' : 'Sell',
  coin: ['BNB', 'SOL', 'ADA', 'BTC', 'ETH'][i % 5],
  amount: (Math.random() * 2).toFixed(3),
  value: `₹${(Math.random() * 9000 + 1500).toFixed(2)}`,
  time: `${i + 3} days ago`,
}));

const Orders = () => {
  const [tab, setTab] = useState('pending');
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-2 bg-gray-50">
      <div className="w-full max-w-xl mx-auto p-4 sm:p-6 md:p-8">
        <button className="mb-4 flex items-center justify-start" onClick={() => navigate(-1)}>
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300">
            <ArrowLeft className="h-6 w-6 font-bold text-gray-900" />
          </span>
        </button>
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <div className="flex mb-4 border-b border-gray-200">
          <button onClick={() => setTab('pending')} className={`flex-1 py-2 font-semibold focus:outline-none transition-colors ${tab === 'pending' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Pending</button>
          <button onClick={() => setTab('history')} className={`flex-1 py-2 font-semibold focus:outline-none transition-colors ${tab === 'history' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>History</button>
        </div>
        {tab === 'pending' ? (
          <div className="flex flex-col items-center justify-center mt-12">
            <div className="text-gray-500 mb-4">You don't have any open order</div>
            <button className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold" onClick={() => navigate('/coins')}>Go to Coins</button>
          </div>
        ) : (
          <div className="h-[70vh] overflow-y-auto flex flex-col gap-4 bg-white rounded-xl shadow border border-gray-100 p-2 md:p-4">
            {mockOrders.map(order => (
              <div key={order.id} className="p-4 rounded-lg bg-gray-50 flex items-center justify-between shadow-sm border border-gray-100">
                <div>
                  <div className="font-semibold text-gray-900">{order.type} {order.amount} {order.coin}</div>
                  <div className="text-xs text-gray-500">{order.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-blue-700">{order.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders; 