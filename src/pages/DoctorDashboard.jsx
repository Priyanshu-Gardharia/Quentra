import React, { useState, useEffect } from 'react';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('myqueue');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      const day = days[now.getDay()];
      const month = months[now.getMonth()];
      const date = now.getDate();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      setDateTime(`${day} , ${month} ${date} | ${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => setSidebarCollapsed(prev => !prev);

  return (
    <div className="doctor-dashboard-page">
      <div className="app-frame">
        <div className="app-container">

          {/* Header */}
          <header className="main-header">
            <div className="header-left">
              <button className="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar" onClick={toggleSidebar}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5H17M3 10H17M3 15H17" stroke="#262626" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              <div className="quentra-logo">QUENTRA</div>
            </div>
            <div className="date-time">{dateTime}</div>
          </header>

          {/* Main Container */}
          <div className="main-container">

            {/* Left Sidebar */}
            <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} id="sidebar">

              {/* Doctor Profile Card */}
              <div className="doctor-profile-card">
                <div className="doctor-icon-circle">
                  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#3A8EEB"/>
                    <path d="M20 12V20M16 16H24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M12 28C12 24 15 22 20 22C25 22 28 24 28 28" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="doctor-info">
                  <div className="doctor-name">Dr.abc</div>
                  <div className="doctor-role">Consultation</div>
                </div>
              </div>

              <div className="sidebar-divider"></div>

              {/* Today Navigation Section */}
              <div className="nav-section">
                <h3 className="nav-section-title">Today</h3>
                <nav className="nav-menu">
                  <div className={`nav-item ${activeNav === 'myqueue' ? 'active' : ''}`} onClick={() => setActiveNav('myqueue')}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6H17M3 10H17M3 14H17" stroke="#3A8EEB" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="15" cy="5" r="1.5" fill="#3A8EEB"/>
                    </svg>
                    <span>My Queue</span>
                  </div>
                  <div className={`nav-item ${activeNav === 'pastvisits' ? 'active' : ''}`} onClick={() => setActiveNav('pastvisits')}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H16V16H4V4Z" stroke="#10B981" strokeWidth="1.5" fill="none"/>
                      <path d="M4 8H16" stroke="#10B981" strokeWidth="1.5"/>
                      <path d="M8 4V8" stroke="#10B981" strokeWidth="1.5"/>
                      <circle cx="15" cy="5" r="1.5" fill="#10B981"/>
                    </svg>
                    <span>Past visits</span>
                  </div>
                  <div className={`nav-item ${activeNav === 'reports' ? 'active' : ''}`} onClick={() => setActiveNav('reports')}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="8" width="14" height="9" rx="1" stroke="#F59E0B" strokeWidth="1.5" fill="none"/>
                      <path d="M6 8V5C6 3.89543 6.89543 3 8 3H12C13.1046 3 14 3.89543 14 5V8" stroke="#F59E0B" strokeWidth="1.5"/>
                      <path d="M7 12H13M7 15H10" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="15" cy="5" r="1.5" fill="#F59E0B"/>
                    </svg>
                    <span>Reports</span>
                  </div>
                </nav>
              </div>

              <div className="sidebar-divider"></div>

              {/* Quick Action Section */}
              <div className="nav-section">
                <h3 className="nav-section-title">Quick Action</h3>
                <nav className="nav-menu">
                  <div className="nav-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="7" y="4" width="2" height="12" fill="#F59E0B"/>
                      <rect x="11" y="4" width="2" height="12" fill="#F59E0B"/>
                      <circle cx="15" cy="5" r="1.5" fill="#F59E0B"/>
                    </svg>
                    <span>Pause Queue</span>
                  </div>
                  <div className="nav-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H16V16H4V4Z" stroke="#EF4444" strokeWidth="1.5" fill="none"/>
                      <path d="M8 8H12V12H8V8Z" fill="#EF4444"/>
                      <circle cx="15" cy="5" r="1.5" fill="#EF4444"/>
                    </svg>
                    <span>Mark next as Urgent</span>
                  </div>
                  <div className="nav-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="6" width="12" height="10" rx="1" stroke="#3A8EEB" strokeWidth="1.5" fill="none"/>
                      <path d="M4 8H16" stroke="#3A8EEB" strokeWidth="1.5"/>
                      <path d="M6 12H14" stroke="#3A8EEB" strokeWidth="1.5"/>
                      <path d="M6 15H10" stroke="#3A8EEB" strokeWidth="1.5"/>
                      <rect x="7" y="2" width="6" height="4" rx="0.5" fill="#3A8EEB"/>
                    </svg>
                    <span>Print token</span>
                  </div>
                </nav>
                <div className="expand-icon">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="#7B7B7B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <div className="sidebar-divider"></div>

              {/* Appointments Summary */}
              <div className="appointments-summary">
                <div className="summary-item">Today: 24 appointments</div>
                <div className="summary-item">Completed: 7</div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content-wrapper">
              <div className="main-content">

                {/* Dashboard Title Section */}
                <div className="dashboard-header-section">
                  <div>
                    <h1 className="dashboard-title">Doctor dashboard</h1>
                    <p className="dashboard-subtitle">Personal queue view , upcoming patients and consultation status</p>
                  </div>
                </div>

                {/* Top Info Card - OPD Queue */}
                <div className="opd-queue-card">
                  <div className="opd-header">
                    <div className="opd-header-left">
                      <h2 className="opd-title">My OPD Queue</h2>
                      <p className="consultation-details">Consulting : General Medicine - Room 204</p>
                    </div>
                    <div className="opd-header-center">
                      <div className="availability-status">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="6" cy="6" r="5" fill="#10B981"/>
                          <circle cx="6" cy="6" r="2" fill="#FFFFFF"/>
                        </svg>
                        <span>Available</span>
                      </div>
                      <p className="avg-consult-time">Average consult : 15 min</p>
                    </div>
                    <div className="opd-header-right">
                      <div className="doctor-info-main">
                        <div className="doctor-name-main">Dr.Ritesh Sharma</div>
                        <div className="doctor-specialty">General Physician</div>
                      </div>
                      <div className="doctor-initials-circle">
                        <span>RS</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Statistics Card */}
                <div className="stats-card">
                  <div className="metrics-row">
                    <div className="metric-card">
                      <div className="metric-icon icon-blue">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="5" r="2.5" stroke="#262626" strokeWidth="1.2"/>
                          <path d="M3.5 13C3.5 10.8 5 9.3 8 9.3C11 9.3 12.5 10.8 12.5 13" stroke="#262626" strokeWidth="1.2"/>
                        </svg>
                      </div>
                      <div className="metric-text">
                        <div className="metric-label">Patients Waiting</div>
                        <div className="metric-value">9</div>
                      </div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-icon icon-sky">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8" r="5.5" stroke="#262626" strokeWidth="1.2"/>
                          <path d="M8 5V8L10 10" stroke="#262626" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="metric-text">
                        <div className="metric-label">Avg Waiting Time</div>
                        <div className="metric-value">11 min</div>
                      </div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-icon icon-red">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 2L14 13H2L8 2Z" stroke="#262626" strokeWidth="1.2"/>
                          <path d="M8 6V9" stroke="#262626" strokeWidth="1.2" strokeLinecap="round"/>
                          <circle cx="8" cy="11.3" r="0.8" fill="#262626"/>
                        </svg>
                      </div>
                      <div className="metric-text">
                        <div className="metric-label">Urgent Tokens</div>
                        <div className="metric-value">1</div>
                      </div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-icon icon-green">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 8L6.2 11.2L13 4.5" stroke="#262626" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="metric-text">
                        <div className="metric-label">Completed Today</div>
                        <div className="metric-value">7</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Consultation Card */}
                <div className="current-consultation-card">
                  <div className="consultation-header">
                    <div>
                      <h3 className="consultation-title">Current consultation</h3>
                      <p className="consultation-subtitle">Actively in room</p>
                    </div>
                  </div>
                  <div className="patient-info-section">
                    <div className="patient-info-left">
                      <div className="patient-token-name">
                        <span className="token-badge">Token P-16</span>
                        <span className="patient-name">Kishan Patel</span>
                      </div>
                      <div className="patient-details">Male • 45 years - MRN : 009234</div>
                    </div>
                    <div className="patient-info-right">
                      <div className="priority-badge-normal">Normal</div>
                      <div className="consultation-time">Consultation started 5 min ago</div>
                    </div>
                  </div>
                  <div className="action-buttons">
                    <button className="btn-primary">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="6" height="6" rx="1" fill="white"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" fill="white"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" fill="white"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" fill="white"/>
                      </svg>
                      <span>Mark as completed</span>
                    </button>
                    <button className="btn-secondary">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 3H14V13H4V3Z" stroke="#262626" strokeWidth="1.5" fill="none"/>
                        <path d="M9 7V11M7 9H11" stroke="#262626" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M14 13L16 15L14 17" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Call Next Person</span>
                    </button>
                    <button className="btn-secondary">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="7" r="3" fill="#262626"/>
                        <path d="M4 16C4 12 6.5 10 9 10C11.5 10 14 12 14 16" stroke="#262626" strokeWidth="2" fill="none"/>
                        <rect x="7" y="4" width="2" height="6" fill="#262626"/>
                      </svg>
                      <span>Put On Hold</span>
                    </button>
                  </div>
                </div>

                {/* Patients In Queue Card */}
                <div className="patients-queue-card">
                  <div className="queue-card-header">
                    <div className="queue-header-content">
                      <div className="queue-icon-wrapper">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="5" width="18" height="14" rx="2" fill="#3A8EEB" fillOpacity="0.1"/>
                          <rect x="3" y="5" width="18" height="14" rx="2" stroke="#3A8EEB" strokeWidth="1.5"/>
                          <path d="M8 10H16M8 14H14M8 18H12" stroke="#3A8EEB" strokeWidth="1.5" strokeLinecap="round"/>
                          <circle cx="19" cy="7" r="2" fill="#10B981"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="queue-card-title">Patients In Queue</h3>
                        <p className="queue-card-subtitle">Ordered by priority and arrival time</p>
                      </div>
                    </div>
                  </div>
                  <div className="patients-table">
                    <div className="table-header-row">
                      <div className="table-header-cell">Token/Name</div>
                      <div className="table-header-cell">Details</div>
                      <div className="table-header-cell">Priority</div>
                      <div className="table-header-cell">Waiting</div>
                    </div>
                    <div className="table-row">
                      <div className="table-cell">
                        <div className="token-name-cell">
                          <span className="token-code">G-34</span>
                          <span className="patient-name-cell">Sunita Verma</span>
                        </div>
                      </div>
                      <div className="table-cell">Female • 30 years</div>
                      <div className="table-cell">
                        <span className="priority-badge-urgent">Urgent</span>
                      </div>
                      <div className="table-cell">13 min</div>
                    </div>
                    <div className="table-row">
                      <div className="table-cell">
                        <div className="token-name-cell">
                          <span className="token-code">P-14</span>
                          <span className="patient-name-cell">Rakesh Kumar</span>
                        </div>
                      </div>
                      <div className="table-cell">Male • 25 years</div>
                      <div className="table-cell">
                        <span className="priority-badge-normal">Normal</span>
                      </div>
                      <div className="table-cell">8 min</div>
                    </div>
                    <div className="table-row">
                      <div className="table-cell">
                        <div className="token-name-cell">
                          <span className="token-code">K-8</span>
                          <span className="patient-name-cell">Mital Patel</span>
                        </div>
                      </div>
                      <div className="table-cell">Male • 15 years</div>
                      <div className="table-cell">
                        <span className="priority-badge-normal">Normal</span>
                      </div>
                      <div className="table-cell">5 min</div>
                    </div>
                  </div>
                  <div className="queue-summary-footer">
                    <div className="footer-left">Patients in queue : 9</div>
                    <div className="footer-right">Estimated time to clear : 1 hr 40 min</div>
                  </div>
                </div>

              </div>
            </main>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
