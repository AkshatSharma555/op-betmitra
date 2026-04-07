const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    teamA: {
        type: String,
        required: true,
        trim: true
    },
    teamB: {
        type: String,
        required: true,
        trim: true
    },
    matchDate: {
        type: Date,
        default: Date.now
    },
    investment: {
        type: Number,
        required: true,
        min: 0
    },
    predictions: [
        {
            player: {
                type: String,
                enum: ['Akshat', 'Ketan', 'Vijay', 'Parth', 'Ajinkya'],
                required: true
            },
            predictedWinner: {
                type: String,
                required: true,
                trim: true
            }
        }
    ],
    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED'],
        default: 'PENDING'
    },
    actualWinner: {
        type: String,
        default: null,
        trim: true
    },
    returnAmount: {
        type: Number,
        default: 0,
        min: 0
    },
    profitOrLoss: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);