import React, { useState, useEffect } from 'react';

const AdminHeader = ({ toggleSidebar, currentMode, setCurrentMode }) => {
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
      const day = days[now.getDay()];
      const month = months[now.getMonth()];
      const date = now.getDate();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      
      setDateTime(`${day}, ${month} ${date} | ${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="main-header">
      <div className="header-left">
        <button className="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar" onClick={toggleSidebar}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5H17M3 10H17M3 15H17" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="quentra-logo">QUENTRA</div>
      </div>
      <div className="date-time">{dateTime}</div>
      <div className="admin-control-panel">
        <span>Admin control panel</span>
        <div className="user-status">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="6" r="3" fill="#10B981" />
            <path d="M3 14C3 11 5 9 8 9C11 9 13 11 13 14" stroke="#10B981" strokeWidth="1.5" fill="none" />
          </svg>
          <span className="status-text">Online</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
