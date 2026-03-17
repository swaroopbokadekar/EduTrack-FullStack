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
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#2c3e50' }}>📊 Performance Report</h2>
      <div style={card}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px' }}>
          <select style={inp} value={data.studentId} onChange={e => setData({...data, studentId: e.target.value})} required>
            <option value="">Select Student</option>
            {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <input style={inp} placeholder="Subject" value={data.subject} onChange={e => setData({...data, subject: e.target.value})} required />
          <input style={inp} type="number" placeholder="Score" value={data.score} onChange={e => setData({...data, score: e.target.value})} required />
          <button type="submit" style={mBtn}>Assign</button>
        </form>
      </div>

      <div style={{ marginTop: '30px' }}>
        <table style={tbl}>
          <thead>
            <tr style={{ background: '#8e44ad', color: 'white' }}>
              <th style={pad}>Student</th><th style={pad}>Subject</th><th style={pad}>Score</th>
            </tr>
          </thead>
          <tbody>
            {marks.map(m => (
              <tr key={m.id} style={{ borderBottom: '1px solid #eee', background: 'white' }}>
                <td style={pad}>{m.studentName}</td><td style={pad}>{m.subject}</td><td style={pad}>{m.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const card = { background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' };
const inp = { padding: '10px', borderRadius: '4px', border: '1px solid #ddd', flex: 1 };
const mBtn = { background: '#8e44ad', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '4px', cursor: 'pointer' };
const tbl = { width: '100%', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden' };
const pad = { padding: '12px' };

export default MarksPage;