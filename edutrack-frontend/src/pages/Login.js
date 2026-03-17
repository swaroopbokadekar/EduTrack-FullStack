import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(credentials);
      if (response.data === "Success") {
        sessionStorage.setItem("user", credentials.username);
        navigate('/students'); 
      } else {
        alert("❌ Identity verification failed.");
      }
    } catch (error) {
      alert("⚠️ Portal Offline. Check Backend!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Background Grid */}
      <div style={styles.gridOverlay}></div>
      
      {/* Glassmorphic Card */}
      <div style={styles.glassCard}>
        <div style={styles.aiIcon}>💠</div>
        <h2 style={styles.title}>EduTrack <span style={styles.aiBadge}>AI</span></h2>
        <p style={styles.subtitle}>Verify identity to access the grid</p>
        
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>System Identity</label>
            <input 
              type="text" 
              placeholder="Username" 
              style={styles.darkInput} 
              onChange={(e) => setCredentials({...credentials, username: e.target.value})} 
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Security Cipher</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              style={styles.darkInput} 
              onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
              required
            />
          </div>
          <button type="submit" style={styles.neonBtn} disabled={loading}>
            {loading ? "VERIFYING..." : "ACCESS PORTAL"}
          </button>
        </form>
        <p style={styles.footerText}>New entity? <Link to="/register" style={styles.link}>Initialize Here</Link></p>
      </div>
    </div>
  );
};

const styles = {
  appContainer: { 
    height: '100vh', 
    width: '100vw', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    background: '#0a0b10', // Deep midnight base
    position: 'fixed', 
    top: 0, 
    left: 0, 
    overflow: 'hidden', 
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" 
  },
  gridOverlay: { 
    position: 'absolute', 
    width: '100%', 
    height: '100%', 
    background: 'linear-gradient(rgba(0, 210, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 210, 255, 0.05) 1px, transparent 1px)', 
    backgroundSize: '40px 40px', 
    zIndex: 1 
  },
  glassCard: { 
    zIndex: 2, 
    padding: '50px 40px', 
    background: 'rgba(15, 17, 26, 0.8)', // Glass transparency
    backdropFilter: 'blur(12px)',        // The "Glass" blur effect
    borderRadius: '30px', 
    border: '1px solid rgba(0, 210, 255, 0.3)', // Glowing neon border
    width: '400px', 
    textAlign: 'center', 
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 210, 255, 0.1)', // Outer glow
    boxSizing: 'border-box'
  },
  aiIcon: { 
    fontSize: '60px', 
    marginBottom: '15px', 
    filter: 'drop-shadow(0 0 12px #00d2ff)', // Icon glow
    display: 'inline-block'
  },
  title: { margin: '0', color: '#fff', fontSize: '28px', fontWeight: '800', letterSpacing: '1px' },
  aiBadge: { 
    background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)', 
    padding: '2px 8px', 
    borderRadius: '6px', 
    fontSize: '12px', 
    verticalAlign: 'middle' 
  },
  subtitle: { color: '#808080', marginBottom: '35px', fontSize: '14px', letterSpacing: '0.5px' },
  inputGroup: { textAlign: 'left', marginBottom: '22px' },
  label: { display: 'block', marginBottom: '8px', fontSize: '12px', color: '#00d2ff', fontWeight: 'bold', textTransform: 'uppercase' },
  darkInput: { 
    width: '100%', 
    padding: '14px', 
    background: 'rgba(0, 0, 0, 0.4)', // The modern transparent input look
    border: '1px solid rgba(255, 255, 255, 0.1)', 
    color: '#fff', 
    borderRadius: '12px', 
    boxSizing: 'border-box', 
    outline: 'none', 
    transition: '0.3s' 
  },
  neonBtn: { 
    width: '100%', 
    padding: '16px', 
    background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '12px', 
    cursor: 'pointer', 
    fontWeight: '800', 
    fontSize: '14px', 
    textTransform: 'uppercase', 
    letterSpacing: '2px', 
    marginTop: '10px',
    boxShadow: '0 0 15px rgba(0, 210, 255, 0.4)',
    transition: '0.3s'
  },
  footerText: { color: '#808080', marginTop: '25px', fontSize: '13px' },
  link: { color: '#00d2ff', textDecoration: 'none', fontWeight: 'bold' }
};

export default Login;