import React from 'react';
import HomePage from './components/HomePage';
import ChatbaseIframe from './components/ChatbaseIframe';
import { useChatbaseAuth } from './hooks/useChatbaseAuth';
import './App.css';

function App() {
  const { isAuthenticated, user } = useChatbaseAuth();

  return (
    <div className="App">
      <HomePage />
      <ChatbaseIframe />
      
      {/* Development info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="dev-info">
          <p>Auth Status: {isAuthenticated ? 'Authenticated' : 'Anonymous'}</p>
          {user && <p>User: {user.name}</p>}
        </div>
      )}
    </div>
  );
}

export default App;