import React, { useState, useEffect } from 'react';

const ChatScreen = ({ messages, socket }) => {
  const [input, setInput] = useState('');
  const [theme, setTheme] = useState('light'); // Local theme state

  useEffect(() => {
    if (socket) {
      // No need for isTyping logic
    }
  }, [socket]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() && socket) {
      console.log('Sending message:', input);
      socket.emit('sendMessage', { sessionId: null, query: input });
      setInput('');
    }
  };

  const handleReset = () => {
    if (socket) {
      console.log('Resetting session');
      socket.emit('resetSession');
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const renderMessage = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <div className={`chat-container ${theme}`}>
      <header className="chat-header">
        <h1>Welcome to VooshNews Nation Pvt Ltd</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </header>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}>
            <span dangerouslySetInnerHTML={{ __html: renderMessage(msg.text) }}></span>
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={handleReset} className="reset-button">Reset Session</button>
      </div>
      <form onSubmit={handleSend} className="input-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your query..."
          className="input-field"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default ChatScreen;