import React from 'react';

const todayItems = ['My Queue', 'Past visits', 'Reports'];
const quickItems = ['Pause Queue', 'Mark next as Urgent', 'Print token'];

export default function DoctorSidebar({ collapsed, activeNav, onNavClick }) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} id="sidebar">
      <div className="doctor-profile-card">
        <div className="doctor-icon-circle">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#3A8EEB" />
            <path d="M20 12V20M16 16H24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M12 28C12 24 15 22 20 22C25 22 28 24 28 28" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="doctor-info">
          <div className="doctor-name">Dr.abc</div>
          <div className="doctor-role">Consultation</div>
        </div>
      </div>

      <div className="sidebar-divider" />

      <div className="nav-section">
        <h3 className="nav-section-title">Today</h3>
        <nav className="nav-menu">
          {todayItems.map((item, i) => (
            <div key={item} className={`nav-item doctor-nav-item ${activeNav === item ? 'doctor-active' : ''}`} onClick={() => onNavClick(item)}>
              {i === 0 && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H17M3 10H17M3 14H17" stroke="#3A8EEB" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="15" cy="5" r="1.5" fill="#3A8EEB" />
                </svg>
              )}
              {i === 1 && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H16V16H4V4Z" stroke="#10B981" strokeWidth="1.5" fill="none" />
                  <path d="M4 8H16" stroke="#10B981" strokeWidth="1.5" />
                  <path d="M8 4V8" stroke="#10B981" strokeWidth="1.5" />
                  <circle cx="15" cy="5" r="1.5" fill="#10B981" />
                </svg>
              )}
              {i === 2 && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="8" width="14" height="9" rx="1" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
                  <path d="M6 8V5C6 3.89543 6.89543 3 8 3H12C13.1046 3 14 3.89543 14 5V8" stroke="#F59E0B" strokeWidth="1.5" />
                  <path d="M7 12H13M7 15H10" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="15" cy="5" r="1.5" fill="#F59E0B" />
                </svg>
              )}
              <span>{item}</span>
            </div>
          ))}
        </nav>
      </div>

      <div className="sidebar-divider" />

      <div className="nav-section">
        <h3 className="nav-section-title">Quick Action</h3>
        <nav className="nav-menu">
          {quickItems.map((item, i) => (
            <div key={item} className={`nav-item doctor-nav-item ${activeNav === item ? 'doctor-active' : ''}`} onClick={() => onNavClick(item)}>
              {i === 0 && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="7" y="4" width="2" height="12" fill="#F59E0B" />
                  <rect x="11" y="4" width="2" height="12" fill="#F59E0B" />
                  <circle cx="15" cy="5" r="1.5" fill="#F59E0B" />
                </svg>
              )}
              {i === 1 && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H16V16H4V4Z" stroke="#EF4444" strokeWidth="1.5" fill="none" />
                  <path d="M8 8H12V12H8V8Z" fill="#EF4444" />
                  <circle cx="15" cy="5" r="1.5" fill="#EF4444" />
                </svg>
              )}
              {i === 2 && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="6" width="12" height="10" rx="1" stroke="#3A8EEB" strokeWidth="1.5" fill="none" />
                  <path d="M4 8H16" stroke="#3A8EEB" strokeWidth="1.5" />
                  <path d="M6 12H14" stroke="#3A8EEB" strokeWidth="1.5" />
                  <path d="M6 15H10" stroke="#3A8EEB" strokeWidth="1.5" />
                  <rect x="7" y="2" width="6" height="4" rx="0.5" fill="#3A8EEB" />
                </svg>
              )}
              <span>{item}</span>
            </div>
          ))}
        </nav>
        <div className="expand-icon">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="#7B7B7B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="sidebar-divider" />

      <div className="appointments-summary">
        <div className="summary-item">Today: 24 appointments</div>
        <div className="summary-item">Completed: 7</div>
      </div>
    </aside>
  );
}
