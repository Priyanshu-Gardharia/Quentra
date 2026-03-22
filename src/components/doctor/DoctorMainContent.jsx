import React from 'react';

export default function DoctorMainContent({ onMarkCompleted, onCallNext, onPutOnHold }) {
  return (
    <main className="main-content-wrapper">
      <div className="main-content">
        <div className="dashboard-header-section">
          <div>
            <h1 className="dashboard-title">Doctor dashboard</h1>
            <p className="dashboard-subtitle">Personal queue view, upcoming patients and consultation status</p>
          </div>
        </div>

        <div className="opd-queue-card">
          <div className="opd-header">
            <div className="opd-header-left">
              <h2 className="opd-title">My OPD Queue</h2>
              <p className="consultation-details">Consulting : General Medicine - Room 204</p>
            </div>
            <div className="opd-header-center">
              <div className="availability-status">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="6" cy="6" r="5" fill="#10B981" />
                  <circle cx="6" cy="6" r="2" fill="#FFFFFF" />
                </svg>
                <span>Available</span>
              </div>
              <p className="avg-consult-time">Average consult : 15 min</p>
            </div>
            <div className="opd-header-right">
              <div className="doctor-info-main">
                <div className="doctor-name-main">Dr. Ritesh Sharma</div>
                <div className="doctor-specialty">General Physician</div>
              </div>
              <div className="doctor-initials-circle">
                <span>RS</span>
              </div>
            </div>
          </div>

          <div className="metrics-row">
            <div className="metric-card">
              <div className="metric-icon icon-blue">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="5" r="2.5" stroke="#262626" strokeWidth="1.2" />
                  <path d="M3.5 13C3.5 10.8 5 9.3 8 9.3C11 9.3 12.5 10.8 12.5 13" stroke="#262626" strokeWidth="1.2" />
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
                  <circle cx="8" cy="8" r="5.5" stroke="#262626" strokeWidth="1.2" />
                  <path d="M8 5V8L10 10" stroke="#262626" strokeWidth="1.2" strokeLinecap="round" />
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
                  <path d="M8 2L14 13H2L8 2Z" stroke="#262626" strokeWidth="1.2" />
                  <path d="M8 6V9" stroke="#262626" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="8" cy="11.3" r="0.8" fill="#262626" />
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
                  <path d="M3 8L6.2 11.2L13 4.5" stroke="#262626" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="metric-text">
                <div className="metric-label">Completed Today</div>
                <div className="metric-value">7</div>
              </div>
            </div>
          </div>
        </div>

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
            <button className="btn-primary" onClick={onMarkCompleted}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="6" height="6" rx="1" fill="white" />
                <rect x="10" y="2" width="6" height="6" rx="1" fill="white" />
                <rect x="2" y="10" width="6" height="6" rx="1" fill="white" />
                <rect x="10" y="10" width="6" height="6" rx="1" fill="white" />
              </svg>
              <span>Mark as completed</span>
            </button>
            <button className="btn-secondary" onClick={onCallNext}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 3H14V13H4V3Z" stroke="#262626" strokeWidth="1.5" fill="none" />
                <path d="M9 7V11M7 9H11" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14 13L16 15L14 17" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Call Next Person</span>
            </button>
            <button className="btn-secondary" onClick={onPutOnHold}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="7" r="3" fill="#262626" />
                <path d="M4 16C4 12 6.5 10 9 10C11.5 10 14 12 14 16" stroke="#262626" strokeWidth="2" fill="none" />
                <rect x="7" y="4" width="2" height="6" fill="#262626" />
              </svg>
              <span>Put On Hold</span>
            </button>
          </div>
        </div>

        <div className="patients-queue-card">
          <div className="queue-card-header">
            <div className="queue-header-content">
              <div className="queue-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="5" width="18" height="14" rx="2" fill="#3A8EEB" fillOpacity="0.1" />
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="#3A8EEB" strokeWidth="1.5" />
                  <path d="M8 10H16M8 14H14M8 18H12" stroke="#3A8EEB" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="19" cy="7" r="2" fill="#10B981" />
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
  );
}
