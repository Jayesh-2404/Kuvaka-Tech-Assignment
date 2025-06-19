require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const Message = require('./models/Message');

const app = express();
app.use(cors());

// Create HTTP server and attach WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Store connected clients and their usernames
const clients = new Map();

// Handle WebSocket connections
wss.on('connection', (ws) => {
  let username = null;

  // Helper: send data as JSON
  const sendJSON = (data) => ws.send(JSON.stringify(data));

  ws.on('message', async (data) => {
    try {
      const msg = JSON.parse(data);
      // First message from client should be username
      if (!username && msg.type === 'set_username') {
        username = msg.username;
        clients.set(ws, username);
        // Send last 50 messages as chat history
        const history = await Message.find().sort({ timestamp: -1 }).limit(50).sort({ timestamp: 1 });
        sendJSON({ type: 'history', messages: history });
        return;
      }
      // Handle new chat message
      if (msg.type === 'chat_message' && username) {
        const newMsg = new Message({ username, message: msg.message });
        await newMsg.save();
        const outMsg = {
          type: 'chat_message',
          username,
          message: msg.message,
          timestamp: newMsg.timestamp,
        };
        // Broadcast to all clients
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(outMsg));
          }
        });
      }
    } catch (err) {
      console.error('Error handling message:', err);
      sendJSON({ type: 'error', message: 'Invalid message format.' });
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    // Optionally, broadcast user left (not required for MVP)
  });
});

// Basic health check route
app.get('/', (req, res) => {
  res.send('Chat server is running.');
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 