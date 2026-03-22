import React from 'react';

const Sidebar = ({ collapsed }) => {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} id="sidebar">
      {/* Admin Profile Card */}
      <div className="admin-profile-card">
        <div className="admin-icon-circle">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#3A8EEB" />
            <rect x="12" y="12" width="16" height="16" rx="2" fill="#FFFFFF" />
            <path d="M16 16H24M16 20H24M16 24H20" stroke="#3A8EEB" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        {!collapsed && (
          <div className="admin-info">
            <div className="admin-name">Admin</div>
            <div className="admin-role">Control Panel</div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="sidebar-divider"></div>

      {/* MAIN Section */}
      <div className="nav-section">
        <h3 className="nav-section-title">MAIN</h3>
        <nav className="nav-menu">
          <div className="nav-item admin-nav-item admin-active">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="5" height="5" rx="1" fill="#FFFFFF" />
              <rect x="10" y="3" width="5" height="5" rx="1" fill="#FFFFFF" />
              <rect x="3" y="10" width="5" height="5" rx="1" fill="#FFFFFF" />
              <rect x="10" y="10" width="5" height="5" rx="1" fill="#FFFFFF" />
            </svg>
            <span>Dashboard</span>
          </div>
          <div className="nav-item admin-nav-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5H17M3 10H17M3 15H17" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="15" cy="5" r="1.5" fill="#10B981" />
            </svg>
            <span>Manage queues</span>
          </div>
          <div className="nav-item admin-nav-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="7" r="3" fill="#F59E0B" />
              <path d="M4 16C4 13 6 11 10 11C14 11 16 13 16 16" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
              <circle cx="15" cy="5" r="2" fill="#F59E0B" />
            </svg>
            <span>Doctors & staffs</span>
          </div>
        </nav>
      </div>

      {/* Divider */}
      <div className="sidebar-divider"></div>

      {/* SYSTEM Section */}
      <div className="nav-section">
        <h3 className="nav-section-title">SYSTEM</h3>
        <nav className="nav-menu">
          <div className="nav-item admin-nav-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="16" height="12" rx="1" stroke="#3A8EEB" strokeWidth="1.5" fill="none" />
              <path d="M2 8H18" stroke="#3A8EEB" strokeWidth="1.5" />
              <circle cx="6" cy="6" r="0.5" fill="#3A8EEB" />
            </svg>
            <span>Display screens</span>
          </div>
          <div className="nav-item admin-nav-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="3" stroke="#7B7B7B" strokeWidth="1.5" fill="none" />
              <path d="M10 3V5M10 15V17M17 10H15M5 10H3M15.5 4.5L14 6M6 14L4.5 15.5M15.5 15.5L14 14M6 6L4.5 4.5" stroke="#7B7B7B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Setting</span>
          </div>
          <div className="nav-item admin-nav-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="8" width="14" height="9" rx="1" stroke="#EF4444" strokeWidth="1.5" fill="none" />
              <path d="M6 8V5C6 3.89543 6.89543 3 8 3H12C13.1046 3 14 3.89543 14 5V8" stroke="#EF4444" strokeWidth="1.5" />
              <path d="M7 12H13M7 15H10" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Reports</span>
          </div>
        </nav>
      </div>

      {/* Footer Section */}
      {!collapsed && (
        <div className="sidebar-footer">
          <div className="footer-item">
            <span>System Status: Online</span>
          </div>
          <div className="footer-item">
            <span>today Tokens: 56</span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
