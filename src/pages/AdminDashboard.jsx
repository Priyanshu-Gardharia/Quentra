import React, { useState } from 'react';
import './AdminDashboard.css';
import Sidebar from '../components/admin/Sidebar';
import AdminHeader from '../components/admin/AdminHeader';
import OverviewMode from '../components/admin/OverviewMode';
import ControlMode from '../components/admin/ControlMode';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentMode, setCurrentMode] = useState('overview');

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('adminSidebarCollapsed', newState.toString());
  };

  return (
    <div className="app-frame admin-dashboard">
      <div className="app-container">
        <AdminHeader 
          toggleSidebar={toggleSidebar} 
          currentMode={currentMode} 
          setCurrentMode={setCurrentMode} 
        />
        <div className="main-container">
          <Sidebar collapsed={sidebarCollapsed} />
          <main className="main-content-wrapper">
            <div className={`mode-content ${currentMode === 'overview' ? 'active' : ''}`}>
              <div className="dashboard-header-section">
                <div className="dashboard-header-left">
                  <h1 className="dashboard-title">
                    {currentMode === 'overview' ? 'Admin dashboard' : 'Control Panel'}
                  </h1>
                  <p className="dashboard-subtitle">
                    {currentMode === 'overview' 
                      ? 'Real-time overview of queues, staff load and service performance' 
                      : 'Manage queues, staff, and system settings'}
                  </p>
                </div>
                <div className="dashboard-header-right">
                  <div className="header-mode-switcher">
                    <button 
                      className={`header-mode-btn ${currentMode === 'overview' ? 'active' : ''}`} 
                      onClick={() => setCurrentMode('overview')}
                    >
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="6" height="6" rx="1" fill="currentColor" />
                        <rect x="10" y="2" width="6" height="6" rx="1" fill="currentColor" />
                        <rect x="2" y="10" width="6" height="6" rx="1" fill="currentColor" />
                        <rect x="10" y="10" width="6" height="6" rx="1" fill="currentColor" />
                      </svg>
                      <span>Overview</span>
                    </button>
                    <button 
                      className={`header-mode-btn ${currentMode === 'control' ? 'active' : ''}`} 
                      onClick={() => setCurrentMode('control')}
                    >
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        <path d="M9 2V4M9 14V16M16 9H14M4 9H2M14.5 3.5L13 5M5 13L3.5 14.5M14.5 14.5L13 13M5 5L3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span>Control</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {currentMode === 'overview' ? <OverviewMode /> : <ControlMode />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
