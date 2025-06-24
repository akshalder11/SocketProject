
# 🎮 Real-Time Leaderboard System

A backend service that tracks player scores in real-time and maintains a leaderboard using **Socket.io**, **MongoDB**, and **Node.js**. Hosted for free on **Render**.

---

## 🚀 Live Backend

> 🌐 https://socketproject-0oan.onrender.com/

This backend serves:
- A real-time WebSocket server (via Socket.io)
- A static test page at `/` (`index.html`)

---

## 📦 Tech Stack

- **Node.js** + **Express**
- **Socket.io** for WebSocket communication
- **MongoDB Atlas** (cloud database with TTL support)
- **Render** (Free tier hosting)

---

## 📁 Project Structure

```
├── controllers/
│   └── leaderboardController.js
├── models/
│   └── Leaderboard.js
├── public/
│   └── index.html         ← Test UI (served by Express)
├── socket.js              ← Socket.io logic
├── server.js              ← Main backend entry
├── db.js                  ← MongoDB connection
├── .env                   ← Env variables (not pushed to GitHub)
```

---

## ⚙️ How It Works

### 🔄 Events (Socket.io)

| Event                  | Sent By | Description                                            |
|------------------------|---------|--------------------------------------------------------|
| `update_score`         | Client  | Send playerId, score, region, mode to update score     |
| `get_top_players`      | Client  | Request top N players for a region and mode            |
| `top_players`          | Server  | Responds to `get_top_players` with list of top players |
| `leaderboard_updated`  | Server  | Broadcasts updated leaderboard on score update         |

---

## ✅ How to Test

### Option 1: Use the Hosted Web Client

1. Go to: **https://socketproject-0oan.onrender.com/**
2. Open your browser’s developer console
3. You’ll see messages printed when:
   - A score is updated
   - Leaderboard is fetched
   - Leaderboard is broadcasted

### Option 2: Use Node.js Test Script

Create a `testClient.js`:

```js
const { io } = require('socket.io-client');
const socket = io('https://socketproject-0oan.onrender.com');

socket.on('connect', () => {
  console.log('🟢 Connected to server');

  socket.emit('update_score', {
    playerId: 'akash123',
    score: 50,
    region: 'ASIA',
    mode: 'deathmatch'
  });

  socket.emit('get_top_players', {
    region: 'ASIA',
    mode: 'deathmatch',
    limit: 5
  });
});

socket.on('top_players', (data) => {
  console.log('👑 Top Players:', data);
});

socket.on('leaderboard_updated', (data) => {
  console.log('📈 Leaderboard Updated:', data);
});
```

Then run:

```bash
node testClient.js
```

✅ You’ll see the live interactions in the terminal.

---

## 🧹 Notes

- Your data will now be saved in the `leaderboard` database (not `test`)
- TTL logic auto-resets scores every 24 hours
- Indexes optimize sorting and querying for real-time use

---
