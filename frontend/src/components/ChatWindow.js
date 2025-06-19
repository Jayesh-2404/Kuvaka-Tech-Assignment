import React, { useEffect, useRef } from 'react';

// date and time
function formatDateTime(ts) {
  const d = new Date(ts);
  const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = d.toLocaleDateString('en-CA'); // YYYY-MM-DD
  return `${time}, ${date}`;
}

//  displays a list of chat messages
function ChatWindow({ messages, currentUser, hiddenIds = [], onDeleteMessage }) {
  const endRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div style={{ height: 350, overflowY: 'auto', border: '1px solid #eee', padding: 12, marginBottom: 16, background: '#fafafa', borderRadius: 8 }}>
      {messages.length === 0 ? (
        <div style={{ color: '#888', fontSize: 18 }}>No messages yet.</div>
      ) : (
        messages.map((msg, idx) => {
          // Use timestamp
          const msgId = `${msg.timestamp}_${msg.username}_${msg.message}`;
          if (hiddenIds.includes(msgId)) return null;
          const isCurrentUser = msg.username === currentUser;
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
                marginBottom: 16,
                position: 'relative',
              }}
            >
              <div
                style={{
                  background: isCurrentUser ? '#1976d2' : '#e0e0e0',
                  color: isCurrentUser ? '#fff' : '#222',
                  padding: '16px 20px',
                  borderRadius: 20,
                  maxWidth: '90%',
                  fontSize: 18,
                  wordBreak: 'break-word',
                  boxShadow: '0 2px 6px #ddd',
                  position: 'relative',
                }}
              >
                <span style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {msg.username}
                </span>
                <span style={{ fontSize: 14, marginLeft: 12, color: isCurrentUser ? '#bbdefb' : '#888' }}>
                  {formatDateTime(msg.timestamp)}
                </span>
                <div style={{ marginTop: 6 }}>{msg.message}</div>
                
              </div>
            </div>
          );
        })
      )}
      <div ref={endRef} />
    </div>
  );
}

export default ChatWindow;
