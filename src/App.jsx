import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReceptionDashboard from './pages/ReceptionDashboard';
import StaffLogin from './pages/StaffLogin';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reception" element={<ReceptionDashboard />} />
        <Route path="/login" element={<StaffLogin />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
