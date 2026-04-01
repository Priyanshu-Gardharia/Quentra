import React, { useState, useEffect } from 'react';

const AdminHeader = ({ toggleSidebar, currentMode, setCurrentMode }) => {
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      };
      const formattedDate = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      const formattedTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      setDateTime(`${formattedDate} | ${formattedTime}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="main-header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="quentra-logo">QUENTRA</div>
      </div>

      <div className="date-time">{dateTime}</div>

      <div className="admin-control-panel">
        <div className="user-status">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="4" fill="#10B981" />
          </svg>
          <span className="status-text">System Online</span>
        </div>
        <div className="admin-profile-mini">
          <div className="admin-avatar">A</div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
