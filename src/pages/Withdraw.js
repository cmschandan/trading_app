import React, { useState } from 'react';
import { ArrowLeft, Banknote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Withdraw = ({ availableBalance = 5000, bankName = 'IDBI', bankLast4 = '6019' }) => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();
  const minAmount = 100;
  const maxAmount = availableBalance;
  const isValid = amount && Number(amount) >= minAmount && Number(amount) <= maxAmount;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8 px-2 relative">
      <div className="w-full max-w-md mx-auto pb-32">
        {/* Back Button and Title */}
        <button
          className="mb-4 flex items-center justify-start"
          onClick={() => navigate(-1)}
        >
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300">
            <ArrowLeft className="h-6 w-6 font-bold text-gray-900" />
          </span>
          <span className="ml-2 text-lg font-semibold text-gray-900">Withdraw Funds</span>
        </button>
        {/* Available Balance */}
        <div className="text-center text-gray-500 text-xs mb-1">AVAILABLE BALANCE</div>
        <div className="text-center text-2xl font-bold mb-1">₹{availableBalance}</div>
        <div className="text-center text-gray-400 text-xs mb-6">Zero charges on withdrawal</div>
        {/* Amount Input */}
        <input
          type="number"
          min={minAmount}
          max={maxAmount}
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 text-lg mb-6"
          placeholder="Enter Amount (INR)"
        />
        {/* Withdraw To */}
        <div className="flex items-center justify-between border-t pt-6 mb-8">
          <div>
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">WITHDRAW TO <span title="Bank account where funds will be sent" className="text-gray-400">&#9432;</span></div>
            <div className="text-base font-medium text-gray-900">{bankName} - {bankLast4}</div>
          </div>
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-50 border border-blue-200">
            <Banknote className="h-6 w-6 text-blue-600" />
          </span>
        </div>
      </div>
      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t z-50 flex flex-col items-center pb-4 pt-2">
        <div className="text-center text-xs text-gray-500 mb-2">Processing time upto 72 working hours</div>
        <button
          className={`w-[95%] py-3 rounded-lg font-bold text-lg ${isValid ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          disabled={!isValid}
        >
          Continue to Withdraw
        </button>
      </div>
    </div>
  );
};

export default Withdraw; 