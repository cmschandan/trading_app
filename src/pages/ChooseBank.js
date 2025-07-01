import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const banks = [
  { id: 1, name: 'Global card', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg' },
  { id: 2, name: 'Techcombank', icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Techcombank_logo.svg' },
  { id: 3, name: 'ACB', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ACB_logo.svg' },
  { id: 4, name: 'Five star bank', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Star_icon-72a7cf.svg' },
  { id: 5, name: 'Citibank', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Citibank.svg' },
  { id: 6, name: 'Chasebank', icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Chase_Bank_logo_2007.svg' },
  { id: 7, name: 'Vietinbank', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Logo_VietinBank.svg' },
];

const ChooseBank = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const filteredBanks = banks.filter(bank => bank.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-8 pb-20">
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-white/80 hover:bg-white shadow"
        onClick={() => navigate(-1)}
        aria-label="Back"
      >
        <ArrowLeft className="h-6 w-6 text-gray-900" />
      </button>
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Choose bank</h2>
      <div className="w-full max-w-2xl px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Bank"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none bg-white"
          />
        </div>
      </div>
      <div className="w-full max-w-2xl px-4">
        <div className="rounded-xl overflow-hidden">
          {filteredBanks.map(bank => (
            <div key={bank.id} className="flex items-center px-4 py-4 border-b border-gray-200 card last:rounded-b-xl last:border-b-0 cursor-pointer hover:bg-gray-100 transition">
              <img src={bank.icon} alt={bank.name} className="h-7 w-7 mr-4 rounded-full object-contain bg-white" />
              <span className="font-semibold text-gray-900 text-base">{bank.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseBank; 