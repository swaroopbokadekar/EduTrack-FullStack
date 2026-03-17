import React, { useState, useEffect } from 'react';
import { getStudents, getAttendance, markAttendance } from '../services/api';

const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const sRes = await getStudents();
    const aRes = await getAttendance();
    setStudents(sRes.data);
    setHistory(aRes.data);
  };

  const handleMark = async (student, status) => {
    await markAttendance({ studentId: student.id, studentName: student.name, status });
    loadData();
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <h2 style={styles.title}>
            <span style={styles.livePulse}></span>📡 Live Attendance Feed
        </h2>
        <p style={styles.subtitle}>System Timestamp: {new Date().toLocaleTimeString()} | {new Date().toLocaleDateString()}</p>
      </div>

      <div style={styles.mainGrid}>
        {/* Active Student Monitoring */}
        <div style={styles.glassCard}>
          <table style={styles.aiTable}>
            <thead>
              <tr style={styles.thRow}><th>ENTITY</th><th>ACTION</th></tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr 
                    key={s.id} 
                    style={styles.tr}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={styles.nameCell}>{s.name}</td>
                  <td>
                    <button 
                        onClick={() => handleMark(s, 'Present')} 
                        style={styles.presentBtn}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        ACTIVE
                    </button>
                    <button 
                        onClick={() => handleMark(s, 'Absent')} 
                        style={styles.absentBtn}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 75, 92, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        OFFLINE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* History Feed */}
        <div style={styles.glassCard}>
          <h4 style={styles.smallTitle}>Log History</h4>
          <div style={styles.historyContainer}>
            {history.slice(-8).reverse().map(h => (
                <div key={h.id} style={styles.logItem}>
                <span style={styles.logTime}>{h.date}</span>
                <span style={styles.logText}>
                    {h.studentName} <span style={{fontSize: '10px', color: '#444'}}>▶</span> <strong style={{color: h.status === 'Present' ? '#00ff88' : '#ff4b5c', letterSpacing: '1px'}}>{h.status.toUpperCase()}</strong>
                </span>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '30px', animation: 'fadeIn 0.5s ease' },
  headerSection: { marginBottom: '30px' },
  title: { color: '#fff', fontSize: '24px', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' },
  livePulse: { width: '10px', height: '10px', background: '#ff4b5c', borderRadius: '50%', boxShadow: '0 0 10px #ff4b5c', animation: 'pulse 1.5s infinite' },
  subtitle: { color: '#70757a', fontSize: '14px', marginTop: '5px' },
  mainGrid: { display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '30px' },
  glassCard: { background: 'rgba(22, 25, 34, 0.7)', backdropFilter: 'blur(12px)', borderRadius: '20px', padding: '25px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' },
  aiTable: { width: '100%', borderCollapse: 'collapse' },
  thRow: { textAlign: 'left', color: '#70757a', fontSize: '12px', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s ease' },
  nameCell: { padding: '18px 0', color: '#fff', fontWeight: '500', fontSize: '15px' },
  presentBtn: { background: 'rgba(0, 255, 136, 0.1)', color: '#00ff88', border: '1px solid #00ff88', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', marginRight: '10px', fontSize: '11px', fontWeight: 'bold', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' },
  absentBtn: { background: 'rgba(255, 75, 92, 0.1)', color: '#ff4b5c', border: '1px solid #ff4b5c', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' },
  historyContainer: { marginTop: '15px' },
  logItem: { padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px' },
  logTime: { color: '#00d2ff', fontSize: '11px', fontFamily: 'monospace', opacity: 0.8 },
  logText: { color: '#e0e0e0' },
  smallTitle: { color: '#fff', marginTop: 0, fontSize: '16px', letterSpacing: '1px', borderBottom: '1px solid rgba(0,210,255,0.2)', paddingBottom: '10px' }
};

export default AttendancePage;