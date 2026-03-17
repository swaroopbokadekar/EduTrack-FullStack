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
        <Route path="/register" element={<Register />} />
        {/* Wildcard path for the dashboard layout */}
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}

const Layout = () => (
  <div style={styles.appContainer}>
    {/* Glassmorphic Sidebar */}
    <div style={styles.sidebar}>
      <div style={styles.logoSection}>
        <span style={styles.aiIcon}>💠</span>
        <h2 style={styles.logoText}>EduTrack <span style={styles.aiBadge}>AI</span></h2>
      </div>
      <nav style={styles.nav}>
        <Link to="/students" style={styles.navLink}><span>👥</span> Students</Link>
        <Link to="/attendance" style={styles.navLink}><span>📅</span> Attendance</Link>
        <Link to="/marks" style={styles.navLink}><span>📊</span> Analytics</Link>
        <div style={styles.divider}></div>
        <Link to="/" style={styles.logoutLink}><span>🔌</span> Disconnect</Link>
      </nav>
    </div>

    {/* Main Content Area */}
    <div style={styles.mainContent}>
      <header style={styles.topHeader}>
        {/* System Breadcrumb on the left */}
        <div style={styles.breadcrumb}>
          <span>Dashboard</span> <span style={{color: '#00d2ff'}}></span>
        </div>

        {/* System Admin on the right */}
        <div style={styles.userProfile}>
          <div style={styles.statusDot}></div>
          <span>System Admin</span>
        </div>
      </header>
      
      <div style={styles.pageWrapper}>
        <Routes>
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/marks" element={<MarksPage />} />
        </Routes>
      </div>
    </div>
  </div>
);

// --- 2026 AI TREND STYLES ---
const styles = {
  appContainer: { 
    display: 'flex', 
    height: '100vh', 
    width: '100vw',
    background: '#0a0b10', 
    color: '#e0e0e0', 
    fontFamily: "'Inter', sans-serif", 
    overflow: 'hidden' 
  },
  sidebar: { 
    width: '260px', 
    background: 'rgba(15, 17, 26, 0.8)', 
    backdropFilter: 'blur(10px)', 
    borderRight: '1px solid rgba(255,255,255,0.05)', 
    display: 'flex', 
    flexDirection: 'column', 
    padding: '30px 20px' 
  },
  logoSection: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px', 
    marginBottom: '50px' 
  },
  aiIcon: { 
    fontSize: '28px', 
    filter: 'drop-shadow(0 0 8px #00d2ff)' 
  },
  logoText: { 
    fontSize: '20px', 
    fontWeight: '800', 
    letterSpacing: '1px', 
    margin: 0, 
    color: '#fff' 
  },
  aiBadge: { 
    background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)', 
    padding: '2px 6px', 
    borderRadius: '4px', 
    fontSize: '10px', 
    verticalAlign: 'middle' 
  },
  nav: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '8px' 
  },
  navLink: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '15px', 
    padding: '14px 18px', 
    color: '#a0a0a0', 
    textDecoration: 'none', 
    borderRadius: '12px', 
    transition: '0.3s', 
    fontSize: '15px' 
  },
  divider: { 
    height: '1px', 
    background: 'rgba(255,255,255,0.05)', 
    margin: '20px 0' 
  },
  logoutLink: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '15px', 
    padding: '14px 18px', 
    color: '#ff4b5c', 
    textDecoration: 'none', 
    borderRadius: '12px', 
    marginTop: 'auto' 
  },
  mainContent: { 
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    overflowY: 'auto',
    overflowX: 'hidden' 
  },
  topHeader: { 
    height: '80px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: '0 40px', 
    background: 'rgba(10, 11, 16, 0.5)', 
    backdropFilter: 'blur(5px)',
    borderBottom: '1px solid rgba(255,255,255,0.05)'
  },
  breadcrumb: {
    color: '#00d2ff', 
    fontSize: '12px', 
    fontWeight: 'bold', 
    letterSpacing: '1px'
  },
  userProfile: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px', 
    fontWeight: '500' 
  },
  statusDot: { 
    width: '10px', 
    height: '10px', 
    background: '#00ff88', 
    borderRadius: '50%', 
    boxShadow: '0 0 10px #00ff88' 
  },
  pageWrapper: { 
    padding: '40px' 
  }
};

export default App;