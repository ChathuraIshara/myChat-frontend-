import React, { useEffect, useRef } from 'react';
import './Chat.css';
import ChatInput from '../ChatInput/ChatInput';
import Message from '../Message/Message';

function Chat({ myUserName, setMyUserName, conn, setConnection, activeChat, messages, setMessages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='chat'>
      <div className='chatTitle'>
        <h3>{activeChat.name}</h3>
      </div>
      <div className='chatscreen'>
        <div className="chatMessages" ref={chatMessagesRef}>
          {messages.map((msg, index) => (
            <Message
              key={index}
              sender={msg.sender}
              message={msg.message}
              isSender={msg.sender.name === myUserName}
            />
          ))}
        </div>
        <div className='chatInputContainer'>
          <ChatInput conn={conn} setConnection={setConnection} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
