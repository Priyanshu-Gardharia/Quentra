import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/homestyle.css'; // Use exactly their CSS

function HomePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: '',
    mobileNumber: '',
    department: '',
    doctor: '' 
  });

  const [loading, setLoading] = useState(false);
  const [issuedToken, setIssuedToken] = useState(null); 

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
    if (!formData.patientName || !formData.mobileNumber || !formData.department || !formData.doctor) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
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
      if (formData.department === 'Orthopedics') dep_id = 2;
      if (formData.department === 'Pediatrics') dep_id = 3;

      const tokRes = await fetch('http://localhost:5000/api/tokens/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          p_id,
          dep_id,
          visit_type: 'new', 
          priority: 'normal'
        })
      });
      const tokData = await tokRes.json();

      if (!tokData.success) throw new Error(tokData.message);

      setIssuedToken({
        number: tokData.data.token_no,
        department: formData.department,
        doctor: formData.doctor
      });
      
      setFormData({
        patientName: '', mobileNumber: '', department: '', doctor: ''
      });
      
      fetchQueues();
    } catch (err) {
      alert("Error issuing token: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <header className="header">
        <div className="headerContent">
          <div className="logoSection">
            <h1 style={{margin: 0, fontSize: '32px', color: '#1a1a1a', fontWeight: 700, letterSpacing: '2px'}}>QUENTRA</h1>
          </div>
          <div className="datetimeSection">
            <div id="datetime" className="datetime">Wednesday, October 25 | 9:40 PM</div>
          </div>
          <div className="staffLoginSection">
            <button className="staffLoginBtn" type="button" onClick={() => navigate('/login')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '8px'}}>
                  <path d="M8 5L12 10L8 15" stroke="#4F4F4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="3" y="4" width="14" height="12" rx="1" stroke="#4F4F4F" strokeWidth="1.5" fill="none"/>
              </svg>
              <span className="staffLoginText">Staff login</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mainContainer">
        <div className="contentWrapper">
          <section className="leftSection" aria-label="Active queues">
            <div className="sectionHeader">
              <h1 className="sectionTitle">Active Queues</h1>
              <div className="opdPill">
                <span className="opdText">OPD</span>
              </div>
            </div>

            <div className="queueGrid">
              <article className="queueCard">
                <div className="cardHeader">
                  <h2 className="cardTitle">General Medicine</h2>
                </div>
                <p className="cardRoom">Room 101- Dr. Mehta</p>
                <div className="nowServingCard">
                  <span className="nowServingLabel">Now Serving</span>
                  <span className="nowServingValue">{queues[1].current_serving_number ? `GM-${queues[1].current_serving_number}` : '-'}</span>
                </div>
                <div className="cardMetrics">
                  <div className="metricGroup">
                    <span className="metricLabel">Waiting</span>
                    <span className="nextTokenValue">{queues[1].total_waiting}</span>
                  </div>
                  <div className="metricGroup">
                    <span className="metricLabel">Avg wait</span>
                    <span className="avgWaitValue" style={{color: '#f1ad7d'}}>{queues[1].avg_wait_time} mins</span>
                  </div>
                </div>
              </article>

              <article className="queueCard">
                <div className="cardHeader">
                  <h2 className="cardTitle">Orthopedics</h2>
                </div>
                <p className="cardRoom">Room 102- Dr. shah</p>
                <div className="nowServingCard">
                  <span className="nowServingLabel">Now Serving</span>
                  <span className="nowServingValue">{queues[2].current_serving_number ? `OR-${queues[2].current_serving_number}` : '-'}</span>
                </div>
                <div className="cardMetrics">
                  <div className="metricGroup">
                    <span className="metricLabel">Waiting</span>
                    <span className="nextTokenValue">{queues[2].total_waiting}</span>
                  </div>
                  <div className="metricGroup">
                    <span className="metricLabel">Avg wait</span>
                    <span className="avgWaitValue" style={{color: '#16beab'}}>{queues[2].avg_wait_time} mins</span>
                  </div>
                </div>
              </article>

              <article className="queueCard">
                <div className="cardHeader">
                  <h2 className="cardTitle">Pediatrics</h2>
                </div>
                <p className="cardRoom">Room 103- Dr. sarah</p>
                <div className="nowServingCard">
                  <span className="nowServingLabel">Now Serving</span>
                  <span className="nowServingValue">{queues[3].current_serving_number ? `PD-${queues[3].current_serving_number}` : '-'}</span>
                </div>
                <div className="cardMetrics">
                  <div className="metricGroup">
                    <span className="metricLabel">Waiting</span>
                    <span className="nextTokenValue">{queues[3].total_waiting}</span>
                  </div>
                  <div className="metricGroup">
                    <span className="metricLabel">Avg wait</span>
                    <span className="avgWaitValue" style={{color: '#e71919'}}>{queues[3].avg_wait_time} mins</span>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section className="rightSection" aria-label="Token issuing">
            <div className="tokenFormContainer">
              <button className="generateTokenBtn" type="button" onClick={() => setIssuedToken(null)}>
                <span>Generate new token</span>
              </button>

              <button className="generateTokenBtn searchTokenBtn" type="button">
                <span>Search patient</span>
              </button>

              <div className="formCard">
                {!issuedToken ? (
                  <div>
                    <h2 className="formTitle">Issue New Token</h2>

                    <div className="formGroup">
                      <label className="formLabel">Patient Name</label>
                      <input
                        type="text"
                        className="formInput"
                        placeholder="Enter full name"
                        value={formData.patientName}
                        onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                      />
                    </div>

                    <div className="formGroup">
                      <label className="formLabel">Mobile Number</label>
                      <input
                        type="tel"
                        className="formInput"
                        placeholder="+91 99999-99999"
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                      />
                    </div>

                    <div className="formGroup">
                      <label className="formLabel">Department</label>
                      <div className="selectWrapper">
                        <select className="formSelect" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})}>
                          <option value="" disabled hidden>Select department</option>
                          <option value="General Medicine">General Medicine</option>
                          <option value="Orthopedics">Orthopedics</option>
                          <option value="Pediatrics">Pediatrics</option>
                        </select>
                      </div>
                    </div>

                    <div className="formGroup">
                      <label className="formLabel">Doctor</label>
                      <div className="selectWrapper">
                        <select className="formSelect" value={formData.doctor} onChange={(e) => setFormData({...formData, doctor: e.target.value})}>
                          <option value="" disabled hidden>Select doctor</option>
                          <option value="Dr.abc">Dr.abc</option>
                          <option value="Dr. Mehta">Dr. Mehta</option>
                          <option value="Dr. shah">Dr. shah</option>
                          <option value="Dr. sarah">Dr. sarah</option>
                        </select>
                      </div>
                    </div>

                    <button className="issueTokenBtn" type="button" onClick={handleIssueToken} disabled={loading}>
                      {loading ? 'Processing...' : 'Issue Token'}
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2 className="formTitle">Token Issued</h2>
                    <div className="tokenNumber">{issuedToken.number}</div>
                    <div className="tokenDetails">
                      <p className="tokenDetailItem">
                        <span className="tokenDetailLabel">Department:</span>
                        <span className="tokenDetailValue">{issuedToken.department}</span>
                      </p>
                      <p className="tokenDetailItem">
                        <span className="tokenDetailLabel">Doctor:</span>
                        <span className="tokenDetailValue">{issuedToken.doctor}</span>
                      </p>
                    </div>
                    <button className="issueTokenBtn" type="button" onClick={() => setIssuedToken(null)} style={{marginTop: '20px'}}>
                      Issue Another Token
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
