import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Utilizing existing CSS globals

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const [queueData, setQueueData] = useState(null);
    const [loading, setLoading] = useState(true);

    const depId = 1; // Assuming General Medicine for this dashboard view

    const fetchQueue = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/queue/status?dep_id=${depId}`);
            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    setQueueData(data);
                }
            }
        } catch (err) {
            console.error('Failed to fetch doctor queue', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQueue();
        const interval = setInterval(fetchQueue, 15000); // refresh every 15s
        return () => clearInterval(interval);
    }, []);

    const updateTokenStatus = async (tokenId, status) => {
        try {
            const res = await fetch(`http://localhost:5000/api/tokens/${tokenId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                fetchQueue();
            }
        } catch (err) {
            console.error('Error updating token', err);
        }
    };

    const handleCallNext = () => {
        if (!queueData || !queueData.waiting_list || queueData.waiting_list.length === 0) {
            alert("Queue is empty!");
            return;
        }
        // If there is already a token serving, mark it completed implicitly or warn? 
        // For now, let's just mark the top waiting person as serving.
        if (queueData.summary.current_serving_token_id) {
            updateTokenStatus(queueData.summary.current_serving_token_id, 'completed');
        }
        const nextToken = queueData.waiting_list[0];
        updateTokenStatus(nextToken.token_id, 'serving');
    };

    const handleMarkCompleted = () => {
        if (queueData && queueData.summary.current_serving_token_id) {
            updateTokenStatus(queueData.summary.current_serving_token_id, 'completed');
        } else {
            alert("No patient is currently serving.");
        }
    };

    if (loading || !queueData) return <div style={{padding: '50px', textAlign: 'center'}}>Loading doctor dashboard...</div>;

    const summary = queueData.summary;
    const waitingList = queueData.waiting_list || [];

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
                    <div 
                        className="staff-login" 
                        onClick={() => navigate('/login')} 
                        style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid #e0e0e0', borderRadius: '4px', cursor: 'pointer'}}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M8 5L12 10L8 15" stroke="#4F4F4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <rect x="3" y="4" width="14" height="12" rx="1" stroke="#4F4F4F" strokeWidth="1.5"/>
                        </svg>
                        <span>Sign out</span>
                    </div>
                </header>

                <div className="main-container" style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
                    <aside className="sidebar" style={{width: '260px', backgroundColor: '#fff', borderRight: '1px solid #eef0f3', display: 'flex', flexDirection: 'column'}}>
                        <div className="doctor-profile-card" style={{padding: '25px 20px', display: 'flex', alignItems: 'center', gap: '15px'}}>
                            <div className="doctor-icon-circle">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <circle cx="20" cy="20" r="18" fill="#3A8EEB"/>
                                    <path d="M20 12V20M16 16H24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
                                    <path d="M12 28C12 24 15 22 20 22C25 22 28 24 28 28" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <div className="doctor-info">
                                <div className="doctor-name" style={{fontWeight: 600, fontSize: '16px'}}>Dr. Ritesh Sharma</div>
                                <div className="doctor-role" style={{fontSize: '13px', color: '#666'}}>Consultation</div>
                            </div>
                        </div>

                        <div style={{height: '1px', backgroundColor: '#eef0f3', margin: '0 20px'}}></div>

                        <div className="nav-section" style={{padding: '20px'}}>
                            <h3 style={{fontSize: '12px', textTransform: 'uppercase', color: '#888', marginBottom: '15px', letterSpacing: '1px'}}>Today</h3>
                            <div className="nav-item active" style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f0f7ff', color: '#3A8EEB', borderRadius: '8px', fontWeight: 500, cursor: 'pointer'}}>
                                <span>My Queue</span>
                            </div>
                            <div className="nav-item" style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#444', borderRadius: '8px', cursor: 'pointer'}}>
                                <span>Past visits</span>
                            </div>
                        </div>

                        <div style={{marginTop: 'auto', padding: '20px'}}>
                            <div style={{backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px'}}>
                                <div style={{fontSize: '13px', color: '#555', marginBottom: '8px'}}>Today: 24 appointments</div>
                                <div style={{fontSize: '13px', color: '#555'}}>Completed: {summary.completed_today || 0}</div>
                            </div>
                        </div>
                    </aside>

                    <main className="main-content-wrapper" style={{flex: 1, overflowY: 'auto', padding: '40px'}}>
                        <div className="dashboard-header-section" style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px'}}>
                            <h1 style={{fontSize: '28px', color: '#1a1a1a', margin: 0}}>Doctor Dashboard</h1>
                            <p style={{color: '#666', margin: 0}}>Personal queue view and upcoming patients</p>
                        </div>

                        <div className="opd-queue-card" style={{backgroundColor: '#fff', borderRadius: '12px', padding: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', marginBottom: '30px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px'}}>
                                <div>
                                    <h2 style={{margin: '0 0 5px 0', fontSize: '20px'}}>My OPD Queue</h2>
                                    <span style={{color: '#666', fontSize: '14px'}}>General Medicine - Room 204</span>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#ecfdf5', color: '#10B981', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 500}}>
                                        <span style={{width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%', display: 'inline-block'}}></span>
                                        Available
                                    </div>
                                </div>
                            </div>

                            <div className="metrics-row" style={{display: 'flex', gap: '20px'}}>
                                <div className="metric-card" style={{flex: 1, backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px'}}>
                                    <div style={{fontSize: '28px', fontWeight: 700, color: '#1a1a1a'}}>{summary.total_waiting || 0}</div>
                                    <div style={{fontSize: '13px', color: '#666', marginTop: '5px'}}>Patients Waiting</div>
                                </div>
                                <div className="metric-card" style={{flex: 1, backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px'}}>
                                    <div style={{fontSize: '28px', fontWeight: 700, color: '#1a1a1a'}}>{summary.avg_wait_time || 0} min</div>
                                    <div style={{fontSize: '13px', color: '#666', marginTop: '5px'}}>Avg Waiting Time</div>
                                </div>
                                <div className="metric-card" style={{flex: 1, backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px'}}>
                                    <div style={{fontSize: '28px', fontWeight: 700, color: '#1a1a1a'}}>{summary.completed_today || 0}</div>
                                    <div style={{fontSize: '13px', color: '#666', marginTop: '5px'}}>Completed Today</div>
                                </div>
                            </div>
                        </div>

                        {/* Current Consultation */}
                        <div className="current-consultation-card" style={{border: '2px solid #3A8EEB', backgroundColor: '#f4f9ff', borderRadius: '12px', padding: '25px', marginBottom: '30px'}}>
                            <div style={{marginBottom: '20px'}}>
                                <h3 style={{margin: '0 0 5px 0', color: '#3A8EEB'}}>Current Consultation</h3>
                                <p style={{margin: 0, fontSize: '14px', color: '#666'}}>Actively in room</p>
                            </div>
                            
                            {summary.current_serving_number ? (
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px'}}>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                                        <span style={{backgroundColor: '#e6f2ff', color: '#3A8EEB', padding: '6px 12px', borderRadius: '4px', fontWeight: 600}}>Token {summary.current_serving_number}</span>
                                        <span style={{fontSize: '18px', fontWeight: 600}}>Patient Serving</span>
                                    </div>
                                    <div style={{color: '#666', fontSize: '14px'}}>Started recently</div>
                                </div>
                            ) : (
                                <div style={{backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px', color: '#666', fontStyle: 'italic'}}>
                                    No patient currently serving.
                                </div>
                            )}

                            <div className="action-buttons" style={{display: 'flex', gap: '15px'}}>
                                <button 
                                    onClick={handleMarkCompleted}
                                    style={{backgroundColor: '#10B981', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', flex: 1}}
                                >
                                    Mark as Completed
                                </button>
                                <button 
                                    onClick={handleCallNext}
                                    style={{backgroundColor: '#3A8EEB', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', flex: 1}}
                                >
                                    Call Next Person
                                </button>
                            </div>
                        </div>

                        {/* Patients Queue Table */}
                        <div className="patients-queue-card" style={{backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', overflow: 'hidden'}}>
                            <div style={{padding: '20px', borderBottom: '1px solid #eee'}}>
                                <h3 style={{margin: '0 0 5px 0'}}>Patients In Queue</h3>
                                <p style={{margin: 0, fontSize: '14px', color: '#666'}}>Ordered by priority and arrival time</p>
                            </div>
                            
                            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                                <thead>
                                    <tr style={{backgroundColor: '#f8fafc', color: '#666', fontSize: '13px', textAlign: 'left'}}>
                                        <th style={{padding: '15px 20px', fontWeight: 500}}>Token / Name</th>
                                        <th style={{padding: '15px 20px', fontWeight: 500}}>Priority</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {waitingList.length > 0 ? waitingList.map(item => (
                                        <tr key={item.token_id} style={{borderBottom: '1px solid #eee'}}>
                                            <td style={{padding: '15px 20px'}}>
                                                <div style={{fontWeight: 600, color: '#1a1a1a'}}>Token {item.token_no}</div>
                                                <div style={{fontSize: '13px', color: '#666', marginTop: '3px'}}>{item.patient_name}</div>
                                            </td>
                                            <td style={{padding: '15px 20px'}}>
                                                {item.visit_type === 'urgent' ? (
                                                    <span style={{backgroundColor: '#fef2f2', color: '#EF4444', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600}}>Urgent</span>
                                                ) : (
                                                    <span style={{backgroundColor: '#f0fdf4', color: '#10B981', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600}}>Normal</span>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="2" style={{padding: '30px', textAlign: 'center', color: '#888'}}>No patients currently in queue.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
