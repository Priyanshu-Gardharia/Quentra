import React from 'react';
import StatCard from './StatCard';
import DepartmentTable from './DepartmentTable';
import AnalyticsChart from './AnalyticsChart';
import StaffTable from './StaffTable';

const OverviewMode = () => {
  return (
    <div className="main-content">
      {/* Dashboard Actions Bar */}
      <div className="dashboard-actions-bar">
        <div className="search-box">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="5" stroke="#7B7B7B" strokeWidth="1.5" fill="none" />
            <path d="M12 12L15 15" stroke="#7B7B7B" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input type="text" id="globalSearch" placeholder="Search..." />
        </div>
        <div className="actions-group">
          <button className="btn-refresh" id="refreshBtn" title="Refresh data">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9C3 6.2 5.2 4 8 4C9.5 4 10.8 4.6 11.7 5.5M15 9C15 11.8 12.8 14 10 14C8.5 14 7.2 13.4 6.3 12.5M6.3 12.5L4 15M6.3 12.5L8 10M11.7 5.5L14 3M11.7 5.5L10 8" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="btn-notifications" id="notificationsBtn" title="Notifications">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 3C10.7 3 12 4.3 12 6V9C12 11 13 12 13 12H5C5 12 6 11 6 9V6C6 4.3 7.3 3 9 3Z" stroke="#262626" strokeWidth="1.5" fill="none" />
              <path d="M7 12V13C7 14.1 7.9 15 9 15C10.1 15 11 14.1 11 13V12" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="notification-badge" id="notificationBadge">3</span>
          </button>
          <button className="btn-export">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 3V12M9 12L5 8M9 12L13 8" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 15H15" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Overview Statistics */}
      <div className="overview-stats">
        <StatCard
          iconColor="rgba(58, 142, 235, 0.1)"
          iconSvg={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4" fill="#3A8EEB" />
              <path d="M5 20C5 16 7.5 14 12 14C16.5 14 19 16 19 20" stroke="#3A8EEB" strokeWidth="2" fill="none" />
            </svg>
          }
          label="Total waiting patients"
          value="120"
          change="+12% from yesterday"
          positive
        />
        <StatCard
          iconColor="rgba(16, 185, 129, 0.1)"
          iconSvg={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" fill="none" />
              <path d="M12 6V12L16 16" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            </svg>
          }
          label="Avg wait (all)"
          value="18 min"
          change="-3 min from yesterday"
          negative
        />
        <StatCard
          iconColor="rgba(245, 158, 11, 0.1)"
          iconSvg={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#F59E0B" strokeWidth="2" fill="none" />
              <path d="M3 10H21" stroke="#F59E0B" strokeWidth="2" />
              <path d="M8 4V10" stroke="#F59E0B" strokeWidth="2" />
            </svg>
          }
          label="Today"
          value="56"
          change="tokens issued"
        />
        <StatCard
          iconColor="rgba(239, 68, 68, 0.1)"
          iconSvg={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="#EF4444" strokeWidth="2" fill="none" />
              <path d="M2 8H22" stroke="#EF4444" strokeWidth="2" />
              <circle cx="6" cy="6" r="1" fill="#EF4444" />
            </svg>
          }
          label="Counters open"
          value="4"
          change="of 6 total"
        />
      </div>

      <DepartmentTable />
      <AnalyticsChart />
      <StaffTable />
    </div>
  );
};

export default OverviewMode;
