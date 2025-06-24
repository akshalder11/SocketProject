const { io } = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected!');

  socket.emit('update_score', {
    playerId: 'Akash',
    score: 100,
    region: 'ASIA',
    mode: 'deathmatch'
  });

  socket.emit('get_top_players', {
    region: 'ASIA',
    mode: 'deathmatch',
    limit: 5
  });

  socket.on('top_players', (data) => {
    console.log('Top players:', data);
  });

  socket.on('leaderboard_updated', (data) => {
    console.log('Leaderboard updated:', data);
  });
});
