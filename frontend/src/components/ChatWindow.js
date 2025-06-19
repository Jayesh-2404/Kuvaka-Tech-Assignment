import React from 'react';

// ChatWindow component: displays a list of chat messages
function ChatWindow({ messages }) {
  return (
    <div style={{ height: 300, overflowY: 'auto', border: '1px solid #eee', padding: 8, marginBottom: 12, background: '#fafafa' }}>
      {messages.length === 0 ? (
        <div style={{ color: '#888' }}>No messages yet.</div>
      ) : (
        messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <span style={{ fontWeight: 'bold' }}>{msg.username}</span>
            <span style={{ color: '#aaa', fontSize: 12, marginLeft: 8 }}>{new Date(msg.timestamp).toLocaleTimeString()}</span>
            <div>{msg.message}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default ChatWindow; 