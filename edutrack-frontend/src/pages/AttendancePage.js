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
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#2c3e50' }}>📅 Daily Attendance</h2>
      <div style={card}>
        <table style={tbl}>
          <thead>
            <tr style={thRow}><th>Student Name</th><th>Action</th></tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} style={trStyle}>
                <td>{s.name}</td>
                <td>
                  <button onClick={() => handleMark(s, 'Present')} style={pBtn}>Present</button>
                  <button onClick={() => handleMark(s, 'Absent')} style={aBtn}>Absent</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: '30px' }}>Recent History</h3>
      <div style={card}>
        {history.slice(-5).reverse().map(h => (
          <div key={h.id} style={historyItem}>
            <strong>{h.studentName}</strong> was marked <span style={{color: h.status === 'Present' ? 'green' : 'red'}}>{h.status}</span> on {h.date}
          </div>
        ))}
      </div>
    </div>
  );
};

// Internal Styles
const card = { background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' };
const tbl = { width: '100%', borderCollapse: 'collapse' };
const thRow = { textAlign: 'left', borderBottom: '2px solid #eee' };
const trStyle = { borderBottom: '1px solid #eee', height: '50px' };
const pBtn = { background: '#2ecc71', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' };
const aBtn = { background: '#e67e22', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' };
const historyItem = { padding: '10px', borderBottom: '1px solid #f9f9f9' };

export default AttendancePage;