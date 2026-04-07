const Match = require('../models/Match');

exports.createMatch = async (req, res) => {
    try {
        const { teamA, teamB, investment, predictions } = req.body;

        if (!teamA || !teamB || investment === undefined || !predictions) {
            return res.status(400).json({
                success: false,
                message: "Please provide teamA, teamB, investment, and predictions"
            });
        }

        const newMatch = await Match.create({
            teamA,
            teamB,
            investment,
            predictions
        });

        return res.status(201).json({
            success: true,
            data: newMatch
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

exports.updateMatchResult = async (req, res) => {
    try {
        const { matchId } = req.params;
        const { actualWinner, returnAmount } = req.body;

        if (!actualWinner || returnAmount === undefined) {
            return res.status(400).json({
                success: false,
                message: "Please provide actualWinner and returnAmount"
            });
        }

        const match = await Match.findById(matchId);

        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Match not found"
            });
        }

        const profitOrLoss = returnAmount - match.investment;

        match.actualWinner = actualWinner;
        match.returnAmount = returnAmount;
        match.profitOrLoss = profitOrLoss;
        match.status = 'COMPLETED';

        await match.save();

        return res.status(200).json({
            success: true,
            data: match
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

exports.fullEditMatch = async (req, res) => {
    try {
        const { matchId } = req.params;
        const updateData = req.body;

        const match = await Match.findById(matchId);

        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Match not found"
            });
        }

        if (updateData.status === 'COMPLETED' || updateData.actualWinner) {
            const currentInvestment = updateData.investment !== undefined ? updateData.investment : match.investment;
            const currentReturn = updateData.returnAmount !== undefined ? updateData.returnAmount : match.returnAmount;
            
            updateData.profitOrLoss = currentReturn - currentInvestment;
            updateData.status = 'COMPLETED';
        } else if (updateData.status === 'PENDING') {
            updateData.actualWinner = null;
            updateData.returnAmount = 0;
            updateData.profitOrLoss = 0;
        }

        const updatedMatch = await Match.findByIdAndUpdate(
            matchId, 
            updateData, 
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            data: updatedMatch
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

exports.getAllMatches = async (req, res) => {
    try {
        const matches = await Match.find({ isDeleted: false }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: matches.length,
            data: matches
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

exports.deleteMatch = async (req, res) => {
    try {
        const { matchId } = req.params;

        const match = await Match.findByIdAndUpdate(
            matchId, 
            { isDeleted: true }, 
            { new: true }
        );

        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Match not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Match soft deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const matches = await Match.find({ isDeleted: false, status: 'COMPLETED' });

        let totalInvestment = 0;
        let totalReturn = 0;
        let netProfitLoss = 0;
        let totalMatches = matches.length;

        const playerStats = {
            Akshat: { correct: 0, wrong: 0, total: 0 },
            Ketan: { correct: 0, wrong: 0, total: 0 },
            Vijay: { correct: 0, wrong: 0, total: 0 },
            Parth: { correct: 0, wrong: 0, total: 0 },
            Ajinkya: { correct: 0, wrong: 0, total: 0 }
        };

        matches.forEach(match => {
            totalInvestment += match.investment;
            totalReturn += match.returnAmount;
            netProfitLoss += match.profitOrLoss;

            match.predictions.forEach(p => {
                if (playerStats[p.player]) {
                    playerStats[p.player].total += 1;
                    if (p.predictedWinner === match.actualWinner) {
                        playerStats[p.player].correct += 1;
                    } else {
                        playerStats[p.player].wrong += 1;
                    }
                }
            });
        });

        const leaderboard = Object.keys(playerStats).map(player => {
            const stats = playerStats[player];
            const accuracy = stats.total > 0 ? ((stats.correct / stats.total) * 100).toFixed(2) : 0;
            return {
                player,
                ...stats,
                accuracy: parseFloat(accuracy)
            };
        }).sort((a, b) => b.accuracy - a.accuracy);

        return res.status(200).json({
            success: true,
            data: {
                overview: {
                    totalMatches,
                    totalInvestment,
                    totalReturn,
                    netProfitLoss
                },
                leaderboard
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};