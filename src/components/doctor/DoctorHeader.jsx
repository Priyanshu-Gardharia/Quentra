import React from 'react';

export default function DoctorHeader({ dateTime, onToggleSidebar, onStaffLogin }) {
  return (
    <header className="main-header">
      <div className="header-left">
        <button className="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar" onClick={onToggleSidebar}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5H17M3 10H17M3 15H17" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="quentra-logo">QUENTRA</div>
      </div>
      <div className="date-time">{dateTime}</div>
      <div className="staff-login" onClick={onStaffLogin} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onStaffLogin()}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5L12 10L8 15" stroke="#4F4F4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="3" y="4" width="14" height="12" rx="1" stroke="#4F4F4F" strokeWidth="1.5" fill="none" />
        </svg>
        <span>Staff login</span>
      </div>
    </header>
  );
}
