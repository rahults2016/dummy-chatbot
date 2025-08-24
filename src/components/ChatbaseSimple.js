import { useEffect } from 'react';
import { CHATBASE_CONFIG } from '../config/credentials';

const ChatbaseSimple = () => {
  useEffect(() => {
    // Method 1: Direct script injection with bot ID
    const script = document.createElement('script');
    script.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "${CHATBASE_CONFIG.CHATBASE_BOT_ID}",
        domain: "${window.location.hostname}"
      }
    `;
    document.head.appendChild(script);

    // Method 2: Load the embed script
    const embedScript = document.createElement('script');
    embedScript.src = 'https://www.chatbase.co/embed.min.js';
    embedScript.setAttribute('chatbotId', CHATBASE_CONFIG.CHATBASE_BOT_ID);
    embedScript.setAttribute('domain', window.location.hostname);
    embedScript.defer = true;
    document.body.appendChild(embedScript);

    return () => {
      // Cleanup
      if (script.parentNode) script.parentNode.removeChild(script);
      if (embedScript.parentNode) embedScript.parentNode.removeChild(embedScript);
      
      // Remove all chatbase elements
      document.querySelectorAll('[id*="chatbase"], [class*="chatbase"]').forEach(el => el.remove());
      delete window.embeddedChatbotConfig;
    };
  }, []);

  return null;
};

export default ChatbaseSimple;