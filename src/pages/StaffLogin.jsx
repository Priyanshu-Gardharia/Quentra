import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Utilizing existing CSS globals

const StaffLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login Failed');
      }

      // Route completely based on exact sql role
      if (data.user.role.toLowerCase() === 'doctor') {
        navigate('/doctor');
      } else if (data.user.role.toLowerCase() === 'admin') {
        navigate('/admin');
      } else {
        navigate('/reception'); // default
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f4f8' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '360px' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center', fontFamily: 'var(--font-family-primary)', color: 'var(--color-text-primary)' }}>
          Staff Login
        </h2>
        {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center', fontSize: '14px' }}>{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '14px' }}>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '16px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
            />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '14px' }}>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '24px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
            />
          </div>
          
          <button 
            type="submit" 
            className="issue-token-btn" 
            style={{ width: '100%', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <button 
            type="button"
            onClick={() => navigate('/reception')}
            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}
          >
            Return to Reception
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;
