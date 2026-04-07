import React from 'react';
import SpotlightCard from './SpotlightCard';

const MatchCard = ({ matchData, onClick }) => {
  const { teamA, teamB, investment, status, profitOrLoss } = matchData;

  return (
    <div onClick={onClick} className="cursor-pointer transition-transform hover:-translate-y-1 duration-300">
      <SpotlightCard className="w-full h-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col items-center w-1/3">
            <img src={`/logos/${teamA}.png`} alt={teamA} className="w-16 h-16 object-contain mb-2" />
            <span className="font-bold text-[#143866] text-lg">{teamA}</span>
          </div>

          <div className="flex flex-col items-center justify-center w-1/3">
            <span className="bg-[#F5F7FA] text-[#0B2344] px-3 py-1 rounded-full text-xs font-bold tracking-wider">VS</span>
          </div>

          <div className="flex flex-col items-center w-1/3">
            <img src={`/logos/${teamB}.png`} alt={teamB} className="w-16 h-16 object-contain mb-2" />
            <span className="font-bold text-[#143866] text-lg">{teamB}</span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Investment</p>
            <p className="font-bold text-[#143866]">₹{investment}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status</p>
            <span className={`font-bold ${status === 'COMPLETED' ? (profitOrLoss >= 0 ? 'text-green-600' : 'text-red-600') : 'text-yellow-600'}`}>
              {status}
            </span>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};

export default MatchCard;