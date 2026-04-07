import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import MatchCard from './components/MatchCard';
import StatCard from './components/StatCard';
import Leaderboard from './components/Leaderboard';
import MatchDetailsModal from './components/MatchDetailsModal';
import CreateMatchModal from './components/CreateMatchModal';

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
      const statsRes = await axios.get('http://localhost:5000/api/matches/analytics');
      if (statsRes.data.success) {
        setStats(statsRes.data.data.overview);
        setLeaderboard(statsRes.data.data.leaderboard);
      }

      const matchesRes = await axios.get('http://localhost:5000/api/matches/all');
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

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans relative">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#0B2344]">Dashboard Analytics</h1>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#38BDF8] text-[#0B2344] px-5 py-2.5 rounded-lg font-bold shadow-md hover:bg-sky-300 transition-colors flex items-center gap-2"
          >
            <span className="text-xl leading-none">+</span> New Match
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-xl font-bold text-[#143866] animate-pulse">Loading data...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard title="Total Matches" value={stats.totalMatches} />
              <StatCard title="Total Invested" value={stats.totalInvestment} isCurrency={true} />
              <StatCard title="Total Return" value={stats.totalReturn} isCurrency={true} />
              <StatCard 
                title="Net Profit / Loss" 
                value={stats.netProfitLoss} 
                isCurrency={true} 
                colorClass={stats.netProfitLoss >= 0 ? "text-green-600" : "text-red-600"}
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-2/3">
                <div className="mb-4 border-b border-gray-200 pb-2">
                  <h2 className="text-xl font-bold text-[#143866]">Recent Matches</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="w-full lg:w-1/3">
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