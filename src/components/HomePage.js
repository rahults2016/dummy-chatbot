import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title">
            Next-Generation AI Services
          </h1>
          <p className="hero-subtitle">
            Transform your business with cutting-edge artificial intelligence solutions. 
            From chatbots to machine learning, we deliver intelligent systems that drive results.
          </p>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🤖</div>
              <h3>AI Chatbots</h3>
              <p>Intelligent conversational AI that understands and responds naturally to your customers</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🧠</div>
              <h3>Machine Learning</h3>
              <p>Custom ML models tailored to your specific business needs and data patterns</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">📊</div>
              <h3>Data Analytics</h3>
              <p>Transform raw data into actionable insights with our advanced analytics platform</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>Process Automation</h3>
              <p>Streamline operations with intelligent automation powered by AI algorithms</p>
            </div>
          </div>
          
          <div className="cta-section">
            <h2>Experience Our AI Assistant</h2>
            <p>Chat with our intelligent assistant below and see how AI can help your business</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;