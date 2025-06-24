const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
  playerId: { type: String, required: true },
  score: { type: Number, required: true, default: 0 },
  region: { type: String, default: 'global' },
  mode: { type: String, default: 'default' },
  date: { type: Date, default: () => new Date() },
}, { timestamps: true });

// TTL for daily reset (24 hours after insertion)
// LeaderboardSchema.index({ date: 1 }, { expireAfterSeconds: 86400 });
// LeaderboardSchema.index({ region: 1, mode: 1, score: -1 });

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);
