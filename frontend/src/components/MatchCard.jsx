import React from 'react';
import SpotlightCard from './SpotlightCard';

const MatchCard = ({ matchData, onClick }) => {
  const { teamA, teamB, investment, status, profitOrLoss } = matchData;

  // Decimal fix: Rounds to max 2 decimal places and removes trailing zeros
  const formattedProfit = profitOrLoss ? parseFloat(profitOrLoss.toFixed(2)) : 0;

  return (
    <div onClick={onClick} className="cursor-pointer transition-transform hover:-translate-y-1 duration-300 h-full">
      <SpotlightCard className="w-full h-full p-4 md:p-6 flex flex-col justify-between">
        
        {/* Teams Section */}
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <div className="flex flex-col items-center w-1/3">
            <img 
              src={`/logos/${teamA}.png`} 
              alt={teamA} 
              className="w-10 h-10 md:w-14 md:h-14 object-contain mb-2 drop-shadow-sm" 
            />
            <span className="font-bold text-[#143866] text-sm md:text-base">{teamA}</span>
          </div>

          <div className="flex flex-col items-center justify-center w-1/3">
            <span className="bg-gray-50 text-gray-400 border border-gray-100 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-extrabold tracking-widest">
              VS
            </span>
          </div>

          <div className="flex flex-col items-center w-1/3">
            <img 
              src={`/logos/${teamB}.png`} 
              alt={teamB} 
              className="w-10 h-10 md:w-14 md:h-14 object-contain mb-2 drop-shadow-sm" 
            />
            <span className="font-bold text-[#143866] text-sm md:text-base">{teamB}</span>
          </div>
        </div>

        {/* Details Section */}
        <div className="border-t border-gray-100 pt-3 md:pt-4 flex justify-between items-center mt-auto">
          <div>
            <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-bold mb-0.5">Investment</p>
            <p className="font-extrabold text-[#0B2344] text-sm md:text-base">₹{investment}</p>
          </div>
          
          <div className="text-right">
            <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-bold mb-0.5">
              {status === 'COMPLETED' ? 'Net P/L' : 'Status'}
            </p>
            {status === 'COMPLETED' ? (
              <span className={`font-extrabold text-sm md:text-base ${formattedProfit >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {formattedProfit >= 0 ? '+' : ''}₹{formattedProfit}
              </span>
            ) : (
              <span className="inline-block font-extrabold text-[10px] md:text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">
                PENDING
              </span>
            )}
          </div>
        </div>

      </SpotlightCard>
    </div>
  );
};

export default MatchCard;