import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffLogin.css';

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
        navigate('/receptionist'); // default
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="staff-login-page">
      <div className="staff-login-card" aria-label="Staff login">
        <div className="staff-login-brandRow">
          <div className="staff-login-mark" aria-hidden="true" />
          <div className="staff-login-brandText">QUENTRA</div>
        </div>

        <h1 className="staff-login-title">Staff login</h1>
        <p className="staff-login-subtitle">Sign in to access Admin, Doctor, or Reception dashboards.</p>

        <div className="staff-login-topActions">
          <button className="staff-login-backLink" type="button" onClick={() => navigate('/')}>
            Back to home
          </button>
        </div>

        {error && <div className="staff-login-error" role="alert">{error}</div>}

        <form className="staff-login-form" onSubmit={handleLogin}>
          <div className="staff-login-field">
            <label htmlFor="staffEmail">Email</label>
            <input
              id="staffEmail"
              className="staff-login-input"
              type="email"
              placeholder="name@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="staff-login-field">
            <label htmlFor="staffPassword">Password</label>
            <input
              id="staffPassword"
              className="staff-login-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button className="staff-login-submit" type="submit" disabled={loading}>
            {loading ? 'Authenticating…' : 'Login'}
          </button>
        </form>

        <div className="staff-login-foot">
          <button className="staff-login-link" type="button" onClick={() => navigate('/queue')}>
            Go to queue
          </button>
          <button className="staff-login-link" type="button" onClick={() => navigate('/receptionist')}>
            Reception dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;
