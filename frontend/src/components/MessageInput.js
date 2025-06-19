import React, { useState } from 'react';

// MessageInput component: input for sending a new chat message
function MessageInput({ onSendMessage }) {
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
        placeholder="Type a message..."
        style={{ flex: 1 }}
        required
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageInput; 