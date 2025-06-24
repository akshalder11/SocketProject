const {
  updateScore,
  getTopPlayers,
} = require("./controllers/leaderBoardController");

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log(`Socket connected at ${socket.id}`);

    socket.on("update_score", async (data) => {
      await updateScore(data);
      const top = await getTopPlayers(data.region, data.mode, 10);
      io.emit("leaderboard_updated", top);
    });

    socket.on("get_top_players", async ({ region, mode, limit }) => {
      const top = await getTopPlayers(region, mode, limit || 10);
      socket.emit("top_players", top);
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected`);
    });
  });
};
