import React from 'react';

const QueueCard = ({ title, room, nowServing, nextToken, avgWait, icon, avgWaitColor }) => {
  return (
    <article className="queueCard">
      <div className="cardHeader">
        <div>
          <h2 className="cardTitle" style={{ fontSize: '24px', fontWeight: 600 }}>{title}</h2>
          <p className="cardRoom" style={{ margin: '4px 0 16px 0', fontSize: '14px', color: '#64748b' }}>{room}</p>
        </div>
        {icon && <img className="cardIcon" src={icon} alt="" aria-hidden="true" style={{ width: '28px', height: '28px', opacity: 0.6 }} />}
      </div>

      <div className="nowServingCard">
        <span className="nowServingLabel">Now Serving</span>
        <span className="nowServingValue">{nowServing}</span>
      </div>

      <div className="cardMetrics" style={{ borderTop: 'none', marginTop: '20px' }}>
        <div className="metricGroup">
          <span className="metricLabel">Next Token</span>
          <span className="nextTokenValue" style={{ fontSize: '18px', fontWeight: 600 }}>{nextToken}</span>
        </div>
        <div className="metricGroup" style={{ textAlign: 'right' }}>
          <span className="metricLabel">Avg wait</span>
          <span className="avgWaitValue" style={{ color: avgWaitColor, fontSize: '18px', fontWeight: 600 }}>{avgWait}</span>
        </div>
      </div>
    </article>
  );
};

export default QueueCard;
