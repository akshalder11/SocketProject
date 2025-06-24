const Leaderboard = require("../models/LeaderBoard");

exports.updateScore = async ({ playerId, score, region, mode }) => {
  const today = new Date().toISOString().split("T")[0];
  const startOfDay = new Date(today);

  const existingPlayer = await Leaderboard.findOne({
    playerId,
    region,
    mode,
    date: startOfDay ,
  });

  if (existingPlayer) {
    existingPlayer.score += score;
    await existingPlayer.save();
  } else {
    await Leaderboard.create({
      playerId,
      score,
      region,
      mode,
      date: startOfDay,
    });
  }
};

exports.getTopPlayers = async (region, mode, limit = 10) => {
  const today = new Date().toISOString().split("T")[0];
  const startOfDay = new Date(today);

  const players = await Leaderboard.find({
    region,
    mode,
    date: { $gte: startOfDay },
  })
    .sort({ score: -1 })
    .limit(limit);

  return players;
};
