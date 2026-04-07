import React from 'react';

const StatCard = ({ title, value, isCurrency = false, colorClass = "text-[#143866]" }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300">
      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">{title}</p>
      <h3 className={`text-3xl font-bold ${colorClass}`}>
        {isCurrency ? '₹' : ''}{value}
      </h3>
    </div>
  );
};

export default StatCard;