import React from 'react';

const StaffTable = () => {
  const staff = [
    { name: 'Dr.Jay Mehta', avatar: 'JM', role: 'Consultant b7 General Medicine', load: '10 waiting', status: 'High load', statusClass: 'high-load' },
    { name: 'Dr.Kirtan Makadia', avatar: 'KM', role: 'Consultant 022 Orthopaedics', load: '4 waiting', status: 'Normal', statusClass: 'normal' },
    { name: 'Reception - Counter 1', avatar: 'RC', role: 'Front Desk', load: '7 in flow', status: 'Online', statusClass: 'online' },
    { name: 'Emergency Nurse', avatar: 'EN', role: 'Emergency Triage Nurse', load: '9 in queue', status: 'Busy', statusClass: 'busy' }
  ];

  return (
    <div className="staff-load-section">
      <div className="section-header">
        <div className="section-header-left">
          <div className="section-title-wrapper">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="7" r="3" fill="#262626" />
              <path d="M4 16C4 13 6 11 10 11C14 11 16 13 16 16" stroke="#262626" strokeWidth="1.5" fill="none" />
            </svg>
            <h2 className="section-title">Doctor & staff load</h2>
          </div>
          <p className="section-subtitle">Monitor current assignments and availability</p>
        </div>
      </div>

      <div className="staff-table">
        <div className="table-header-row">
          <div className="table-header-cell">Staff</div>
          <div className="table-header-cell">Role</div>
          <div className="table-header-cell">Current queue</div>
          <div className="table-header-cell">Status</div>
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
            <div className="table-cell">{s.load}</div>
            <div className="table-cell">
              <span className={`status-badge ${s.statusClass}`}>{s.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffTable;
