import { useState } from 'react';
import { CHATBASE_CONFIG } from '../config/credentials';

const ChatbaseIframe = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleChat = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 1000,
          transition: 'transform 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        💬
      </button>

      {/* Chat Window */}
      {isVisible && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '350px',
          height: '500px',
          borderRadius: '10px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
          zIndex: 999,
          overflow: 'hidden'
        }}>
          <iframe
            src={`https://www.chatbase.co/chatbot-iframe/${CHATBASE_CONFIG.CHATBASE_BOT_ID}`}
            title="Chatbase AI Assistant"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '10px'
            }}
            allow="microphone"
          />
        </div>
      )}
    </>
  );
};

export default ChatbaseIframe;