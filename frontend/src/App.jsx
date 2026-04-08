import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import MatchCard from './components/MatchCard';
import StatCard from './components/StatCard';
import Leaderboard from './components/Leaderboard';
import MatchDetailsModal from './components/MatchDetailsModal';
import CreateMatchModal from './components/CreateMatchModal';
import { API_URL } from './config'; 

// --- WALLET CONSTANTS ---
const INITIAL_DEPOSIT = 300;
const TOTAL_PLAYERS = 5;

function App() {
  const [matches, setMatches] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [stats, setStats] = useState({
    totalMatches: 0,
    totalInvestment: 0,
    totalReturn: 0,
    netProfitLoss: 0
  });
  const [loading, setLoading] = useState(true);
  
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchAllData = async () => {
    try {
      const statsRes = await axios.get(`${API_URL}/api/matches/analytics`);
      if (statsRes.data.success) {
        setStats(statsRes.data.data.overview);
        setLeaderboard(statsRes.data.data.leaderboard);
      }

      const matchesRes = await axios.get(`${API_URL}/api/matches/all`);
      if (matchesRes.data.success) {
        setMatches(matchesRes.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleCardClick = (match) => {
    setSelectedMatch(match);
    setIsDetailsModalOpen(true);
  };

  // --- EXACT MATH CALCULATIONS ---
  const totalNetProfit = Math.round(stats.netProfitLoss);
  const currentWalletBalance = INITIAL_DEPOSIT + totalNetProfit;
  const perPersonShare = Math.round(currentWalletBalance / TOTAL_PLAYERS);

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans relative">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-[#0B2344]">Dashboard Analytics</h1>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#38BDF8] text-[#0B2344] px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-bold shadow-md hover:bg-sky-300 transition-colors flex items-center gap-2 text-sm md:text-base"
          >
            <span className="text-lg md:text-xl leading-none">+</span> New Match
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-xl font-bold text-[#143866] animate-pulse">Loading data...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
              <StatCard title="Wallet Balance" value={currentWalletBalance} isCurrency={true} />
              <StatCard 
                title="Net Profit" 
                value={totalNetProfit} 
                isCurrency={true} 
                colorClass={totalNetProfit >= 0 ? "text-green-600" : "text-red-600"}
              />
              <StatCard title="Total Matches" value={stats.totalMatches} />
              <StatCard 
                title="Per Person Share" 
                value={perPersonShare} 
                isCurrency={true} 
                colorClass="text-[#38BDF8]"
              />
            </div>

            {/* Smart Flex Layout: Uses order classes for responsive placement */}
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Matches - order-2 (Bottom on Mobile) | lg:order-1 (Left on PC) */}
              <div className="w-full lg:w-2/3 order-2 lg:order-1">
                <div className="mb-4 border-b border-gray-200 pb-2">
                  <h2 className="text-lg md:text-xl font-bold text-[#143866]">Recent Matches</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {matches.length > 0 ? (
                    matches.map((match) => (
                      <MatchCard 
                        key={match._id} 
                        matchData={match} 
                        onClick={() => handleCardClick(match)} 
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-full text-center py-10 bg-white rounded-xl border border-gray-200 shadow-sm">
                      No matches found. Create one to get started!
                    </p>
                  )}
                </div>
              </div>

              {/* Leaderboard - order-1 (Top on Mobile) | lg:order-2 (Right on PC) */}
              <div className="w-full lg:w-1/3 order-1 lg:order-2 mb-2 lg:mb-0">
                <Leaderboard leaderboardData={leaderboard} />
              </div>

            </div>
          </>
        )}
      </main>

      {/* Modals */}
      {isDetailsModalOpen && (
        <MatchDetailsModal 
          match={selectedMatch} 
          onClose={() => setIsDetailsModalOpen(false)} 
          onRefresh={fetchAllData} 
        />
      )}

      {isCreateModalOpen && (
        <CreateMatchModal 
          onClose={() => setIsCreateModalOpen(false)} 
          onRefresh={fetchAllData} 
        />
      )}
    </div>
  );
}

export default App;