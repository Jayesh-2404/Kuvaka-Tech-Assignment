import React, { useState } from 'react';

//  input for sending a new chat message
function MessageInput({ onSendMessage, wsConnected }) {
  const [input, setInput] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={wsConnected ? "Type a message..." : "Connecting..."}
        style={{ flex: 1, padding: '8px 12px', borderRadius: 16, border: '1px solid #ccc', outline: 'none', fontSize: 15 }}
        disabled={!wsConnected}
        required
      />
      <button
        type="submit"
        disabled={!input.trim() || !wsConnected}
        style={{
          background: wsConnected ? '#1976d2' : '#aaa',
          color: '#fff',
          border: 'none',
          borderRadius: 16,
          padding: '8px 20px',
          fontWeight: 'bold',
          cursor: wsConnected ? 'pointer' : 'not-allowed',
          fontSize: 15,
        }}
      >
        Send
      </button>
    </form>
  );
}

export default MessageInput; 