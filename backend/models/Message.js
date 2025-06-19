const mongoose = require('mongoose');

// Define the schema for a chat message
const messageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Create and export the Message model
module.exports = mongoose.model('Message', messageSchema); 