import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IPL_TEAMS = ['CSK', 'DC', 'GT', 'KKR', 'LSG', 'MI', 'PBKS', 'RCB', 'RR', 'SRH'];
const PLAYERS = ['Akshat', 'Ketan', 'Vijay', 'Parth', 'Ajinkya'];

const MatchDetailsModal = ({ match, onClose, onRefresh }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [actualWinner, setActualWinner] = useState('');
    const [returnAmount, setReturnAmount] = useState('');

    const [editData, setEditData] = useState({
        teamA: '',
        teamB: '',
        investment: '',
        status: '',
        actualWinner: '',
        returnAmount: '',
        predictions: {}
    });

    useEffect(() => {
        if (match) {
            const predObj = {};
            match.predictions.forEach(p => {
                predObj[p.player] = p.predictedWinner;
            });

            setEditData({
                teamA: match.teamA,
                teamB: match.teamB,
                investment: match.investment,
                status: match.status,
                actualWinner: match.actualWinner || '',
                returnAmount: match.returnAmount || '',
                predictions: predObj
            });
        }
    }, [match]);

    if (!match) return null;

    const handleResultUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.put(`https://op-betmitra.onrender.com/api/matches/update-result/${match._id}`, {
                actualWinner,
                returnAmount: Number(returnAmount)
            });
            onRefresh();
            onClose();
        } catch (error) {
            alert("Error updating match result!");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFullEditSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formattedPredictions = PLAYERS.map(player => ({
            player,
            predictedWinner: editData.predictions[player]
        }));

        try {
            await axios.put(`https://op-betmitra.onrender.com/api/matches/edit/${match._id}`, {
                teamA: editData.teamA,
                teamB: editData.teamB,
                investment: Number(editData.investment),
                status: editData.status,
                actualWinner: editData.status === 'COMPLETED' ? editData.actualWinner : null,
                returnAmount: editData.status === 'COMPLETED' ? Number(editData.returnAmount) : 0,
                predictions: formattedPredictions
            });
            onRefresh();
            onClose();
        } catch (error) {
            alert("Error saving edits!");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this match?")) {
            try {
                await axios.delete(`https://op-betmitra.onrender.com/api/matches/delete/${match._id}`);
                onRefresh();
                onClose();
            } catch (error) {
                alert("Error deleting match!");
            }
        }
    };

    const handlePredictionChange = (player, team) => {
        setEditData(prev => ({
            ...prev,
            predictions: { ...prev.predictions, [player]: team }
        }));
    };

    return (
        <div className="fixed inset-0 bg-[#0B2344] bg-opacity-70 z-50 flex justify-center items-center p-4 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative my-8 animate-[fadeIn_0.2s_ease-out]">

                <div className="absolute top-4 right-4 flex gap-3 z-10">
                    {!isEditMode && (
                        <>
                            <button onClick={() => setIsEditMode(true)} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-bold hover:bg-blue-200">
                                Edit
                            </button>
                            <button onClick={handleDelete} className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm font-bold hover:bg-red-200">
                                Delete
                            </button>
                        </>
                    )}
                    <button onClick={onClose} className="text-gray-400 hover:text-black font-bold text-xl px-2">&times;</button>
                </div>

                <div className="p-6 border-b border-gray-100 bg-[#F5F7FA] rounded-t-2xl">
                    <h2 className="text-xl font-bold text-[#143866]">{isEditMode ? 'Edit Match Details' : 'Match Details'}</h2>
                </div>

                {isEditMode ? (
                    <form onSubmit={handleFullEditSubmit} className="p-6">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Team A</label>
                                <select value={editData.teamA} onChange={(e) => setEditData({ ...editData, teamA: e.target.value })} className="w-full p-2 border rounded bg-gray-50">
                                    {IPL_TEAMS.map(team => <option key={team} value={team}>{team}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Team B</label>
                                <select value={editData.teamB} onChange={(e) => setEditData({ ...editData, teamB: e.target.value })} className="w-full p-2 border rounded bg-gray-50">
                                    {IPL_TEAMS.map(team => <option key={team} value={team}>{team}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Investment (₹)</label>
                                <input type="number" value={editData.investment} onChange={(e) => setEditData({ ...editData, investment: e.target.value })} className="w-full p-2 border rounded bg-gray-50" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
                                <select value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })} className="w-full p-2 border rounded bg-gray-50">
                                    <option value="PENDING">PENDING</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                </select>
                            </div>
                        </div>

                        {editData.status === 'COMPLETED' && (
                            <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-blue-50 rounded-lg">
                                <div>
                                    <label className="block text-xs font-bold text-[#143866] uppercase mb-1">Actual Winner</label>
                                    <select required value={editData.actualWinner} onChange={(e) => setEditData({ ...editData, actualWinner: e.target.value })} className="w-full p-2 border rounded bg-white">
                                        <option value="">Select Winner</option>
                                        <option value={editData.teamA}>{editData.teamA}</option>
                                        <option value={editData.teamB}>{editData.teamB}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#143866] uppercase mb-1">Return Amount (₹)</label>
                                    <input type="number" required value={editData.returnAmount} onChange={(e) => setEditData({ ...editData, returnAmount: e.target.value })} className="w-full p-2 border rounded bg-white" />
                                </div>
                            </div>
                        )}

                        <h3 className="font-bold text-[#0B2344] mb-2 mt-4 border-b pb-1">Edit Predictions</h3>
                        <div className="space-y-2 mb-6">
                            {PLAYERS.map(player => (
                                <div key={player} className="flex justify-between items-center bg-gray-50 p-2 rounded border">
                                    <span className="font-bold text-sm">{player}</span>
                                    <div className="flex gap-2">
                                        <button type="button" onClick={() => handlePredictionChange(player, editData.teamA)} className={`px-3 py-1 rounded text-xs font-bold ${editData.predictions[player] === editData.teamA ? 'bg-[#143866] text-white' : 'bg-white border'}`}>{editData.teamA}</button>
                                        <button type="button" onClick={() => handlePredictionChange(player, editData.teamB)} className={`px-3 py-1 rounded text-xs font-bold ${editData.predictions[player] === editData.teamB ? 'bg-[#143866] text-white' : 'bg-white border'}`}>{editData.teamB}</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button type="button" onClick={() => setIsEditMode(false)} className="w-1/3 bg-gray-200 font-bold py-2 rounded">Cancel</button>
                            <button type="submit" disabled={isSubmitting} className="w-2/3 bg-[#143866] text-white font-bold py-2 rounded">{isSubmitting ? 'Saving...' : 'Save Changes'}</button>
                        </div>
                    </form>
                ) : (
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex flex-col items-center w-1/3">
                                <img src={`/logos/${match.teamA}.png`} alt={match.teamA} className="w-16 h-16 object-contain" />
                                <span className="font-bold text-[#143866] mt-2">{match.teamA}</span>
                            </div>
                            <span className="bg-[#143866] text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">VS</span>
                            <div className="flex flex-col items-center w-1/3">
                                <img src={`/logos/${match.teamB}.png`} alt={match.teamB} className="w-16 h-16 object-contain" />
                                <span className="font-bold text-[#143866] mt-2">{match.teamB}</span>
                            </div>
                        </div>

                        <h3 className="font-bold text-[#0B2344] mb-3 border-b border-gray-100 pb-2">Player Predictions</h3>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {match.predictions.map((p) => (
                                <div key={p._id} className="bg-[#F5F7FA] p-3 rounded-xl border border-gray-200 flex justify-between items-center">
                                    <span className="font-bold text-sm text-[#143866]">{p.player}</span>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${match.status === 'COMPLETED'
                                            ? (p.predictedWinner === match.actualWinner ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')
                                            : 'bg-blue-100 text-[#143866]'
                                        }`}>
                                        {p.predictedWinner}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {match.status === 'PENDING' ? (
                            <form onSubmit={handleResultUpdate} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-[#143866] mb-3">Update Match Result</h3>
                                <div className="mb-3">
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Actual Winner</label>
                                    <select required value={actualWinner} onChange={(e) => setActualWinner(e.target.value)} className="w-full p-2.5 border rounded bg-[#F5F7FA]">
                                        <option value="">Select Winner</option>
                                        <option value={match.teamA}>{match.teamA}</option>
                                        <option value={match.teamB}>{match.teamB}</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Return Amount (₹)</label>
                                    <input type="number" required value={returnAmount} onChange={(e) => setReturnAmount(e.target.value)} className="w-full p-2.5 border rounded bg-[#F5F7FA]" />
                                </div>
                                <button type="submit" disabled={isSubmitting} className="w-full bg-[#143866] text-white font-bold py-3 rounded">
                                    {isSubmitting ? 'Updating...' : 'Submit Result'}
                                </button>
                            </form>
                        ) : (
                            <div className="bg-[#F5F7FA] p-4 rounded-xl border border-gray-200 flex justify-between items-center">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">Match Winner</p>
                                    <p className="font-bold text-[#143866] text-lg">{match.actualWinner}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">Net P/L</p>
                                    <p className={`font-bold text-xl ${match.profitOrLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {match.profitOrLoss >= 0 ? '+' : ''}₹{match.profitOrLoss}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatchDetailsModal;