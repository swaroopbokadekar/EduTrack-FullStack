import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(userData);
      alert("✅ Identity Initialized. You can now access the portal.");
      navigate('/'); 
    } catch (error) {
      alert("❌ Initialization Error: Identity already exists or network failure.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Background Cyber-Grid Effect */}
      <div style={styles.gridOverlay}></div>

      <div style={styles.glassCard}>
        <div style={styles.aiIcon}>💠</div>
        <h2 style={styles.title}>EduTrack <span style={styles.aiBadge}>AI</span></h2>
        <p style={styles.subtitle}>Initialize your system identity</p>
        
        <form onSubmit={handleRegister}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Choose Identity Name</label>
            <input 
              type="text" 
              placeholder="e.g. PRAJWAL" 
              style={styles.darkInput} 
              onChange={(e) => setUserData({...userData, username: e.target.value})} 
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Set Security Cipher</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              style={styles.darkInput} 
              onChange={(e) => setUserData({...userData, password: e.target.value})} 
              required
            />
          </div>

          <button type="submit" style={styles.neonBtn} disabled={loading}>
            {loading ? "Initializing..." : "Register Identity"}
          </button>
        </form>
        <p style={styles.footerText}>Existing entity? <Link to="/" style={styles.link}>Access Portal</Link></p>
      </div>
    </div>
  );
};

// --- Futuristic styles shared with Login ---
const styles = {
  appContainer: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0a0b10', position: 'relative', overflow: 'hidden', fontFamily: "'Inter', sans-serif" },
  gridOverlay: { position: 'absolute', width: '100%', height: '100%', background: 'linear-gradient(rgba(0, 210, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 210, 255, 0.03) 1px, transparent 1px)', backgroundSize: '50px 50px', zIndex: 1 },
  glassCard: { zIndex: 2, padding: '50px', background: 'rgba(15, 17, 26, 0.7)', backdropFilter: 'blur(15px)', borderRadius: '25px', border: '1px solid rgba(0, 210, 255, 0.1)', width: '400px', textAlign: 'center', boxShadow: '0 0 30px rgba(0, 210, 255, 0.1)' },
  aiIcon: { fontSize: '60px', marginBottom: '10px', filter: 'drop-shadow(0 0 10px #00d2ff)' },
  title: { margin: '0', color: '#fff', fontSize: '28px', fontWeight: '800', letterSpacing: '1px' },
  aiBadge: { background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', verticalAlign: 'middle' },
  subtitle: { color: '#808080', marginBottom: '40px', fontSize: '14px' },
  inputGroup: { textAlign: 'left', marginBottom: '25px' },
  label: { display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold', color: '#fff', letterSpacing: '0.5px' },
  darkInput: { width: '100%', padding: '15px', background: '#10121a', border: '1px solid #2a2e3a', color: '#fff', borderRadius: '12px', boxSizing: 'border-box', outline: 'none', transition: '0.3s', fontSize: '15px' },
  neonBtn: { width: '100%', padding: '15px', background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 0 15px rgba(0, 210, 255, 0.3)' },
  footerText: { color: '#808080', marginTop: '25px', fontSize: '14px' },
  link: { color: '#00d2ff', textDecoration: 'none', fontWeight: 'bold' }
};

export default Register;