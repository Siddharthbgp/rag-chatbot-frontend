import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ChatScreen from './components/ChatScreen';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io('http://localhost:5000');
    socketIo.on('connect', () => console.log('Connected to backend'));
    socketIo.on('responseChunk', (data) => {
      console.log('Chunk from backend:', data.chunk);
      setMessages((prev) => {
        const lastBot = prev[prev.length - 1];
        if (lastBot && lastBot.role === 'bot') {
          // Append to last bot message
          return [...prev.slice(0, -1), { ...lastBot, text: lastBot.text + data.chunk }];
        } else {
          // New bot message
          return [...prev, { role: 'bot', text: data.chunk }];
        }
      });
    });
    socketIo.on('newSession', (data) => {
      console.log('New session:', data.sessionId);
      setMessages([]); // Clear on new session
    });
    socketIo.on('disconnect', () => console.log('Disconnected from backend'));
    socketIo.on('error', (error) => console.error('Socket error:', error));
    setSocket(socketIo);

    return () => socketIo.disconnect();
  }, []);

  return (
    <div className="App">
      <ChatScreen messages={messages} socket={socket} />
    </div>
  );
}

export default App;