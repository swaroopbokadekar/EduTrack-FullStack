import React, { useState, useEffect } from 'react';
import { getStudents, addStudent, deleteStudent } from '../services/api';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', grade: '' });

  useEffect(() => { loadData(); }, []);
  const loadData = async () => { const res = await getStudents(); setStudents(res.data); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudent(formData);
    setFormData({ name: '', email: '', grade: '' });
    loadData();
  };

  return (
    <div style={styles.container}>
      {/* AI Registration Card */}
      <div style={styles.glassCard}>
        <h3 style={styles.cardTitle}>
          <span style={styles.pulseDot}></span> Neural Registry: New Student
        </h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputWrapper}>
            <input 
              placeholder="Identity Name" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              style={styles.darkInput} 
              required 
            />
          </div>
          <div style={styles.inputWrapper}>
            <input 
              placeholder="Academic Rank (Grade)" 
              value={formData.grade} 
              onChange={(e) => setFormData({...formData, grade: e.target.value})} 
              style={styles.darkInput} 
              required 
            />
          </div>
          {/* Added Hover Class via inline style trick */}
          <button 
            type="submit" 
            style={styles.neonBtn}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 210, 255, 0.6)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = styles.neonBtn.boxShadow;
            }}
          >
            Initialize Entry
          </button>
        </form>
      </div>

      {/* Futuristic Data Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.aiTable}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>ID-TAG</th>
              <th style={styles.th}>ENTITY NAME</th>
              <th style={styles.th}>RANK</th>
              <th style={styles.th}>SYSTEM ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr 
                key={s.id} 
                style={styles.tr}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={styles.idCell}>#{s.id}</td>
                <td style={styles.nameCell}>{s.name}</td>
                <td>
                  <span style={{
                    ...styles.gradeBadge,
                    color: s.grade === 'A' ? '#00ff88' : s.grade === 'B' ? '#00d2ff' : '#ff9f43',
                    borderColor: s.grade === 'A' ? 'rgba(0, 255, 136, 0.3)' : 'rgba(0, 210, 255, 0.3)'
                  }}>
                    {s.grade}
                  </span>
                </td>
                <td style={styles.pad}>
                  <button 
                    onClick={() => deleteStudent(s.id).then(loadData)} 
                    style={styles.deleteBtn}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 75, 92, 0.3)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 75, 92, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    TERMINATE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- 2026 AI TREND STYLES ---
const styles = {
  container: {
    padding: '30px',
    animation: 'fadeIn 0.8s ease-out',
  },
  glassCard: {
    background: 'rgba(22, 25, 34, 0.7)',
    backdropFilter: 'blur(12px)',
    padding: '30px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '40px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  },
  cardTitle: {
    margin: '0 0 25px 0',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    letterSpacing: '0.5px'
  },
  pulseDot: {
    width: '8px',
    height: '8px',
    background: '#00d2ff',
    borderRadius: '50%',
    boxShadow: '0 0 10px #00d2ff',
    animation: 'pulse 2s infinite', // Note: Animation requires @keyframes in your CSS file
  },
  form: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  inputWrapper: { flex: 1, minWidth: '200px' },
  darkInput: {
    width: '100%',
    background: '#0a0b10',
    border: '1px solid #2a2e3a',
    padding: '14px 20px',
    borderRadius: '12px',
    color: '#fff',
    outline: 'none',
    transition: 'all 0.3s ease', // Added transition
    boxSizing: 'border-box'
  },
  neonBtn: {
    background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)',
    color: '#fff',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 0 15px rgba(0, 210, 255, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth cubic transition
  },
  tableWrapper: {
    background: 'rgba(22, 25, 34, 0.6)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
  },
  aiTable: { width: '100%', borderCollapse: 'collapse', color: '#e0e0e0' },
  headerRow: { background: 'rgba(255, 255, 255, 0.03)' },
  th: { padding: '18px', textAlign: 'left', fontSize: '12px', color: '#70757a', letterSpacing: '1.5px' },
  tr: { 
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
    transition: 'background-color 0.3s ease' // Added transition
  },
  idCell: { padding: '18px', color: '#00d2ff', fontFamily: 'monospace', fontWeight: 'bold' },
  nameCell: { padding: '18px', fontWeight: '500', color: '#fff' },
  gradeBadge: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '5px 14px',
    borderRadius: '8px',
    fontSize: '12px',
    border: '1px solid',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  },
  deleteBtn: {
    background: 'rgba(255, 75, 92, 0.1)',
    color: '#ff4b5c',
    border: '1px solid rgba(255, 75, 92, 0.2)',
    padding: '6px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease' // Added transition
  },
  pad: { padding: '18px' }
};

export default StudentsPage;