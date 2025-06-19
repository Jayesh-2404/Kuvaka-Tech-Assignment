import React, { useState } from 'react';

// UsernameInput component: prompts user for a username
function UsernameInput({ onSetUsername }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Username is required');
      return;
    }
    setError('');
    onSetUsername(input.trim());
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e3f0ff 0%, #fafbff 100%)',
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: '32px 28px',
          borderRadius: 16,
          boxShadow: '0 4px 24px #b3c6e0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: 320,
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 8, color: '#1976d2' }}>👤</div>
        <h2 style={{ margin: '0 0 12px 0', color: '#1976d2', fontWeight: 700 }}>Welcome to Chat-Application</h2>
        <label htmlFor="username" style={{ fontWeight: 500, marginBottom: 6 }}>Enter your username</label>
        <input
          id="username"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
          required
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #b3c6e0',
            fontSize: 16,
            marginBottom: 10,
            width: '100%',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        {error && <div style={{ color: 'red', marginBottom: 8, fontSize: 14 }}>{error}</div>}
        <button
          type="submit"
          style={{
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 24px',
            fontWeight: 'bold',
            fontSize: 16,
            cursor: 'pointer',
            marginTop: 4,
            boxShadow: '0 2px 8px #e3f0ff',
            transition: 'background 0.2s',
          }}
        >
          Join Chat
        </button>
      </form>
    </div>
  );
}

export default UsernameInput;
