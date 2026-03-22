import React from 'react';

const ControlMode = () => {
  const queues = [
    { id: 'general-medicine', name: 'General Medicine', waiting: 32, avgWait: '12 min', active: true },
    { id: 'orthopedics', name: 'Orthopedics', waiting: 12, avgWait: '08 min', active: true },
    { id: 'pediatrics', name: 'Pediatrics', waiting: 9, avgWait: '25 min', active: true },
    { id: 'emergency', name: 'Emergency', waiting: 2, avgWait: '45 min', active: true }
  ];

  const staff = [
    { name: 'Dr.Jay Mehta', avatar: 'JM', role: 'Consultant', dept: 'General Medicine', active: true },
    { name: 'Dr.Kirtan Makadia', avatar: 'KM', role: 'Consultant', dept: 'Orthopaedics', active: true },
    { name: 'Reception - Counter 1', avatar: 'RC', role: 'Front Desk', dept: 'Reception', active: true },
    { name: 'Emergency Nurse', avatar: 'EN', role: 'Triage Nurse', dept: 'Emergency', active: true }
  ];

  return (
    <div className="main-content">
      {/* Control Header */}
      <div className="control-header-section">
        <div className="control-header-left">
          <h1 className="control-title" style={{ fontSize: '28px', fontWeight: 700, color: '#262626' }}>Control Panel</h1>
          <p className="control-subtitle" style={{ fontSize: '14px', color: '#7B7B7B' }}>Manage queues, staff, and system settings</p>
        </div>
      </div>

      {/* Queue Management Section */}
      <div className="control-section">
        <div className="section-header">
          <div className="section-title-wrapper">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5H17M3 10H17M3 15H17" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <h2 className="section-title">Queue Management</h2>
          </div>
        </div>

        <div className="queue-controls-grid">
          {queues.map((q, index) => (
            <div className="queue-control-card" key={index}>
              <div className="queue-control-header">
                <h3>{q.name}</h3>
                <div className="queue-status-toggle">
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked={q.active} />
                    <span className="toggle-slider"></span>
                  </label>
                  <span className={`status-label ${q.active ? 'active' : 'inactive'}`}>
                    {q.active ? 'Active' : 'Paused'}
                  </span>
                </div>
              </div>
              <div className="queue-control-body">
                <div className="control-stat">
                  <span className="control-label">Waiting:</span>
                  <span className="control-value">{q.waiting}</span>
                </div>
                <div className="control-stat">
                  <span className="control-label">Avg Wait:</span>
                  <span className="control-value">{q.avgWait}</span>
                </div>
                <div className="queue-actions">
                  <button className="btn-action btn-pause">Pause Queue</button>
                  <button className="btn-action btn-reset">Reset Queue</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Management Section */}
      <div className="control-section">
        <div className="section-header">
          <div className="section-header-left">
            <div className="section-title-wrapper">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="7" r="3" fill="#262626" />
                <path d="M4 16C4 13 6 11 10 11C14 11 16 13 16 16" stroke="#262626" strokeWidth="1.5" fill="none" />
              </svg>
              <h2 className="section-title">Add Staff</h2>
            </div>
          </div>
          <div className="section-controls">
            <div className="filter-buttons">
              <button className="filter-btn active">All</button>
              <button className="filter-btn">Doctors</button>
              <button className="filter-btn">Reception</button>
            </div>
            <div className="table-controls">
              <input type="text" className="table-search" placeholder="Search staff..." id="staffSearch" />
              <button className="btn-add-staff">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3V13M3 8H13" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>Add Staff</span>
              </button>
            </div>
          </div>
        </div>

        <div className="staff-control-table">
          <div className="table-header-row">
            <div className="table-header-cell">Staff</div>
            <div className="table-header-cell">Role</div>
            <div className="table-header-cell">Department</div>
            <div className="table-header-cell">Status</div>
            <div className="table-header-cell">Actions</div>
          </div>
          {staff.map((s, index) => (
            <div className="table-row" key={index}>
              <div className="table-cell">
                <div className="staff-info">
                  <div className="staff-avatar">{s.avatar}</div>
                  <span>{s.name}</span>
                </div>
              </div>
              <div className="table-cell">{s.role}</div>
              <div className="table-cell">{s.dept}</div>
              <div className="table-cell">
                <label className="toggle-switch small">
                  <input type="checkbox" defaultChecked={s.active} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="table-cell">
                <button className="btn-icon" title="Edit">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2L12 6M10 1L13 4L10 7L7 4L10 1Z" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12V13H3L10 6L9 5L2 12Z" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button className="btn-icon" title="Delete">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3.5H11M5.5 3.5V2.5C5.5 2.2 5.7 2 6 2H8C8.3 2 8.5 2.2 8.5 2.5V3.5M11 3.5V12C11 12.3 10.8 12.5 10.5 12.5H3.5C3.2 12.5 3 12.3 3 12V3.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M5.5 6V10M8.5 6V10" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ControlMode;
