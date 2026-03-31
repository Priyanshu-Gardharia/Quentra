import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdTrackChanges, MdConfirmationNumber, MdAccessTime, MdDashboard, MdNotifications, MdAccountTree } from 'react-icons/md';
import FeatureCard from '../components/FeatureCard';
import './LandingPage.css';

const features = [
  {
    icon: <MdTrackChanges />,
    title: 'Real-time Queue Tracking',
    description: 'Monitor your position in the queue live with updates pushed directly to your device.'
  },
  {
    icon: <MdConfirmationNumber />,
    title: 'Online Token Generation',
    description: 'Secure your spot before leaving home. Quick digital tokens linked to your patient ID.'
  },
  {
    icon: <MdAccessTime />,
    title: 'Estimated Waiting Time',
    description: 'AI-driven predictions provide accurate wait times based on historical department data.'
  },
  {
    icon: <MdDashboard />,
    title: 'Staff Dashboard',
    description: 'A comprehensive overview for clinical staff to manage flow and triage patient urgency.'
  },
  {
    icon: <MdNotifications />,
    title: 'Notifications & Alerts',
    description: 'Receive SMS or app alerts when you are next in line or if there are department delays.'
  },
  {
    icon: <MdAccountTree />,
    title: 'Multi-department Support',
    description: 'Unified system for General OPD, Orthopedics, Pediatrics, and specialized clinics.'
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      const formattedTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      setDateTime(`${formattedDate} | ${formattedTime}`);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      {/* Header — same pattern as existing Header.jsx */}
      <header className="header" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="headerContent">
          <div className="logoSection">
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '32px', margin: 0, color: '#1a1a1a', letterSpacing: '2px' }}>QUENTRA</h1>
          </div>
          <div className="datetimeSection">
            <div className="datetime">{dateTime}</div>
          </div>
          <div className="staffLoginSection">
            <button className="staffLoginBtn" type="button" onClick={() => navigate('/login')} style={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                <path d="M8 5L12 10L8 15" stroke="#4F4F4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="4" width="14" height="12" rx="1" stroke="#4F4F4F" strokeWidth="1.5" fill="none"/>
              </svg>
              <span className="staffLoginText">Staff Login</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-text">
          <h1 className="landing-hero-title">Skip the Wait.<br />Join the Queue Online.</h1>
          <p className="landing-hero-subtitle">
            Experience a smarter way to manage hospital visits. Get your token, track your position, and reduce waiting time — all from your device.
          </p>
          <div className="landing-hero-buttons">
            <button className="landing-btn-primary" onClick={() => navigate('/queue')}>
              Join Queue
            </button>
            <button className="landing-btn-secondary" onClick={() => navigate('/queue')}>
              View Queue Status
            </button>
          </div>
        </div>
        <div className="landing-hero-visual">
          <div className="landing-token-preview">
            <div className="token-preview-header">
              <div className="token-preview-dot"></div>
              <span className="token-preview-label">Your Token</span>
            </div>
            <div className="token-preview-number">GM-07</div>
            <p className="token-preview-dept">General OPD</p>
            <div className="token-preview-stats">
              <div className="token-stat">
                <span className="token-stat-label">Persons Ahead</span>
                <span className="token-stat-value">4</span>
              </div>
              <div className="token-stat">
                <span className="token-stat-label">Est. Wait</span>
                <span className="token-stat-value">~12 mins</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="landing-about" id="about">
        <h2 className="landing-section-title">About Our System</h2>
        <p className="landing-about-text">
          At Quentra, we believe clinical care should begin long before you step through our doors. Our virtual queueing system is designed to eliminate the anxiety of waiting rooms, allowing patients to wait in comfort while hospital staff manage patient flow with precision and empathy. By reducing physical crowding and providing real-time updates, we create a calmer, more efficient healthcare experience for everyone.
        </p>
      </section>

      {/* Features Section */}
      <section className="landing-features" id="features">
        <div className="landing-features-header">
          <h2 className="landing-section-title">Key Features</h2>
          <p className="landing-features-subtitle">Precision tools for modern healthcare management</p>
        </div>
        <div className="landing-features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta">
        <div className="landing-cta-card">
          <h2 className="landing-cta-title">Ready to experience clinical serenity?</h2>
          <p className="landing-cta-text">
            Join the hundreds of patients who save an average of 45 minutes per visit using our virtual queue system.
          </p>
          <button className="landing-btn-primary" onClick={() => navigate('/queue')}>
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-content">
          <p className="landing-footer-copyright">© 2026 QUENTRA — Hospital Queue Management System</p>
          <nav className="landing-footer-links">
            <button className="landing-footer-link" onClick={() => scrollTo('top')}>Home</button>
            <button className="landing-footer-link" onClick={() => scrollTo('about')}>About</button>
            <button className="landing-footer-link" onClick={() => scrollTo('features')}>Features</button>
            <button className="landing-footer-link" onClick={() => navigate('/queue')}>Queue</button>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
