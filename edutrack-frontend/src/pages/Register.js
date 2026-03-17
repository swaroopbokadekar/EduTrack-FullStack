import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(userData);
      alert("✅ Registration Successful! Now you can Login.");
      navigate('/'); // Go back to login page
    } catch (error) {
      alert("Registration Failed! Username might already exist.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Choose Username" style={styles.input} onChange={(e) => setUserData({...userData, username: e.target.value})} required />
          <input type="password" placeholder="Choose Password" style={styles.input} onChange={(e) => setUserData({...userData, password: e.target.value})} required />
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={{marginTop: '15px'}}>Already have an account? <Link to="/">Login here</Link></p>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#6c5ce7' },
  card: { padding: '40px', background: 'white', borderRadius: '15px', width: '350px', textAlign: 'center' },
  input: { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', background: '#2d3436', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }
};

export default Register;