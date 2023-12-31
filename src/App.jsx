import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // Import your CSS file for styling

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Dummy initial messages (you may fetch from an API or initialize differently)
  useEffect(() => {
    setMessages([
      { id: 1, text: 'Hello!', sender: 'user' },
      { id: 2, text: 'Hi there!', sender: 'bot' },
    ]);
  }, []);

  // Function to handle sending a new message
  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  // Function to handle deleting a message
  const deleteMessage = (id) => {
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMessages);
  };

  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <span>{msg.text}</span>
            {msg.sender === 'user' && (
              <button onClick={() => deleteMessage(msg.id)}>Delete</button>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
