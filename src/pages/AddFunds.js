import React, { useState } from 'react';
import { Banknote, CreditCard, Download, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const upiIcons = {
  GPay: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Google_Pay_2018_icon.svg/512px-Google_Pay_2018_icon.svg.png?20250522030600',
  PhonePe: 'https://w7.pngwing.com/pngs/332/615/png-transparent-phonepe-india-unified-payments-interface-india-purple-violet-text.png',
  AmazonPay: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Font_Awesome_5_brands_cc-amazon-pay.svg/640px-Font_Awesome_5_brands_cc-amazon-pay.svg.png',
};

const suggestedAmounts = [1000, 2000, 3000];

const AddFunds = ({ availableBalance = 3.86 }) => {
  const [step, setStep] = useState(1);
  const [addAmount, setAddAmount] = useState('1000');
  const [payMethod, setPayMethod] = useState('UPI');
  const [upiApp, setUpiApp] = useState('GPay');
  const navigate = useNavigate();
  const minAmount = 100;
  const maxAmount = 500000;
  const isValid = addAmount && Number(addAmount) >= minAmount && Number(addAmount) <= maxAmount;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-2 relative">
      <div className="w-full max-w-md mx-auto pb-32">
        <button
          className="mb-4 flex items-center justify-start"
          onClick={() => {
            if (step === 2) setStep(1);
            else navigate('/dashboard');
          }}
        >
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300">
            <ArrowLeft className="h-6 w-6 font-bold text-gray-900" />
          </span>
        </button>
        {step === 1 && (
          <>
            <div className="text-center text-gray-500 text-xs mb-1">AVAILABLE BALANCE</div>
            <div className="text-center text-2xl font-bold mb-4">₹{availableBalance}</div>
            <label className="block text-gray-700 mb-1">Enter Amount (INR)</label>
            <input
              type="number"
              min={minAmount}
              max={maxAmount}
              value={addAmount}
              onChange={e => setAddAmount(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-lg mb-2"
              placeholder="1,000"
            />
            <div className="text-right text-xs text-gray-400 mb-2">Min. ₹100 - Max. ₹5L</div>
            <div className="flex gap-2 mb-4">
              {suggestedAmounts.map(a => (
                <button key={a} className="px-4 py-2 rounded-full border border-blue-200 text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100" onClick={() => setAddAmount(a.toString())}>+ ₹{a.toLocaleString()}</button>
              ))}
            </div>
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">Pay via</div>
              <div className="flex gap-2">
                <button onClick={() => setPayMethod('UPI')} className={`flex-1 py-2 rounded-lg border ${payMethod === 'UPI' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-700'}`}><Banknote className="h-4 w-4 inline mr-1" /> UPI</button>
                <button onClick={() => setPayMethod('Card')} className={`flex-1 py-2 rounded-lg border ${payMethod === 'Card' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-700'}`}><CreditCard className="h-4 w-4 inline mr-1" /> Card</button>
                <button onClick={() => setPayMethod('Bank')} className={`flex-1 py-2 rounded-lg border ${payMethod === 'Bank' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-700'}`}><Download className="h-4 w-4 inline mr-1" /> Bank</button>
              </div>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-4">{payMethod === 'UPI' ? 'Pay Using UPI Apps' : payMethod === 'Card' ? 'Pay Using Card' : 'Pay Using Bank'}</h2>
            <div className="bg-blue-900 text-white rounded-xl p-4 flex items-center justify-between mb-4">
              <div>
                <div className="text-xs opacity-80 mb-1">AMOUNT IN RUPEES</div>
                <div className="text-xl font-bold">₹{addAmount}</div>
                <div className="text-xs mt-2">PAY ONLY VIA IDBI <span className="font-mono">6019</span></div>
              </div>
              <div className="flex items-center justify-center h-10 w-10 bg-white bg-opacity-20 rounded-full">
                <Banknote className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-xs text-yellow-700 bg-yellow-100 rounded px-2 py-1 mb-4">Funds transferred from non-registered bank account will be refunded in 15 days.</div>
            {payMethod === 'UPI' && (
              <>
                <div className="mb-2 text-sm font-semibold">Select UPI app</div>
                <div className="flex flex-col gap-2 mb-4">
                  {['GPay', 'PhonePe', 'AmazonPay'].map(app => (
                    <label key={app} className="flex items-center p-3 border rounded-lg cursor-pointer">
                      <input type="radio" name="upiApp" value={app} checked={upiApp === app} onChange={() => setUpiApp(app)} className="mr-2" />
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white border mr-2">
                        <img 
                          src={upiIcons[app]} 
                          alt={app} 
                          className="h-6 w-6 object-contain"
                          onError={e => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentNode.textContent = app === 'AmazonPay' ? 'A' : app[0]; }}
                        />
                      </span>
                      {app === 'AmazonPay' ? 'Amazon Pay' : app}
                    </label>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t z-50 flex flex-col items-center pb-4 pt-2">
        {step === 1 && (
          <button
            className={`w-[95%] py-3 rounded-lg font-bold text-lg ${isValid ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            disabled={!isValid}
            onClick={() => isValid && setStep(2)}
          >
            Continue to Pay
          </button>
        )}
        {step === 2 && (
          <button className="w-[95%] py-3 rounded-lg font-bold text-lg bg-blue-600 text-white">
            {payMethod === 'UPI' ? `Pay via ${upiApp === 'AmazonPay' ? 'Amazon Pay' : upiApp}` : payMethod === 'Card' ? 'Pay via Card' : 'Pay via Bank'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AddFunds; 