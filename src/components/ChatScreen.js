import React, { useState } from 'react';

const ChatScreen = ({ messages, socket }) => {
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() && socket) {
      console.log('Sending message:', input);
      socket.emit('sendMessage', { sessionId: null, query: input });
      setInput(''); // Clear input after sending
    } else {
      console.log('Socket not ready or input empty');
    }
  };

  const handleReset = () => {
    if (socket) {
      console.log('Resetting session');
      socket.emit('resetSession'); // Emit reset event
    }
  };

  const renderMessage = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <div className="chat-container">
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