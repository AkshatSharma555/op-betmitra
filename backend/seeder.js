require('dotenv').config();
const mongoose = require('mongoose');
const Match = require('./models/Match');

// Exact mappings from your screenshots to hit exactly +545 Net Profit
const matches = [
  { teamA: "RR", teamB: "CSK", investment: 50, returnAmount: 0, status: "COMPLETED", actualWinner: "RR", predictions: [ {player: "Akshat", predictedWinner: "RR"}, {player: "Ketan", predictedWinner: "RR"}, {player: "Parth", predictedWinner: "CSK"}, {player: "Vijay", predictedWinner: "CSK"}, {player: "Ajinkya", predictedWinner: "CSK"} ]}, // Lost
  { teamA: "LSG", teamB: "DC", investment: 50, returnAmount: 98.8, status: "COMPLETED", actualWinner: "DC", predictions: [ {player: "Akshat", predictedWinner: "DC"}, {player: "Ketan", predictedWinner: "DC"}, {player: "Parth", predictedWinner: "DC"}, {player: "Vijay", predictedWinner: "DC"}, {player: "Ajinkya", predictedWinner: "DC"} ]},
  { teamA: "KKR", teamB: "SRH", investment: 50, returnAmount: 0, status: "COMPLETED", actualWinner: "SRH", predictions: [ {player: "Akshat", predictedWinner: "KKR"}, {player: "Ketan", predictedWinner: "KKR"}, {player: "Parth", predictedWinner: "KKR"}, {player: "Vijay", predictedWinner: "KKR"}, {player: "Ajinkya", predictedWinner: "KKR"} ]}, // Lost
  { teamA: "CSK", teamB: "PBKS", investment: 150, returnAmount: 270.9, status: "COMPLETED", actualWinner: "PBKS", predictions: [ {player: "Akshat", predictedWinner: "PBKS"}, {player: "Ketan", predictedWinner: "PBKS"}, {player: "Parth", predictedWinner: "PBKS"}, {player: "Vijay", predictedWinner: "PBKS"}, {player: "Ajinkya", predictedWinner: "PBKS"} ]},
  { teamA: "DC", teamB: "MI", investment: 100, returnAmount: 231, status: "COMPLETED", actualWinner: "DC", predictions: [ {player: "Akshat", predictedWinner: "DC"}, {player: "Ketan", predictedWinner: "MI"}, {player: "Parth", predictedWinner: "MI"}, {player: "Vijay", predictedWinner: "MI"}, {player: "Ajinkya", predictedWinner: "DC"} ]},
  { teamA: "GT", teamB: "RR", investment: 50, returnAmount: 89.6, status: "COMPLETED", actualWinner: "RR", predictions: [ {player: "Akshat", predictedWinner: "RR"}, {player: "Ketan", predictedWinner: "RR"}, {player: "Parth", predictedWinner: "RR"}, {player: "Vijay", predictedWinner: "RR"}, {player: "Ajinkya", predictedWinner: "RR"} ]},
  { teamA: "SRH", teamB: "LSG", investment: 50, returnAmount: 111.5, status: "COMPLETED", actualWinner: "LSG", predictions: [ {player: "Akshat", predictedWinner: "LSG"}, {player: "Ketan", predictedWinner: "LSG"}, {player: "Parth", predictedWinner: "SRH"}, {player: "Vijay", predictedWinner: "LSG"}, {player: "Ajinkya", predictedWinner: "SRH"} ]},
  { teamA: "RCB", teamB: "CSK", investment: 150, returnAmount: 239.7, status: "COMPLETED", actualWinner: "RCB", predictions: [ {player: "Akshat", predictedWinner: "RCB"}, {player: "Ketan", predictedWinner: "RCB"}, {player: "Parth", predictedWinner: "RCB"}, {player: "Vijay", predictedWinner: "RCB"}, {player: "Ajinkya", predictedWinner: "RCB"} ]},
  { teamA: "MI", teamB: "RR", investment: 100, returnAmount: 224.5, status: "COMPLETED", actualWinner: "RR", predictions: [ {player: "Akshat", predictedWinner: "MI"}, {player: "Ketan", predictedWinner: "RR"}, {player: "Parth", predictedWinner: "RR"}, {player: "Vijay", predictedWinner: "MI"}, {player: "Ajinkya", predictedWinner: "RR"} ]},
  { teamA: "KKR", teamB: "PBKS", investment: 200, returnAmount: 229, status: "COMPLETED", actualWinner: "PBKS", predictions: [ {player: "Akshat", predictedWinner: "PBKS"}, {player: "Ketan", predictedWinner: "PBKS"}, {player: "Parth", predictedWinner: "PBKS"}, {player: "Vijay", predictedWinner: "PBKS"}, {player: "Ajinkya", predictedWinner: "PBKS"} ]}
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Match.deleteMany();
    console.log('Database Cleared! 🗑️');

    const finalData = matches.map((m, index) => ({
      ...m,
      profitOrLoss: m.returnAmount - m.investment,
      createdAt: new Date(Date.now() - (matches.length - index) * 60000) 
    }));

    await Match.insertMany(finalData);
    console.log('Real Match Data Seeded Successfully! 🔥');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();