import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    patientName: '',
    visitType: '',
    priority: '',
    department: '',
    mobileNumber: '',
    notes: ''
  })

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="date-time">Wednesday, October 25 | 9:40 PM</div>
          <div className="staff-login">
            <span>Staff login</span>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 17C20.866 17 24 13.866 24 10C24 6.13401 20.866 3 17 3C13.134 3 10 6.13401 10 10C10 13.866 13.134 17 17 17Z" stroke="#000" strokeWidth="2"/>
              <path d="M3 31C3 25.4772 7.47715 21 13 21H21C26.5228 21 31 25.4772 31 31" stroke="#000" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-container">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <div className="profile-section">
            <div className="profile-image"></div>
            <div className="profile-info">
              <div className="desk-name">Reception-Desk 1</div>
              <div className="desk-location">Ground floor</div>
            </div>
            <div className="desk-status-badge">Desk 1-Online</div>
          </div>

          <div className="sidebar-divider"></div>

          <div className="sidebar-section-title">Actions</div>
          <nav className="sidebar-nav">
            <div className="nav-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L2 7V9C2 13.4183 4.58172 17.4183 8.5 18.5C9.5 18.8 10.5 18.8 11.5 18.5C15.4183 17.4183 18 13.4183 18 9V7L10 2Z" stroke="#000" strokeWidth="1.25"/>
              </svg>
              <span>Generate New Token</span>
            </div>
            <div className="nav-item">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <circle cx="11.5" cy="11.5" r="8.5" stroke="#000" strokeWidth="1.5"/>
                <path d="M20 20L16 16" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Search Patient</span>
            </div>
            <div className="nav-item">
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
                <rect x="2.16" y="2.16" width="18.69" height="18.69" rx="2" stroke="#000" strokeWidth="2"/>
              </svg>
              <span>View All Queues</span>
            </div>
          </nav>
          
          <div className="sidebar-divider"></div>
          
          <div className="sidebar-nav">
            <div className="nav-item">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 1L2 6V11C2 15.4183 4.58172 19.4183 8.5 20.5C9.5 20.8 10.5 20.8 11.5 20.5C15.4183 19.4183 18 15.4183 18 11V6L11 1Z" stroke="#000" strokeWidth="1.5"/>
              </svg>
              <span>Support</span>
            </div>
            <div className="nav-item">
              <svg width="26" height="29" viewBox="0 0 26 29" fill="none">
                <path d="M13 3L3 9V15C3 19.4183 5.58172 23.4183 9.5 24.5C10.5 24.8 11.5 24.8 12.5 24.5C16.4183 23.4183 19 19.4183 19 15V9L13 3Z" stroke="#000" strokeWidth="1.8"/>
              </svg>
              <span>Desk status</span>
            </div>
          </div>

          <div className="sidebar-divider"></div>

          <div className="quick-status">
            <div className="quick-status-title">Quick status</div>
            <div className="status-item">
              <span>Waiting - 10</span>
            </div>
            <div className="status-item">
              <span>Avg wait - 20 min</span>
            </div>
          </div>

          <div className="sidebar-divider"></div>

          <div className="desk-info">
            <div className="info-item">Desk Status: Online</div>
            <div className="info-item">Last Token: GM-12</div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          {/* Reception Section */}
          <div className="reception-section">
            <div className="section-header">
              <h1>Reception</h1>
              <div className="section-subtitle">Reception view for generating new tokens and managing walk-in patients</div>
            </div>

            <div className="register-section">
              <h2 className="register-title">Register & Issue token</h2>
            </div>

            <div className="new-patient-section">
              <h3 className="new-patient-title">New Patient Registration</h3>
              <p className="new-patient-subtitle">ideal for front desk / registration counters</p>
            </div>

            <div className="reception-card">
              <div className="card-header">
                <div className="card-title-section">
                  <svg width="37" height="30" viewBox="0 0 37 30" fill="none" style={{marginRight: '12px'}}>
                    <path d="M18.5 2L2 10V13C2 18.5228 5.47715 23.5228 10.5 25C11.5 25.3 12.5 25.3 13.5 25C18.5228 23.5228 22 18.5228 22 13V10L18.5 2Z" stroke="#000" strokeWidth="2"/>
                  </svg>
                  <div>
                    <h2>Generate New Token</h2>
                    <p>Fill patient details and assign department</p>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label>Patient Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter full name"
                    value={formData.patientName}
                    onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Visit type</label>
                    <div className="visit-type-buttons">
                      <button className={formData.visitType === 'new' ? 'active' : ''} onClick={() => setFormData({...formData, visitType: 'new'})}>New visit</button>
                      <button className={formData.visitType === 'followup' ? 'active' : ''} onClick={() => setFormData({...formData, visitType: 'followup'})}>Follow-up</button>
                      <button className={formData.visitType === 'referral' ? 'active' : ''} onClick={() => setFormData({...formData, visitType: 'referral'})}>Referral</button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Department</label>
                    <div className="select-wrapper">
                      <select 
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                      >
                        <option value="">Choose department</option>
                        <option value="general">General OPD</option>
                        <option value="orthopedics">Orthopedics</option>
                        <option value="pediatrics">Pediatrics</option>
                      </select>
                      <svg width="10" height="4" viewBox="0 0 10 4" fill="none">
                        <path d="M0 0L5 4L10 0" stroke="#1C1B1F" strokeWidth="1"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <div className="priority-buttons">
                    <button className={`priority-btn ${formData.priority === 'normal' ? 'normal active' : 'normal'}`} onClick={() => setFormData({...formData, priority: 'normal'})}>Normal</button>
                    <button className={`priority-btn ${formData.priority === 'urgent' ? 'urgent active' : 'urgent'}`} onClick={() => setFormData({...formData, priority: 'urgent'})}>Urgent</button>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 99999-99999"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                    />
                  </div>
                  <div className="form-group"></div>
                </div>

                <div className="form-group">
                  <label>Additional notes</label>
                  <textarea 
                    placeholder="Add any relevant notes or instructions"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>

                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '10px'}}>
                  <button className="issue-token-btn">Issue Token</button>
                </div>
              </div>
            </div>
          </div>

          {/* Active Queue Summary */}
          <div className="queue-summary-section">
            <div className="section-header">
              <h1>Active Queue Summary</h1>
              <div className="section-subtitle">At-a-glance view for reception staff</div>
            </div>

            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-label">Total waiting patients</div>
                <div className="stat-value">18</div>
                <div className="stat-subtitle">Across OPD desk</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Average OPD wait</div>
                <div className="stat-value">15 min</div>
                <div className="stat-subtitle">Live estimate</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Counters open</div>
                <div className="stat-value">4</div>
                <div className="stat-subtitle">Active counters</div>
              </div>
            </div>

            <div className="queue-table">
              <div className="table-header">
                <div className="table-col">Department</div>
                <div className="table-col">Now serving</div>
                <div className="table-col">Waiting</div>
                <div className="table-col">Avg wait</div>
              </div>
              <div className="table-row">
                <div className="table-col">General OPD</div>
                <div className="table-col">P-16</div>
                <div className="table-col">8</div>
                <div className="table-col">35 min</div>
              </div>
              <div className="table-row">
                <div className="table-col">Pediatrics</div>
                <div className="table-col">K-11</div>
                <div className="table-col">4</div>
                <div className="table-col">30 min</div>
              </div>
              <div className="table-row">
                <div className="table-col">Orthopedics</div>
                <div className="table-col">G-33</div>
                <div className="table-col">5</div>
                <div className="table-col">45 min</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
