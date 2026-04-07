require('dotenv').config();
const mongoose = require('mongoose');
const Match = require('./models/Match');

const matches = [
  { teamA: "RR", teamB: "CSK", status: "COMPLETED", actualWinner: "RR", investment: 0, returnAmount: 0, predictions: [
    { player: "Akshat", predictedWinner: "RR" }, { player: "Ketan", predictedWinner: "RR" }, { player: "Parth", predictedWinner: "CSK" }, { player: "Vijay", predictedWinner: "CSK" }, { player: "Ajinkya", predictedWinner: "CSK" }
  ]},
  { teamA: "LSG", teamB: "DC", status: "COMPLETED", actualWinner: "DC", investment: 0, returnAmount: 0, predictions: [
    { player: "Akshat", predictedWinner: "DC" }, { player: "Ketan", predictedWinner: "DC" }, { player: "Parth", predictedWinner: "DC" }, { player: "Vijay", predictedWinner: "DC" }, { player: "Ajinkya", predictedWinner: "DC" }
  ]},
  { teamA: "KKR", teamB: "SRH", status: "COMPLETED", actualWinner: "SRH", investment: 0, returnAmount: 0, predictions: [
    { player: "Akshat", predictedWinner: "KKR" }, { player: "Ketan", predictedWinner: "KKR" }, { player: "Parth", predictedWinner: "KKR" }, { player: "Vijay", predictedWinner: "KKR" }, { player: "Ajinkya", predictedWinner: "KKR" }
  ]},
  { teamA: "CSK", teamB: "PBKS", status: "COMPLETED", actualWinner: "PBKS", investment: 0, returnAmount: 0, predictions: [
    { player: "Akshat", predictedWinner: "PBKS" }, { player: "Ketan", predictedWinner: "PBKS" }, { player: "Parth", predictedWinner: "PBKS" }, { player: "Vijay", predictedWinner: "PBKS" }, { player: "Ajinkya", predictedWinner: "PBKS" }
  ]},
  { teamA: "DC", teamB: "MI", status: "COMPLETED", actualWinner: "DC", investment: 0, returnAmount: 0, predictions: [
    { player: "Akshat", predictedWinner: "DC" }, { player: "Ketan", predictedWinner: "MI" }, { player: "Parth", predictedWinner: "MI" }, { player: "Vijay", predictedWinner: "MI" }, { player: "Ajinkya", predictedWinner: "DC" }
  ]},
  { teamA: "GT", teamB: "RR", status: "COMPLETED", actualWinner: "RR", investment: 0, returnAmount: 0, predictions: [
    { player: "Akshat", predictedWinner: "RR" }, { player: "Ketan", predictedWinner: "RR" }, { player: "Parth", predictedWinner: "RR" }, { player: "Vijay", predictedWinner: "RR" }, { player: "Ajinkya", predictedWinner: "RR" }
  ]},
  { teamA: "SRH", teamB: "LSG", status: "COMPLETED", actualWinner: "LSG", investment: 0, returnAmount: 0, predictions: [
    { player: "Akshat", predictedWinner: "LSG" }, { player: "Ketan", predictedWinner: "LSG" }, { player: "Parth", predictedWinner: "SRH" }, { player: "Vijay", predictedWinner: "LSG" }, { player: "Ajinkya", predictedWinner: "SRH" }
  ]},
  { teamA: "RCB", teamB: "CSK", status: "COMPLETED", actualWinner: "RCB", investment: 0, returnAmount: 0, predictions: [
    { player: "Akshat", predictedWinner: "RCB" }, { player: "Ketan", predictedWinner: "RCB" }, { player: "Parth", predictedWinner: "RCB" }, { player: "Vijay", predictedWinner: "RCB" }, { player: "Ajinkya", predictedWinner: "RCB" }
  ]}
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Match.deleteMany();
    console.log('Database Cleared! 🗑️');

    const finalData = matches.map((m, index) => ({
      ...m,
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