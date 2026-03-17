import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import StudentsPage from './pages/StudentsPage';
import AttendancePage from './pages/AttendancePage';
import MarksPage from './pages/MarksPage';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Layout />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

const Layout = () => (
  <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f7f6' }}>
    <div style={sidebar}>
      <h2 style={{ color: '#3498db', textAlign: 'center' }}>EduTrack</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px' }}>
        <Link to="/students" style={link}>👥 Students</Link>
        <Link to="/attendance" style={link}>📅 Attendance</Link>
        <Link to="/marks" style={link}>📊 Performance</Link>
        <Link to="/" style={{ ...link, marginTop: '40px', color: '#e74c3c' }}>Logout</Link>
      </nav>
    </div>
    <div style={{ flex: 1 }}>
      <Routes>
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/marks" element={<MarksPage />} />
      </Routes>
    </div>
  </div>
);

const sidebar = { width: '240px', background: '#2c3e50', color: 'white', padding: '20px' };
const link = { color: 'white', textDecoration: 'none', padding: '12px', borderRadius: '6px', fontSize: '18px' };

export default App;