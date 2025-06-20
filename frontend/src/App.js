import React, { useState, useRef, useEffect } from 'react';
import UsernameInput from './components/UsernameInput';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';

function App() {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [wsConnected, setWsConnected] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    if (!username) return;

    ws.current = new window.WebSocket('wss://kuvaka-tech-assignment-1.onrender.com');

    ws.current.onopen = () => {
      setWsConnected(true);
      ws.current.send(JSON.stringify({ type: 'set_username', username }));
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'history') {
          setMessages(data.messages);
        } else if (data.type === 'chat_message') {
          setMessages((prev) => [...prev, data]);
        } else if (data.type === 'error') {
          alert(data.message);
        }
      } catch (err) {
        console.error('Error parsing message:', err);
      }
    };

    ws.current.onclose = () => {
      setWsConnected(false);
    };

    ws.current.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [username]);

  // Handler for sending a new message
  const handleSendMessage = (messageText) => {
    if (!messageText.trim() || !ws.current || ws.current.readyState !== 1) return;
    ws.current.send(JSON.stringify({ type: 'chat_message', message: messageText }));
  };

  // Logout handler
  const handleLogout = () => {
    setUsername('');
    setMessages([]);
    setWsConnected(false);
    if (ws.current) ws.current.close();
  };

  if (!username) {
    return <UsernameInput onSetUsername={setUsername} />;
  }

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', border: '1px solid #ccc', borderRadius: 12, padding: 0, background: '#fff', boxShadow: '0 2px 12px #eee' }}>
     {/* header */}
      <div style={{ background: '#1976d2', color: '#fff', padding: '12px 16px', borderTopLeftRadius: 12, borderTopRightRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>Logged in as <b>{username}</b></span>
        <button onClick={handleLogout} style={{ background: '#fff', color: '#1976d2', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
      </div>
      <div style={{ padding: 32 }}>
        <h2 style={{ margin: '8px 0 16px 0', color: '#1976d2' }}>Real-Time Chat</h2>
        {!wsConnected && <div style={{ color: 'red', marginBottom: 8 }}>Connecting to chat server...</div>}
        <ChatWindow messages={messages} currentUser={username} />
        <MessageInput onSendMessage={handleSendMessage} wsConnected={wsConnected} />
      </div>
    </div>
  );
}

export default App;