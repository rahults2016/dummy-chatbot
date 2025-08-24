// Chatbase Configuration
// Please provide the following credentials:

export const CHATBASE_CONFIG = {
  // Your Chatbase Bot ID - get this from your Chatbase dashboard
  CHATBASE_BOT_ID: process.env.REACT_APP_CHATBASE_BOT_ID || 'tVWU8meuo_FBMtQTfL5Pt',
  
  // Your domain for identity verification (optional)
  DOMAIN: process.env.REACT_APP_DOMAIN || 'localhost:3000',
  
  // JWT Secret for identity verification (if using custom auth)
  JWT_SECRET: process.env.REACT_APP_JWT_SECRET || 'YOUR_JWT_SECRET',
  
  // API Base URL (if needed for custom endpoints)
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://api.yourdomain.com',
  
  // Theme customization
  THEME: {
    primaryColor: '#667eea',
    secondaryColor: '#764ba2'
  }
};

// Environment check
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// Validation function
export const validateConfig = () => {
  const missing = [];
  
  if (CHATBASE_CONFIG.CHATBASE_BOT_ID === 'YOUR_CHATBASE_BOT_ID') {
    missing.push('CHATBASE_BOT_ID');
  }
  
  if (missing.length > 0) {
    console.warn('Missing Chatbase credentials:', missing.join(', '));
    return false;
  }
  
  return true;
};