import React, { useEffect, useState } from 'react';
import { CHATBASE_CONFIG, validateConfig } from '../config/credentials';

const ChatbaseWidget = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Validate configuration
    if (!validateConfig()) {
      setError('Chatbase configuration is incomplete. Please check your credentials.');
      return;
    }

    // Set up the embedded chatbot configuration BEFORE loading the script
    window.embeddedChatbotConfig = {
      chatbotId: CHATBASE_CONFIG.CHATBASE_BOT_ID,
      domain: window.location.hostname
    };

    // Load Chatbase script
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.setAttribute('chatbotId', CHATBASE_CONFIG.CHATBASE_BOT_ID);
    script.setAttribute('domain', window.location.hostname);
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsLoaded(true);
      console.log('Chatbase script loaded successfully');
    };
    
    script.onerror = () => {
      setError('Failed to load Chatbase script from https://www.chatbase.co/embed.min.js');
      console.error('Chatbase script failed to load');
    };
    
    document.body.appendChild(script);
    
    return () => {
      // Cleanup
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      
      // Remove chatbase elements
      const chatbaseElements = document.querySelectorAll('[id*="chatbase"], [class*="chatbase"]');
      chatbaseElements.forEach(el => el.remove());
      
      // Clean up global config
      delete window.embeddedChatbotConfig;
    };
  }, []);

  // Generate a simple user ID for identity verification
  const generateUserId = () => {
    const stored = localStorage.getItem('chatbase_user_id');
    if (stored) return stored;
    
    const newId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('chatbase_user_id', newId);
    return newId;
  };

  // Custom method to open chat programmatically
  const openChat = () => {
    if (window.chatbaseOpen) {
      window.chatbaseOpen();
    }
  };

  // Custom method to send a message programmatically
  const sendMessage = (message) => {
    if (window.chatbaseSendMessage) {
      window.chatbaseSendMessage(message);
    }
  };

  // Expose methods to parent component
  React.useImperativeHandle(React.forwardRef(), () => ({
    openChat,
    sendMessage,
    isLoaded,
    error
  }));

  if (error) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#ff4444',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '10px',
        fontSize: '14px',
        maxWidth: '300px',
        zIndex: 1001
      }}>
        <strong>Chatbase Error:</strong><br />
        {error}
        <br />
        <small>Check console for more details</small>
      </div>
    );
  }

  return null; // The widget is injected by the Chatbase script
};

export default ChatbaseWidget;