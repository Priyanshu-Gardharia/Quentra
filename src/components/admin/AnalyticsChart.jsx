import React, { useState, useEffect, useRef } from 'react';

const AnalyticsChart = () => {
  const [chartType, setChartType] = useState('bar');
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    
    const drawChart = () => {
      canvas.width = container.clientWidth;
      canvas.height = 300;
      const { width, height } = canvas;
      
      ctx.clearRect(0, 0, width, height);
      
      const departments = ['General Medicine', 'Orthopedics', 'Pediatrics', 'Emergency'];
      const values = [32, 12, 9, 2];
      const colors = ['#3A8EEB', '#10B981', '#F59E0B', '#EF4444'];
      
      const padding = 40;
      const chartWidth = width - padding * 2;
      const chartHeight = height - padding * 2;
      const maxValue = Math.max(...values);
      
      // Draw grid
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }
      
      if (chartType === 'bar') {
        const barWidth = chartWidth / departments.length * 0.6;
        const barSpacing = chartWidth / departments.length;
        
        departments.forEach((dept, index) => {
          const barHeight = (values[index] / maxValue) * chartHeight;
          const x = padding + index * barSpacing + (barSpacing - barWidth) / 2;
          const y = padding + chartHeight - barHeight;
          
          ctx.fillStyle = colors[index];
          ctx.fillRect(x, y, barWidth, barHeight);
          
          ctx.fillStyle = '#262626';
          ctx.font = '12px Inter';
          ctx.textAlign = 'center';
          ctx.fillText(values[index].toString(), x + barWidth / 2, y - 5);
          
          ctx.fillStyle = '#7B7B7B';
          ctx.font = '10px Inter';
          ctx.save();
          ctx.translate(x + barWidth / 2, padding + chartHeight + 15);
          ctx.rotate(-Math.PI / 4);
          ctx.fillText(dept.substring(0, 8), 0, 0);
          ctx.restore();
        });
      } else if (chartType === 'line') {
        const pointSpacing = chartWidth / (departments.length - 1);
        const points = departments.map((dept, index) => ({
          x: padding + index * pointSpacing,
          y: padding + chartHeight - (values[index] / maxValue) * chartHeight
        }));
        
        ctx.strokeStyle = '#3A8EEB';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        
        points.forEach((point, index) => {
          ctx.fillStyle = colors[index];
          ctx.beginPath();
          ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = '#262626';
          ctx.font = '11px Inter';
          ctx.textAlign = 'center';
          ctx.fillText(values[index].toString(), point.x, point.y - 10);
        });
      } else if (chartType === 'pie') {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - padding;
        const total = values.reduce((sum, val) => sum + val, 0);
        let currentAngle = -Math.PI / 2;
        
        values.forEach((value, index) => {
          const sliceAngle = (value / total) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
          ctx.closePath();
          ctx.fillStyle = colors[index];
          ctx.fill();
          currentAngle += sliceAngle;
        });
      }
    };

    drawChart();
    window.addEventListener('resize', drawChart);
    return () => window.removeEventListener('resize', drawChart);
  }, [chartType]);

  return (
    <div className="analytics-section">
      <div className="section-header">
        <div className="section-header-left">
          <div className="section-title-wrapper">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="6" stroke="#262626" strokeWidth="1.5" fill="none" />
              <path d="M14 14L17 17" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <h2 className="section-title">Queue Analytics</h2>
          </div>
        </div>
        <div className="chart-toggle-buttons">
          <button className={`chart-toggle-btn ${chartType === 'bar' ? 'active' : ''}`} onClick={() => setChartType('bar')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="8" width="3" height="6" rx="1" fill="currentColor" />
              <rect x="6.5" y="5" width="3" height="9" rx="1" fill="currentColor" />
              <rect x="11" y="3" width="3" height="11" rx="1" fill="currentColor" />
            </svg>
            <span>Bar</span>
          </button>
          <button className={`chart-toggle-btn ${chartType === 'line' ? 'active' : ''}`} onClick={() => setChartType('line')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12L5 9L8 11L13 4L14 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="2" cy="12" r="1.5" fill="currentColor" />
              <circle cx="5" cy="9" r="1.5" fill="currentColor" />
              <circle cx="8" cy="11" r="1.5" fill="currentColor" />
              <circle cx="13" cy="4" r="1.5" fill="currentColor" />
              <circle cx="14" cy="5" r="1.5" fill="currentColor" />
            </svg>
            <span>Line</span>
          </button>
          <button className={`chart-toggle-btn ${chartType === 'pie' ? 'active' : ''}`} onClick={() => setChartType('pie')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M8 2C9.5 2 10.8 2.5 11.8 3.3L8 8V2Z" fill="currentColor" />
              <path d="M14 8C14 10.2 12.8 12.1 11 13.1L8 8H14Z" fill="currentColor" />
            </svg>
            <span>Pie</span>
          </button>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-header">
          <h3 className="chart-title">Patients per Department</h3>
          <p className="chart-subtitle">Patients in queue</p>
        </div>
        <div className="chart-placeholder">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
