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
        alert("❌ Invalid Username or Password. Please check the database.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("⚠️ Backend Server is not running. Start your Eclipse project!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>🎓</div>
        <h2 style={styles.title}>EduTrack Pro</h2>
        <p style={styles.subtitle}>Enter your credentials to access the portal</p>
        
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input 
              type="text" 
              placeholder="e.g. SWAROOP" 
              style={styles.input} 
              onChange={(e) => setCredentials({...credentials, username: e.target.value})} 
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              style={styles.input} 
              onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
              required
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <p style={{marginTop: '15px'}}>
          New user? <Link to="/register" style={{color: '#6c5ce7', fontWeight: 'bold', textDecoration: 'none'}}>Create an Account</Link>
        </p>
        
      </div>
    </div>
  );
};

// --- MODERN STYLING ---
const styles = {
  container: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  card: { padding: '40px', background: 'white', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', width: '380px', textAlign: 'center' },
  icon: { fontSize: '50px', marginBottom: '10px' },
  title: { margin: '0', color: '#2d3436', fontSize: '24px', fontWeight: 'bold' },
  subtitle: { color: '#636e72', marginBottom: '30px', fontSize: '14px' },
  inputGroup: { textAlign: 'left', marginBottom: '20px' },
  label: { display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold', color: '#2d3436' },
  input: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #dfe6e9', boxSizing: 'border-box', outline: 'none', transition: '0.3s' },
  button: { width: '100%', padding: '12px', background: '#6c5ce7', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }
};

export default Login;