import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Send = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-2 bg-white">
      <div className="w-full max-w-lg mx-auto p-4 sm:p-6 md:p-8">
        <button className="mb-4 flex items-center justify-start" onClick={() => navigate(-1)}>
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300">
            <ArrowLeft className="h-6 w-6 font-bold text-gray-900" />
          </span>
        </button>
        <h1 className="text-2xl font-bold mb-4">Send</h1>
        <div className="text-center text-gray-500">Send funds feature coming soon.</div>
      </div>
    </div>
  );
};

export default Send; 