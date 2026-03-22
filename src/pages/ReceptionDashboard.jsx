import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Utilizing existing CSS globals

function ReceptionDashboard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: '',
    visitType: '',
    priority: 'normal',
    department: '',
    mobileNumber: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [queues, setQueues] = useState({ 
    1: { total_waiting: 0, avg_wait_time: 0, current_serving_number: null },
    2: { total_waiting: 0, avg_wait_time: 0, current_serving_number: null },
    3: { total_waiting: 0, avg_wait_time: 0, current_serving_number: null }
  });

  const fetchQueues = async () => {
    try {
      const qs = { ...queues };
      for (let dep_id of [1, 2, 3]) {
        const res = await fetch(`http://localhost:5000/api/queue/status?dep_id=${dep_id}`);
        if(res.ok) {
           const data = await res.json();
           if (data.success) qs[dep_id] = data.summary;
        }
      }
      setQueues(qs);
    } catch (err) {
      console.error('Failed to fetch queues', err);
    }
  };

  useEffect(() => {
    fetchQueues();
    const interval = setInterval(fetchQueues, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleIssueToken = async () => {
    if (!formData.patientName || !formData.mobileNumber || !formData.department || !formData.visitType) {
      alert("Please fill all required fields (Name, Mobile, Department, Visit Type)");
      return;
    }

    setLoading(true);
    try {
      // 1. Register Patient
      const patRes = await fetch('http://localhost:5000/api/patient/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          patient_name: formData.patientName, 
          mobile_number: formData.mobileNumber 
        })
      });
      const patData = await patRes.json();
      
      if (!patData.success) throw new Error(patData.message);
      const p_id = patData.data.p_id;

      let dep_id = 1; 
      if (formData.department === 'orthopedics') dep_id = 2;
      if (formData.department === 'pediatrics') dep_id = 3;

      // 2. Generate Token
      const tokRes = await fetch('http://localhost:5000/api/tokens/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          p_id,
          dep_id,
          visit_type: formData.visitType,
          priority: formData.priority || 'normal',
          notes: formData.notes
        })
      });
      const tokData = await tokRes.json();

      if (!tokData.success) throw new Error(tokData.message);

      alert(`Token Generated Successfully! Token Number: ${tokData.data.token_no}`);
      
      setFormData({
        patientName: '', visitType: '', priority: 'normal', department: '', mobileNumber: '', notes: ''
      });
      
      fetchQueues();
    } catch (err) {
      alert("Error issuing token: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalWaitingCount = queues[1].total_waiting + queues[2].total_waiting + queues[3].total_waiting;
  const overallAvgWait = Math.round((queues[1].avg_wait_time + queues[2].avg_wait_time + queues[3].avg_wait_time)/3);

  return (
    <div className="app">
        {/* Main Header Area */}
        <header className="main-header">
            <div className="header-left">
                <button className="sidebar-toggle" aria-label="Toggle sidebar">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5H17M3 10H17M3 15H17" stroke="#262626" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </button>
                <div className="quentra-logo">QUENTRA</div>
            </div>
            <div className="date-time">Wednesday, October 25 | 9:40 PM</div>
            <div className="staff-login" onClick={() => navigate('/login')} style={{cursor: 'pointer'}}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5L12 10L8 15" stroke="#4F4F4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="3" y="4" width="14" height="12" rx="1" stroke="#4F4F4F" strokeWidth="1.5" fill="none"/>
                </svg>
                <span>Staff login</span>
            </div>
        </header>

        {/* Main Container */}
        <div className="main-container">
            {/* Left Sidebar */}
            <aside className="sidebar">
                <div className="reception-desk-card">
                    <div className="reception-icon-circle">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="18" stroke="#3A8EEB" strokeWidth="2" fill="none"/>
                            <circle cx="20" cy="15" r="5" fill="#3A8EEB"/>
                            <path d="M10 30C10 25 14 22 20 22C26 22 30 25 30 30" stroke="#3A8EEB" strokeWidth="2" fill="none"/>
                        </svg>
                    </div>
                    <div className="reception-desk-text">
                        <div className="reception-text">Reception</div>
                        <div className="desk-text">Desk 1</div>
                    </div>
                </div>

                <div className="sidebar-divider"></div>

                <div className="actions-section">
                    <h3 className="section-title">Actions</h3>
                    <div className="action-item active">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="14" height="14" rx="2" stroke="#262626" strokeWidth="1.5" fill="none"/>
                            <path d="M10 7V11M10 11L13 14M10 11L7 14" stroke="#262626" strokeWidth="1.5" strokeLinecap="round"/>
                            <circle cx="15" cy="6" r="2" fill="#10B981"/>
                        </svg>
                        <span>Generate New Token</span>
                    </div>
                    <div className="action-item">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9" cy="9" r="6" stroke="#262626" strokeWidth="1.5" fill="none"/>
                            <path d="M14 14L17 17" stroke="#262626" strokeWidth="1.5" strokeLinecap="round"/>
                            <circle cx="9" cy="9" r="2" fill="#262626" fillOpacity="0.2"/>
                        </svg>
                        <span>Search Patient</span>
                    </div>
                    <div className="action-item">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="5" width="14" height="3" rx="1" fill="#262626"/>
                            <rect x="3" y="9.5" width="14" height="3" rx="1" fill="#262626"/>
                            <rect x="3" y="14" width="14" height="3" rx="1" fill="#262626"/>
                            <circle cx="17" cy="6.5" r="1.5" fill="#3A8EEB"/>
                        </svg>
                        <span>View All Queues</span>
                    </div>
                </div>

                <div className="sidebar-divider"></div>

                <div className="quick-status-section">
                    <h3 className="section-title">Quick status</h3>
                    <div className="status-item">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="2" width="16" height="16" rx="2" fill="#FEF3C7" fillOpacity="0.5"/>
                            <rect x="2" y="2" width="16" height="16" rx="2" stroke="#F59E0B" strokeWidth="1.5"/>
                            <circle cx="10" cy="7" r="1.5" fill="#F59E0B"/>
                            <circle cx="10" cy="13" r="1.5" fill="#F59E0B"/>
                            <path d="M10 8.5V12.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
                            <text x="10" y="17" textAnchor="middle" fontSize="8" fill="#F59E0B" fontWeight="600">{totalWaitingCount}</text>
                        </svg>
                        <span>Waiting - {totalWaitingCount}</span>
                    </div>
                    <div className="status-item">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="8" fill="#DBEAFE" fillOpacity="0.5"/>
                            <circle cx="10" cy="10" r="8" stroke="#3A8EEB" strokeWidth="1.5"/>
                            <path d="M10 6V10L13 13" stroke="#3A8EEB" strokeWidth="1.5" strokeLinecap="round"/>
                            <circle cx="10" cy="10" r="1.5" fill="#3A8EEB"/>
                        </svg>
                        <span>Avg wait - {overallAvgWait} min</span>
                    </div>
                </div>

                <div className="sidebar-divider"></div>

                <div className="support-section">
                    <h3 className="section-title">Support</h3>
                    <div className="action-item">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="2" width="16" height="16" rx="2" fill="#F3F4F6"/>
                            <rect x="2" y="2" width="16" height="16" rx="2" stroke="#262626" strokeWidth="1.5"/>
                            <rect x="5" y="5" width="3" height="11" rx="1" fill="#3A8EEB"/>
                            <rect x="9" y="8" width="3" height="8" rx="1" fill="#10B981"/>
                            <rect x="13" y="7" width="3" height="9" rx="1" fill="#F59E0B"/>
                        </svg>
                        <span>Desk status</span>
                    </div>
                </div>

                <div className="sidebar-footer">
                    <div className="footer-item">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'inline-block', marginRight: '6px', verticalAlign: 'middle'}}>
                            <circle cx="6" cy="6" r="5" fill="#10B981"/>
                            <circle cx="6" cy="6" r="2" fill="#FFFFFF"/>
                        </svg>
                        Desk Status: Online
                    </div>
                    <div className="footer-item">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'inline-block', marginRight: '6px', verticalAlign: 'middle'}}>
                            <rect x="2" y="2" width="8" height="8" rx="1" stroke="#7B7B7B" strokeWidth="1.5" fill="none"/>
                            <path d="M4 6H8M6 4V8" stroke="#7B7B7B" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        Last Token: {queues[1].current_serving_number ? `GM-${queues[1].current_serving_number}` : '-'}
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                <div className="register-section-full">
                    <div className="register-header-content">
                        <div className="register-icon-wrapper">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="6" width="24" height="20" rx="3" fill="#3A8EEB" fillOpacity="0.1"/>
                                <rect x="4" y="6" width="24" height="20" rx="3" stroke="#3A8EEB" strokeWidth="2"/>
                                <path d="M10 14H22M10 18H18M10 22H16" stroke="#3A8EEB" strokeWidth="2" strokeLinecap="round"/>
                                <circle cx="24" cy="10" r="3" fill="#10B981"/>
                            </svg>
                        </div>
                        <div>
                            <h2 className="register-title-full">Register & Issue token</h2>
                            <p className="register-description-full">Reception view for generating new tokens and managing walk-in patients</p>
                        </div>
                    </div>
                    <div className="decorative-pattern">
                        <svg width="100%" height="4" viewBox="0 0 200 4" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <circle cx="2" cy="2" r="1.5" fill="#3A8EEB" fillOpacity="0.3"/>
                            <circle cx="10" cy="2" r="1.5" fill="#3A8EEB" fillOpacity="0.2"/>
                            <circle cx="18" cy="2" r="1.5" fill="#3A8EEB" fillOpacity="0.3"/>
                            <circle cx="26" cy="2" r="1.5" fill="#3A8EEB" fillOpacity="0.2"/>
                        </svg>
                    </div>
                </div>

                <div className="new-patient-banner">
                    <div className="banner-left">
                        <h2 className="banner-title">New Patient Registration</h2>
                        <p className="banner-subtitle">ideal for front desk / registration counters</p>
                    </div>
                    <div className="banner-right">
                        <div className="status-indicator">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="7" fill="#10B981"/>
                                <circle cx="8" cy="8" r="3" fill="#FFFFFF"/>
                                <circle cx="8" cy="8" r="1" fill="#10B981"/>
                            </svg>
                            <span>Desk 1-Online</span>
                        </div>
                        <div className="desk-info-right">
                            <div className="desk-name-right">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'inline-block', marginRight: '8px', verticalAlign: 'middle'}}>
                                    <circle cx="9" cy="6" r="3" fill="#3A8EEB"/>
                                    <path d="M3 16C3 12 5.5 10 9 10C12.5 10 15 12 15 16" stroke="#3A8EEB" strokeWidth="2" fill="none"/>
                                </svg>
                                Reception-Desk 1
                            </div>
                            <div className="desk-location-right">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'inline-block', marginRight: '6px', verticalAlign: 'middle'}}>
                                    <path d="M7 2L3 5V11L7 14L11 11V5L7 2Z" stroke="#7B7B7B" strokeWidth="1.5" fill="none"/>
                                    <circle cx="7" cy="8" r="1.5" fill="#7B7B7B"/>
                                </svg>
                                Ground floor
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-card">
                    <div className="form-header">
                        <div className="token-icon-wrapper">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="token-icon">
                                <rect x="6" y="8" width="28" height="24" rx="3" fill="#3A8EEB" fillOpacity="0.1"/>
                                <rect x="6" y="8" width="28" height="24" rx="3" stroke="#3A8EEB" strokeWidth="2"/>
                                <path d="M10 16H30M10 22H24M10 28H18" stroke="#3A8EEB" strokeWidth="2.5" strokeLinecap="round"/>
                                <circle cx="32" cy="12" r="4" fill="#10B981"/>
                                <path d="M30 12L32 14L34 12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <h2 className="form-title">Generate New Token</h2>
                            <p className="form-subtitle">Fill patient details and assign department</p>
                        </div>
                    </div>

                    <div className="form-section-main">
                        <div className="form-row">
                            <div className="form-group full-width">
                                <label>Patient Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter full name"
                                    value={formData.patientName}
                                    onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Visit type</label>
                                <select value={formData.visitType} onChange={(e) => setFormData({...formData, visitType: e.target.value})}>
                                    <option value="">Select type</option>
                                    <option value="new">New visit</option>
                                    <option value="followup">Follow-up</option>
                                    <option value="referral">Referral</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Department</label>
                                <div className="select-wrapper">
                                    <select value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})}>
                                        <option value="">Choose department</option>
                                        <option value="general">General Medicine</option>
                                        <option value="orthopedics">Orthopedics</option>
                                        <option value="pediatrics">Pediatrics</option>
                                    </select>
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                        <path d="M1 1L5 5L9 1" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="visit-type-buttons-group">
                                <button className={`visit-type-btn ${formData.visitType === 'new' ? 'active' : ''}`} onClick={() => setFormData({...formData, visitType: 'new'})}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '6px'}}>
                                        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                        <path d="M7 4V7L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                    New visit
                                </button>
                                <button className={`visit-type-btn ${formData.visitType === 'followup' ? 'active' : ''}`} onClick={() => setFormData({...formData, visitType: 'followup'})}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '6px'}}>
                                        <path d="M2 7L5 4L7 6L12 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 1H9V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Follow-up
                                </button>
                                <button className={`visit-type-btn ${formData.visitType === 'referral' ? 'active' : ''}`} onClick={() => setFormData({...formData, visitType: 'referral'})}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '6px'}}>
                                        <path d="M7 2L12 7L7 12M12 7H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Referral
                                </button>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'inline-block', marginRight: '6px', verticalAlign: 'middle'}}>
                                        <circle cx="8" cy="8" r="6" stroke="#262626" strokeWidth="1.5" fill="none"/>
                                        <path d="M8 4V8L10 10" stroke="#262626" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                    Priority
                                </label>
                                <div className="priority-buttons">
                                    <button className={`priority-btn normal ${formData.priority === 'normal' ? 'active' : ''}`} onClick={() => setFormData({...formData, priority: 'normal'})}>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '6px'}}>
                                            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                            <path d="M7 4V7L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                        Normal
                                    </button>
                                    <button className={`priority-btn urgent ${formData.priority === 'urgent' ? 'active' : ''}`} onClick={() => setFormData({...formData, priority: 'urgent'})}>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '6px'}}>
                                            <path d="M7 2L9 5L12 6L9 7L7 10L5 7L2 6L5 5L7 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                        </svg>
                                        Urgent
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'inline-block', marginRight: '6px', verticalAlign: 'middle'}}>
                                        <rect x="3" y="2" width="10" height="12" rx="2" stroke="#262626" strokeWidth="1.5" fill="none"/>
                                        <path d="M6 5H10M6 8H10M6 11H8" stroke="#262626" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                    Mobile Number
                                </label>
                                <input 
                                    type="tel" 
                                    placeholder="+91 99999-99999"
                                    value={formData.mobileNumber}
                                    onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group full-width">
                                <label>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'inline-block', marginRight: '6px', verticalAlign: 'middle'}}>
                                        <rect x="2" y="3" width="12" height="10" rx="1" stroke="#262626" strokeWidth="1.5" fill="none"/>
                                        <path d="M5 6H11M5 9H11M5 12H8" stroke="#262626" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                    Additional notes
                                </label>
                                <textarea 
                                    placeholder="Add any relevant notes or instructions"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button className="issue-token-btn" onClick={handleIssueToken} disabled={loading}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '8px'}}>
                                    <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                    <path d="M7 9H13M7 12H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                    <circle cx="15" cy="7" r="2.5" fill="#10B981"/>
                                    <path d="M14 7L15 8L16 7" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                {loading ? 'Processing...' : 'Issue Token'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="queue-summary-card">
                    <div className="queue-header">
                        <div>
                            <h2 className="queue-title">Active Queue Summary</h2>
                            <p className="queue-subtitle">At-a-glance view for reception staff</p>
                        </div>
                    </div>

                    <div className="summary-cards">
                        <div className="summary-card">
                            <div className="summary-value">{totalWaitingCount}</div>
                            <div className="summary-label">Total waiting patients</div>
                            <div className="summary-subtitle">Across OPD desk</div>
                        </div>
                        <div className="summary-card">
                            <div className="summary-value">{overallAvgWait} min</div>
                            <div className="summary-label">Average OPD wait</div>
                            <div className="summary-subtitle">Live estimate</div>
                        </div>
                        <div className="summary-card">
                            <div className="summary-value">4</div>
                            <div className="summary-label">Counters open</div>
                            <div className="summary-subtitle">Active counters</div>
                        </div>
                    </div>

                    <div className="queue-table">
                        <div className="table-header-row">
                            <div className="table-header-cell">Department</div>
                            <div className="table-header-cell">Now serving</div>
                            <div className="table-header-cell">Waiting</div>
                            <div className="table-header-cell">Avg wait</div>
                        </div>
                        <div className={`table-row ${queues[1].total_waiting > 0 ? 'highlighted' : ''}`}>
                            <div className="table-cell">General OPD</div>
                            <div className="table-cell">{queues[1].current_serving_number ? `GM-${queues[1].current_serving_number}` : '-'}</div>
                            <div className="table-cell">{queues[1].total_waiting}</div>
                            <div className="table-cell">{queues[1].avg_wait_time} min</div>
                            {queues[1].total_waiting > 0 && <div className="table-row-line"></div>}
                        </div>
                        <div className="table-row">
                            <div className="table-cell">Orthopedics</div>
                            <div className="table-cell">{queues[2].current_serving_number ? `OT-${queues[2].current_serving_number}` : '-'}</div>
                            <div className="table-cell">{queues[2].total_waiting}</div>
                            <div className="table-cell">{queues[2].avg_wait_time} min</div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell">Pediatrics</div>
                            <div className="table-cell">{queues[3].current_serving_number ? `PE-${queues[3].current_serving_number}` : '-'}</div>
                            <div className="table-cell">{queues[3].total_waiting}</div>
                            <div className="table-cell">{queues[3].avg_wait_time} min</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
}

export default ReceptionDashboard;
