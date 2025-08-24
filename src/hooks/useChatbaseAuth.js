import { useState, useEffect } from 'react';
import { CHATBASE_CONFIG } from '../config/credentials';

// Hook for handling Chatbase identity verification
export const useChatbaseAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for existing authentication
    const storedToken = localStorage.getItem('chatbase_auth_token');
    const storedUser = localStorage.getItem('chatbase_user');
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setToken(storedToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        clearAuth();
      }
    }
  }, []);

  // Simple JWT generation for demo purposes
  // In production, this should be done on your backend
  const generateDemoJWT = (userData) => {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const payload = {
      sub: userData.id,
      name: userData.name,
      email: userData.email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
      domain: CHATBASE_CONFIG.DOMAIN
    };

    // Note: This is a simplified JWT for demo. Use a proper JWT library in production
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    
    // In production, you would sign this with your JWT_SECRET on the backend
    const signature = btoa(`demo_signature_${userData.id}`);
    
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  };

  // Login function
  const login = async (userData) => {
    try {
      const demoToken = generateDemoJWT(userData);
      
      localStorage.setItem('chatbase_auth_token', demoToken);
      localStorage.setItem('chatbase_user', JSON.stringify(userData));
      
      setUser(userData);
      setToken(demoToken);
      setIsAuthenticated(true);
      
      // Update Chatbase widget with user info
      if (window.embeddedChatbotConfig) {
        window.embeddedChatbotConfig.user = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          token: demoToken
        };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    clearAuth();
    
    // Reset Chatbase widget user
    if (window.embeddedChatbotConfig) {
      window.embeddedChatbotConfig.user = {
        id: generateAnonymousId(),
        name: 'Anonymous User',
        email: null,
        token: null
      };
    }
  };

  // Clear authentication data
  const clearAuth = () => {
    localStorage.removeItem('chatbase_auth_token');
    localStorage.removeItem('chatbase_user');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  // Generate anonymous user ID
  const generateAnonymousId = () => {
    let stored = localStorage.getItem('chatbase_anonymous_id');
    if (!stored) {
      stored = 'anon_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('chatbase_anonymous_id', stored);
    }
    return stored;
  };

  return {
    user,
    isAuthenticated,
    token,
    login,
    logout,
    generateAnonymousId
  };
};