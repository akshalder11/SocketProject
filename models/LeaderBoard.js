const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
  playerId: { type: String, required: true },
  score: { type: Number, required: true, default: 0 },
  region: { type: String, default: 'global' },
  mode: { type: String, default: 'default' },
  date: { type: Date, default: () => new Date() },
}, { timestamps: true });


module.exports = mongoose.model('Leaderboard', LeaderboardSchema);
