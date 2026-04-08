import React from 'react';

const Leaderboard = ({ leaderboardData }) => {
  return (
    <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
      <h2 className="text-xl font-bold text-[#143866] mb-4 border-b border-gray-100 pb-2">Top Predictors</h2>
      
      <div className="space-y-3">
        {leaderboardData.map((player, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-xl border border-gray-100 transition-transform hover:scale-[1.02] duration-200"
          >
            {/* Player Info & Rank */}
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 flex shrink-0 items-center justify-center rounded-full font-bold shadow-sm ${
                index === 0 ? 'bg-yellow-400 text-yellow-900' : 
                index === 1 ? 'bg-gray-300 text-gray-800' : 
                index === 2 ? 'bg-orange-300 text-orange-900' : 
                'bg-white text-[#143866] border border-gray-200'
              }`}>
                {index + 1}
              </div>
              
              <div>
                <p className="font-bold text-[#0B2344] text-sm md:text-base">{player.player}</p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">{player.correct} Won - {player.wrong} Lost</p>
              </div>
            </div>
            
            {/* Accuracy */}
            <div className="text-right">
              <p className={`font-bold text-lg ${player.accuracy >= 50 ? 'text-green-600' : 'text-red-600'}`}>
                {player.accuracy}%
              </p>
              <p className="text-[10px] uppercase text-gray-400 tracking-wider font-bold">Accuracy</p>
            </div>
          </div>
        ))}

        {leaderboardData.length === 0 && (
          <p className="text-center text-gray-500 text-sm py-4">No data available yet.</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;