import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const quickAmounts = [50, 100, 200, 500, 1000, 2000];

const Recharge = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const walletBalance = location.state?.walletBalance || 0;
  const [amount, setAmount] = useState(location.state?.amount || '');
  const [selected, setSelected] = useState(null);

  const handleQuick = (amt, idx) => {
    setAmount(amt);
    setSelected(idx);
  };

  const handleInput = (e) => {
    setAmount(e.target.value);
    setSelected(null);
  };

  const handleConfirm = () => {
    alert(`Recharged ₹${amount}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-8 pb-20">
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-white/80 hover:bg-white shadow"
        onClick={() => navigate(-1)}
        aria-label="Back"
      >
        <ArrowLeft className="h-6 w-6 text-gray-900" />
      </button>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Recharge</h2>
      <div className="w-full max-w-xl px-4">
        <div className="flex items-center justify-between card px-4 py-3 mb-6">
          <span className="text-gray-500">Your Balance:</span>
          <span className="font-bold text-lg text-gray-900">₹{walletBalance.toLocaleString()}</span>
        </div>
        <input
          type="number"
          value={amount}
          onChange={handleInput}
          className="w-full rounded-lg border border-gray-300 text-lg px-4 py-3 mb-6 focus:outline-none text-gray-900 placeholder-gray-400"
          placeholder="Enter amount"
        />
        <div className="mb-8">
          <div className="font-semibold mb-2 text-gray-900">Amount Money</div>
          <div className="grid grid-cols-3 gap-4">
            {quickAmounts.map((amt, idx) => (
              <button
                key={amt}
                onClick={() => handleQuick(amt, idx)}
                className={`rounded-lg px-0 py-3 font-semibold border-2 card transition ${selected === idx ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-green-400'}`}
              >
                <span className="text-gray-900">₹{amt.toLocaleString()}</span>
              </button>
            ))}
          </div>
        </div>
        <button
          className="w-full py-3 rounded-lg bg-green-500 text-white font-bold text-lg mt-8 hover:bg-green-600 transition"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Recharge; 