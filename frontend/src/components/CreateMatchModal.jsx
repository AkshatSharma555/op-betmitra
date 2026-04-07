import React, { useState } from 'react';
import axios from 'axios';

const IPL_TEAMS = ['CSK', 'DC', 'GT', 'KKR', 'LSG', 'MI', 'PBKS', 'RCB', 'RR', 'SRH'];
const PLAYERS = ['Akshat', 'Ketan', 'Vijay', 'Parth', 'Ajinkya'];

const CreateMatchModal = ({ onClose, onRefresh }) => {
    const [teamA, setTeamA] = useState('');
    const [teamB, setTeamB] = useState('');
    const [investment, setInvestment] = useState('');
    const [predictions, setPredictions] = useState({
        Akshat: '', Ketan: '', Vijay: '', Parth: '', Ajinkya: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePredictionChange = (player, team) => {
        setPredictions(prev => ({ ...prev, [player]: team }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (teamA === teamB) {
            return alert("Team A and Team B cannot be the same!");
        }

        const formattedPredictions = PLAYERS.map(player => ({
            player,
            predictedWinner: predictions[player]
        }));

        const missingPredictions = formattedPredictions.some(p => !p.predictedWinner);
        if (missingPredictions) {
            return alert("Please select predictions for all players!");
        }

        setIsSubmitting(true);
        try {
            await axios.post('https://op-betmitra.onrender.com/api/matches/create', {
                teamA,
                teamB,
                investment: Number(investment),
                predictions: formattedPredictions
            });
            onRefresh();
            onClose();
        } catch (error) {
            console.error(error);
            alert("Error creating match!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-[#0B2344] bg-opacity-70 z-50 flex justify-center items-center p-4 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl relative my-8 animate-[fadeIn_0.2s_ease-out]">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold text-2xl transition-colors z-10">&times;</button>

                <div className="p-6 border-b border-gray-100 bg-[#F5F7FA] rounded-t-2xl">
                    <h2 className="text-xl font-bold text-[#143866]">Create New Match</h2>
                    <p className="text-sm text-gray-500 mt-1">Set up teams, investment, and player predictions.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {/* Match Details Section */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Team A</label>
                            <select required value={teamA} onChange={(e) => setTeamA(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#38BDF8] bg-[#F5F7FA]">
                                <option value="">Select Team</option>
                                {IPL_TEAMS.map(team => <option key={team} value={team}>{team}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Team B</label>
                            <select required value={teamB} onChange={(e) => setTeamB(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#38BDF8] bg-[#F5F7FA]">
                                <option value="">Select Team</option>
                                {IPL_TEAMS.map(team => <option key={team} value={team}>{team}</option>)}
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Total Investment (₹)</label>
                            <input type="number" required value={investment} onChange={(e) => setInvestment(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#38BDF8] bg-[#F5F7FA]" placeholder="Enter amount" />
                        </div>
                    </div>

                    {/* Predictions Section */}
                    <h3 className="font-bold text-[#0B2344] mb-3 border-b border-gray-100 pb-2">Player Predictions</h3>

                    {!teamA || !teamB ? (
                        <p className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">Please select Team A and Team B first.</p>
                    ) : (
                        <div className="space-y-3 mb-6">
                            {PLAYERS.map(player => (
                                <div key={player} className="flex justify-between items-center bg-[#F5F7FA] p-3 rounded-xl border border-gray-200">
                                    <span className="font-bold text-sm text-[#143866] w-1/3">{player}</span>
                                    <div className="flex gap-2 w-2/3 justify-end">
                                        <button
                                            type="button"
                                            onClick={() => handlePredictionChange(player, teamA)}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${predictions[player] === teamA ? 'bg-[#143866] text-white' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            {teamA}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handlePredictionChange(player, teamB)}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${predictions[player] === teamB ? 'bg-[#143866] text-white' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            {teamB}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-3 mt-6">
                        <button type="button" onClick={onClose} className="w-1/3 bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting || !teamA || !teamB} className="w-2/3 bg-[#143866] text-white font-bold py-3 rounded-lg hover:bg-[#0B2344] transition-colors disabled:opacity-50">
                            {isSubmitting ? 'Creating...' : 'Create Match'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMatchModal;