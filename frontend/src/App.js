import React, { useState } from 'react';
// Import components (to be created)
import UsernameInput from './components/UsernameInput';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';

// Main App component
function App() {
  // State for username and messages
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);

  // Handler for sending a new message (locally for now)
  const handleSendMessage = (messageText) => {
    if (!messageText.trim()) return;
    const newMessage = {
      username,
      message: messageText,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
  };

  // If username not set, show username input
  if (!username) {
    return <UsernameInput onSetUsername={setUsername} />;
  }

  // Otherwise, show chat window and message input
  return (
    <div style={{ maxWidth: 500, margin: '40px auto', border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
      <h2>Simple Chat (Mocked)</h2>
      <ChatWindow messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;
