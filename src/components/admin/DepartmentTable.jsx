import React from 'react';

const DepartmentTable = () => {
  const departments = [
    { name: 'General Medicine', waiting: 32, avgWait: 12, status: 'Busy', statusClass: 'busy' },
    { name: 'Orthopedics', waiting: 12, avgWait: 8, status: 'Healthy', statusClass: 'healthy' },
    { name: 'Pediatrics', waiting: 9, avgWait: 25, status: 'Action needed', statusClass: 'action-needed' },
    { name: 'Emergency', waiting: 2, avgWait: 45, status: 'protected', statusClass: 'protected' }
  ];

  return (
    <div className="queues-section">
      <div className="section-header">
        <div className="section-header-left">
          <div className="section-title-wrapper">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5H17M3 10H17M3 15H17" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <h2 className="section-title">Queues by department</h2>
          </div>
          <p className="section-subtitle">Prioritize based on wait time and load</p>
        </div>
      </div>

      <div className="section-controls">
        <div className="filter-buttons">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">OPD</button>
          <button className="filter-btn">Emergency</button>
        </div>
        <div className="table-controls">
          <input type="text" className="table-search" placeholder="Search departments..." id="queueSearch" />
          <button className="btn-sort">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 3L7 6L10 3" stroke="#7B7B7B" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M4 11L7 8L10 11" stroke="#7B7B7B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="queues-table">
        <div className="table-header-row">
          <div className="table-header-cell">Department</div>
          <div className="table-header-cell">Waiting</div>
          <div className="table-header-cell">Avg waiting</div>
          <div className="table-header-cell">Status</div>
        </div>
        {departments.map((dept, index) => (
          <div className="table-row" key={index}>
            <div className="table-cell">{dept.name}</div>
            <div className="table-cell">{dept.waiting}</div>
            <div className="table-cell">{dept.avgWait}</div>
            <div className="table-cell">
              <span className={`status-badge ${dept.statusClass}`}>{dept.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentTable;
