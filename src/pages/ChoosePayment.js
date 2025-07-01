import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Wallet, ArrowLeft } from 'lucide-react';

const ChoosePayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Get amount and wallet balance from location state or use defaults
  const amount = location.state?.amount || 1200;
  const walletBalance = location.state?.walletBalance || 500; // mock

  const handleWallet = () => {
    navigate('/recharge', { state: { amount, walletBalance } });
  };

  const handleCard = () => {
    navigate('/choose-bank', { state: { amount } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-8 pb-20">
      <button
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100"
        onClick={() => navigate(-1)}
        aria-label="Back"
      >
        <ArrowLeft className="h-6 w-6 text-gray-700" />
      </button>
      <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">Choose payment method</h2>
      <div className="text-gray-500 text-center mb-2">you will pay</div>
      <div className="text-green-500 text-4xl font-bold text-center mb-8">₹{amount.toLocaleString()} <span className="text-lg text-green-400 font-medium">INR</span></div>
      <div className="w-full max-w-2xl space-y-6 px-4">
        <button
          className="w-full flex items-center justify-between card p-5 mb-2 text-left hover:bg-gray-100 transition"
          onClick={handleWallet}
        >
          <div>
            <div className="text-gray-500 text-sm mb-1 flex items-center"><Wallet className="h-4 w-4 mr-2" />Wallet transactions</div>
            <div className="font-bold text-lg text-gray-900">Wallet transfer</div>
          </div>
          <div className="font-bold text-lg text-gray-900">₹{amount.toLocaleString()}</div>
        </button>
        <button
          className="w-full flex items-center justify-between card p-5 text-left hover:bg-gray-100 transition"
          onClick={handleCard}
        >
          <div>
            <div className="text-gray-500 text-sm mb-1 flex items-center"><CreditCard className="h-4 w-4 mr-2" />Card/bank account</div>
            <div className="font-bold text-lg text-gray-900">Credit/debit card</div>
          </div>
          <div className="font-bold text-lg text-gray-900">₹{amount.toLocaleString()}</div>
        </button>
      </div>
    </div>
  );
};

export default ChoosePayment; 