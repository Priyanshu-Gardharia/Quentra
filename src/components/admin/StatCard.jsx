import React from 'react';

const StatCard = ({ iconColor, iconSvg, label, value, change, positive, negative }) => {
  let changeClass = 'stat-change';
  if (positive) changeClass += ' positive';
  if (negative) changeClass += ' negative';

  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: iconColor }}>
        {iconSvg}
      </div>
      <div className="stat-content">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
        <div className={changeClass}>
          {change}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
