import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Utilizing existing CSS globals

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('overview'); // 'overview' or 'control'
    const [queues, setQueues] = useState({ 
        1: { total_waiting: 0, avg_wait_time: 0, current_serving_number: null },
        2: { total_waiting: 0, avg_wait_time: 0, current_serving_number: null },
        3: { total_waiting: 0, avg_wait_time: 0, current_serving_number: null }
    });

    const fetchAllQueues = async () => {
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
        fetchAllQueues();
        const interval = setInterval(fetchAllQueues, 30000);
        return () => clearInterval(interval);
    }, []);

    const totalWaitingAll = queues[1].total_waiting + queues[2].total_waiting + queues[3].total_waiting;
    const avgWaitAll = Math.round((queues[1].avg_wait_time + queues[2].avg_wait_time + queues[3].avg_wait_time)/3);
    const completedToday = (queues[1].completed_today||0) + (queues[2].completed_today||0) + (queues[3].completed_today||0);

    return (
        <div className="app-frame" style={{backgroundColor: '#f6f8fb', minHeight: '100vh', fontFamily: 'Inter, sans-serif'}}>
            <div className="app-container" style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                {/* Header */}
                <header className="main-header" style={{backgroundColor: '#fff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eef0f3'}}>
                    <div className="header-left" style={{display: 'flex', alignItems: 'center'}}>
                        <button className="sidebar-toggle" style={{background: 'none', border: 'none', cursor: 'pointer', marginRight: '20px'}}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M3 5H17M3 10H17M3 15H17" stroke="#262626" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </button>
                        <div className="quentra-logo" style={{fontSize: '20px', fontWeight: 'bold', letterSpacing: '2px', color: '#1a1a1a'}}>QUENTRA</div>
                    </div>
                    <div className="date-time" style={{color: '#4F4F4F'}}>Wednesday, October 25 | 9:40 PM</div>
                    <div className="admin-control-panel" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                        <span style={{fontWeight: 500}}>Admin control panel</span>
                        <div className="user-status" style={{display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#ecfdf5', padding: '6px 12px', borderRadius: '20px'}}>
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="6" fill="#10B981"/>
                            </svg>
                            <span className="status-text" style={{color: '#10B981', fontSize: '13px', fontWeight: 600}}>Online</span>
                        </div>
                        <div 
                            style={{cursor: 'pointer', marginLeft: '10px', color: '#666', textDecoration: 'underline'}} 
                            onClick={() => navigate('/login')}
                        >
                            Log Out
                        </div>
                    </div>
                </header>

                <div className="main-container" style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
                    {/* Left Sidebar */}
                    <aside className="sidebar" style={{width: '260px', backgroundColor: '#fff', borderRight: '1px solid #eef0f3', display: 'flex', flexDirection: 'column', overflowY: 'auto'}}>
                        <div className="admin-profile-card" style={{padding: '25px 20px', display: 'flex', alignItems: 'center', gap: '15px'}}>
                            <div className="admin-icon-circle">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <circle cx="20" cy="20" r="18" fill="#3A8EEB"/>
                                    <rect x="12" y="12" width="16" height="16" rx="2" fill="#FFFFFF"/>
                                    <path d="M16 16H24M16 20H24M16 24H20" stroke="#3A8EEB" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <div className="admin-info">
                                <div className="admin-name" style={{fontWeight: 600, fontSize: '16px'}}>Admin</div>
                                <div className="admin-role" style={{fontSize: '13px', color: '#666'}}>Control Panel</div>
                            </div>
                        </div>

                        <div style={{height: '1px', backgroundColor: '#eef0f3', margin: '0 20px'}}></div>

                        <div className="nav-section" style={{padding: '20px'}}>
                            <h3 style={{fontSize: '12px', textTransform: 'uppercase', color: '#888', marginBottom: '15px', letterSpacing: '1px'}}>MAIN</h3>
                            <div className="nav-item active" style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f0f7ff', color: '#3A8EEB', borderRadius: '8px', fontWeight: 500, cursor: 'pointer', marginBottom: '5px'}}>
                                <span>Dashboard</span>
                            </div>
                            <div className="nav-item" style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#444', borderRadius: '8px', cursor: 'pointer', marginBottom: '5px'}}>
                                <span>Manage queues</span>
                            </div>
                            <div className="nav-item" style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#444', borderRadius: '8px', cursor: 'pointer'}}>
                                <span>Doctors & staffs</span>
                            </div>
                        </div>

                        <div style={{height: '1px', backgroundColor: '#eef0f3', margin: '0 20px'}}></div>

                        <div className="nav-section" style={{padding: '20px'}}>
                            <h3 style={{fontSize: '12px', textTransform: 'uppercase', color: '#888', marginBottom: '15px', letterSpacing: '1px'}}>SYSTEM</h3>
                            <div className="nav-item" style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#444', borderRadius: '8px', cursor: 'pointer', marginBottom: '5px'}}>
                                <span>Setting</span>
                            </div>
                            <div className="nav-item" style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#444', borderRadius: '8px', cursor: 'pointer'}}>
                                <span>Reports</span>
                            </div>
                        </div>
                    </aside>

                    <main className="main-content-wrapper" style={{flex: 1, overflowY: 'auto', padding: '40px'}}>
                        <div className="dashboard-header-section" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
                            <div>
                                <h1 style={{fontSize: '28px', color: '#1a1a1a', margin: '0 0 5px 0'}}>{mode === 'overview' ? 'Admin dashboard' : 'Control Panel'}</h1>
                                <p style={{color: '#666', margin: 0}}>{mode === 'overview' ? 'Real-time overview of queues, staff load and service performance' : 'Manage queues, staff, and system settings'}</p>
                            </div>
                            <div className="header-mode-switcher" style={{display: 'flex', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '8px'}}>
                                <button 
                                    onClick={() => setMode('overview')}
                                    style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: mode === 'overview' ? '#fff' : 'transparent', color: mode === 'overview' ? '#1a1a1a' : '#64748b', fontWeight: 500, boxShadow: mode === 'overview' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'}}
                                >
                                    Overview
                                </button>
                                <button 
                                    onClick={() => setMode('control')}
                                    style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: mode === 'control' ? '#fff' : 'transparent', color: mode === 'control' ? '#1a1a1a' : '#64748b', fontWeight: 500, boxShadow: mode === 'control' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'}}
                                >
                                    Control
                                </button>
                            </div>
                        </div>

                        {mode === 'overview' ? (
                            <>
                                <div className="overview-stats" style={{display: 'flex', gap: '20px', marginBottom: '30px'}}>
                                    <div className="stat-card" style={{flex: 1, backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)'}}>
                                        <div style={{color: '#64748b', fontSize: '14px', marginBottom: '8px'}}>Total waiting patients</div>
                                        <div style={{fontSize: '32px', fontWeight: 700, color: '#0f172a'}}>{totalWaitingAll}</div>
                                        <div style={{color: '#10B981', fontSize: '13px', marginTop: '8px'}}>Live Sync Active</div>
                                    </div>
                                    <div className="stat-card" style={{flex: 1, backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)'}}>
                                        <div style={{color: '#64748b', fontSize: '14px', marginBottom: '8px'}}>Avg wait (all)</div>
                                        <div style={{fontSize: '32px', fontWeight: 700, color: '#0f172a'}}>{avgWaitAll} min</div>
                                        <div style={{color: '#3A8EEB', fontSize: '13px', marginTop: '8px'}}>Overall estimate</div>
                                    </div>
                                    <div className="stat-card" style={{flex: 1, backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)'}}>
                                        <div style={{color: '#64748b', fontSize: '14px', marginBottom: '8px'}}>Completed Today</div>
                                        <div style={{fontSize: '32px', fontWeight: 700, color: '#0f172a'}}>{completedToday}</div>
                                        <div style={{color: '#8b5cf6', fontSize: '13px', marginTop: '8px'}}>Tokens issued & treated</div>
                                    </div>
                                    <div className="stat-card" style={{flex: 1, backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)'}}>
                                        <div style={{color: '#64748b', fontSize: '14px', marginBottom: '8px'}}>Counters open</div>
                                        <div style={{fontSize: '32px', fontWeight: 700, color: '#0f172a'}}>3</div>
                                        <div style={{color: '#64748b', fontSize: '13px', marginTop: '8px'}}>Active Departments</div>
                                    </div>
                                </div>

                                <div className="queues-section" style={{backgroundColor: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)'}}>
                                    <h2 style={{fontSize: '18px', margin: '0 0 20px 0'}}>Queues by department (Live Database Sync)</h2>
                                    <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
                                        <thead>
                                            <tr style={{borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '14px'}}>
                                                <th style={{padding: '12px 16px', fontWeight: 500}}>Department</th>
                                                <th style={{padding: '12px 16px', fontWeight: 500}}>Waiting</th>
                                                <th style={{padding: '12px 16px', fontWeight: 500}}>Avg waiting</th>
                                                <th style={{padding: '12px 16px', fontWeight: 500}}>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                                                <td style={{padding: '16px', fontWeight: 500}}>General Medicine</td>
                                                <td style={{padding: '16px'}}>{queues[1].total_waiting}</td>
                                                <td style={{padding: '16px'}}>{queues[1].avg_wait_time} min</td>
                                                <td style={{padding: '16px'}}><span style={{backgroundColor: queues[1].total_waiting > 10 ? '#fee2e2' : '#dcfce7', color: queues[1].total_waiting > 10 ? '#ef4444' : '#10b981', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600}}>{queues[1].total_waiting > 10 ? 'Busy' : 'Normal'}</span></td>
                                            </tr>
                                            <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                                                <td style={{padding: '16px', fontWeight: 500}}>Orthopedics</td>
                                                <td style={{padding: '16px'}}>{queues[2].total_waiting}</td>
                                                <td style={{padding: '16px'}}>{queues[2].avg_wait_time} min</td>
                                                <td style={{padding: '16px'}}><span style={{backgroundColor: queues[2].total_waiting > 10 ? '#fee2e2' : '#dcfce7', color: queues[2].total_waiting > 10 ? '#ef4444' : '#10b981', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600}}>{queues[2].total_waiting > 10 ? 'Busy' : 'Healthy'}</span></td>
                                            </tr>
                                            <tr>
                                                <td style={{padding: '16px', fontWeight: 500}}>Pediatrics</td>
                                                <td style={{padding: '16px'}}>{queues[3].total_waiting}</td>
                                                <td style={{padding: '16px'}}>{queues[3].avg_wait_time} min</td>
                                                <td style={{padding: '16px'}}><span style={{backgroundColor: queues[3].total_waiting > 10 ? '#fee2e2' : '#dcfce7', color: queues[3].total_waiting > 10 ? '#ef4444' : '#10b981', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600}}>{queues[3].total_waiting > 10 ? 'Busy' : 'Healthy'}</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <div className="control-section" style={{backgroundColor: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)'}}>
                                <h2 style={{fontSize: '18px', margin: '0 0 20px 0'}}>Queue Control Panel</h2>
                                <p style={{color: '#666'}}>These backend systems will securely pause or reset queries.</p>
                                
                                <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
                                    {[1, 2, 3].map(id => (
                                        <div key={id} style={{border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', width: '300px'}}>
                                            <h3 style={{margin: '0 0 15px 0', fontSize: '16px'}}>{id === 1 ? 'General Medicine' : id === 2 ? 'Orthopedics' : 'Pediatrics'}</h3>
                                            <div style={{marginBottom: '10px', fontSize: '14px', color: '#64748b'}}>Waiting: <strong style={{color: '#0f172a'}}>{queues[id].total_waiting}</strong></div>
                                            <div style={{marginBottom: '20px', fontSize: '14px', color: '#64748b'}}>Avg Wait: <strong style={{color: '#0f172a'}}>{queues[id].avg_wait_time} min</strong></div>
                                            <div style={{display: 'flex', gap: '10px'}}>
                                                <button style={{flex: 1, padding: '8px', backgroundColor: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500}}>Pause Queue</button>
                                                <button style={{flex: 1, padding: '8px', backgroundColor: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500}}>Reset Queue</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
