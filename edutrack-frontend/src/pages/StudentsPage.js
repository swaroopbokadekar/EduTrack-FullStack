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
    <div style={{ padding: '20px' }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Register New Student</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={inp} required />
          <input placeholder="Grade" value={formData.grade} onChange={(e) => setFormData({...formData, grade: e.target.value})} style={inp} required />
          <button type="submit" style={btn}>Save Student</button>
        </form>
      </div>
      <table style={tbl}>
        <thead style={{ background: '#f8f9fa' }}>
          <tr><th style={pad}>ID</th><th style={pad}>Name</th><th style={pad}>Grade</th><th style={pad}>Actions</th></tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={pad}>{s.id}</td><td style={pad}>{s.name}</td><td style={pad}>{s.grade}</td>
              <td style={pad}><button onClick={() => deleteStudent(s.id).then(loadData)} style={{background:'red', color:'white', border:'none', padding:'5px', borderRadius:'4px', cursor:'pointer'}}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const inp = { padding: '10px', borderRadius: '4px', border: '1px solid #ddd', flex: 1 };
const btn = { background: '#1a73e8', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' };
const tbl = { width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px' };
const pad = { padding: '12px', textAlign: 'left' };

export default StudentsPage;