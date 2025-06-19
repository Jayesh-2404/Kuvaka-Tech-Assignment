import React, { useState } from 'react';

// UsernameInput component: prompts user for a username
function UsernameInput({ onSetUsername }) {
  const [input, setInput] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSetUsername(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label htmlFor="username">Enter your username:</label>
      <input
        id="username"
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        autoFocus
        required
      />
      <button type="submit">Join Chat</button>
    </form>
  );
}

export default UsernameInput;
