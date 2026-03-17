import React, { useState, useEffect } from 'react';
import { getStudents, getMarks, addMarks } from '../services/api';

const MarksPage = () => {
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);
  const [data, setData] = useState({ studentId: '', subject: '', score: '' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const sRes = await getStudents();
    const mRes = await getMarks();
    setStudents(sRes.data);
    setMarks(mRes.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const s = students.find(item => item.id === parseInt(data.studentId));
    await addMarks({ ...data, studentName: s.name });
    setData({ studentId: '', subject: '', score: '' });
    loadData();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Neural Performance Analytics</h2>
      
      <div style={styles.glassCard}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <select 
            style={styles.darkInp} 
            value={data.studentId} 
            onChange={e => setData({...data, studentId: e.target.value})} 
            required
          >
            <option value="">Select Entity</option>
            {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <input 
            style={styles.darkInp} 
            placeholder="Subject Domain" 
            value={data.subject} 
            onChange={e => setData({...data, subject: e.target.value})} 
            required 
          />
          <input 
            style={styles.darkInp} 
            type="number" 
            placeholder="Data Value (Score)" 
            value={data.score} 
            onChange={e => setData({...data, score: e.target.value})} 
            required 
          />
          <button 
            type="submit" 
            style={styles.neonBtn}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(142, 68, 173, 0.6)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Assign Data
          </button>
        </form>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.aiTable}>
          <thead>
            <tr style={styles.header}>
              <th style={styles.th}>STUDENT</th>
              <th style={styles.th}>DOMAIN</th>
              <th style={styles.th}>COMPLETION %</th>
            </tr>
          </thead>
          <tbody>
            {marks.map(m => (
              <tr 
                key={m.id} 
                style={styles.tr}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={styles.td}>{m.studentName}</td>
                <td style={styles.td}>{m.subject}</td>
                <td style={styles.td}>
                  <div style={styles.progressBarBg}>
                    <div style={{
                        ...styles.progressFill, 
                        width: `${m.score}%`,
                        boxShadow: `0 0 10px ${m.score > 70 ? '#00ff88' : '#00d2ff'}`
                    }}></div>
                  </div>
                  <span style={{
                      ...styles.scoreText,
                      color: m.score > 70 ? '#00ff88' : '#00d2ff'
                  }}>{m.score}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '30px', animation: 'fadeIn 0.5s ease' },
  title: { color: '#fff', marginBottom: '30px', letterSpacing: '1px' },
  glassCard: { 
    background: 'rgba(22, 25, 34, 0.7)', 
    backdropFilter: 'blur(12px)',
    padding: '25px', 
    borderRadius: '20px', 
    border: '1px solid rgba(255,255,255,0.05)', 
    marginBottom: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
  },
  form: { display: 'flex', gap: '15px' },
  darkInp: { 
    flex: 1, 
    background: '#0a0b10', 
    border: '1px solid #2a2e3a', 
    padding: '12px', 
    borderRadius: '10px', 
    color: '#fff',
    outline: 'none',
    transition: 'border 0.3s ease'
  },
  neonBtn: { 
    background: 'linear-gradient(90deg, #8e44ad, #3498db)', 
    color: '#fff', 
    border: 'none', 
    padding: '12px 25px', 
    borderRadius: '10px', 
    cursor: 'pointer', 
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  tableWrapper: { 
    background: 'rgba(22, 25, 34, 0.7)', 
    backdropFilter: 'blur(12px)',
    borderRadius: '20px', 
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  aiTable: { width: '100%', borderCollapse: 'collapse' },
  header: { background: 'rgba(255,255,255,0.03)', color: '#70757a', textAlign: 'left', fontSize: '12px', letterSpacing: '1px' },
  th: { padding: '20px' },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background-color 0.3s ease' },
  td: { padding: '20px', color: '#fff' },
  progressBarBg: { 
    width: '120px', 
    height: '8px', 
    background: '#0a0b10', 
    borderRadius: '10px', 
    display: 'inline-block', 
    marginRight: '15px', 
    overflow: 'hidden',
    verticalAlign: 'middle',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  progressFill: { 
    height: '100%', 
    background: 'linear-gradient(90deg, #3498db, #00ff88)', 
    borderRadius: '10px',
    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' 
  },
  scoreText: { fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace' }
};

export default MarksPage;