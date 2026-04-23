import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function AuthScreen() {
  const { login, register } = useApp();
  const [tab, setTab] = useState('login');
  const [role, setRole] = useState('student');

  // Login fields
  const [loginEmail, setLoginEmail] = useState('priya@student.edu');
  const [loginPassword, setLoginPassword] = useState('admin123');

  // Register fields
  const [regName, setRegName] = useState('');
  const [regId, setRegId] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regDept, setRegDept] = useState('');
  const [regYear, setRegYear] = useState('1st Year');
  const [regPassword, setRegPassword] = useState('');

  const selectRole = (r) => {
    setRole(r);
    if (r === 'admin') {
      setLoginEmail('admin@college.edu');
      setLoginPassword('admin123');
    } else {
      setLoginEmail('priya@student.edu');
      setLoginPassword('admin123');
    }
  };

  const handleLogin = () => login(loginEmail, loginPassword);

  const handleRegister = () =>
    register({ name: regName, studentId: regId, email: regEmail, department: regDept, year: regYear, password: regPassword });

  return (
    <div className="auth-screen">
      <div className="auth-bg-blob blob1" />
      <div className="auth-bg-blob blob2" />
      <div className="auth-bg-blob blob3" />

      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-icon">🎓</div>
          <div>
            <div className="logo-text">EduVoice</div>
            <div className="logo-sub">Complaint Portal</div>
          </div>
        </div>

        <div className="auth-tabs">
          <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Sign In</button>
          <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => setTab('register')}>Register</button>
        </div>

        {tab === 'login' ? (
          <div>
            <div className="role-tabs">
              <button className={`role-tab ${role === 'student' ? 'active' : ''}`} onClick={() => selectRole('student')}>
                <span>🎒</span> Student
              </button>
              <button className={`role-tab ${role === 'admin' ? 'active' : ''}`} onClick={() => selectRole('admin')}>
                <span>🛡️</span> Admin
              </button>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" className="form-input" placeholder="you@college.edu"
                value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-input" placeholder="••••••••"
                value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            </div>
            <button className="btn btn-primary" onClick={handleLogin}>Sign In →</button>

            <div className="demo-hint" style={{ textAlign:'center', marginTop:'20px', fontSize:'12px', color:'var(--text3)', background:'var(--bg)', borderRadius:'8px', padding:'12px', border:'1px solid var(--border)' }}>
              Demo: <span style={{ color:'var(--accent)', fontWeight:500 }}>priya@student.edu</span> or <span style={{ color:'var(--accent)', fontWeight:500 }}>admin@college.edu</span> / <span style={{ color:'var(--accent)', fontWeight:500 }}>admin123</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-input" placeholder="Arjun Mehta"
                  value={regName} onChange={e => setRegName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Student ID</label>
                <input type="text" className="form-input" placeholder="CS2024001"
                  value={regId} onChange={e => setRegId(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" className="form-input" placeholder="you@student.edu"
                value={regEmail} onChange={e => setRegEmail(e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <select className="form-input" value={regDept} onChange={e => setRegDept(e.target.value)}>
                  <option value="">Select</option>
                  {['Computer Science','Electronics','Mechanical','Civil','Chemistry','Physics','Mathematics'].map(d => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Year</label>
                <select className="form-input" value={regYear} onChange={e => setRegYear(e.target.value)}>
                  {['1st Year','2nd Year','3rd Year','4th Year'].map(y => <option key={y}>{y}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-input" placeholder="At least 8 characters"
                value={regPassword} onChange={e => setRegPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={handleRegister}>Create Account →</button>
          </div>
        )}
      </div>
    </div>
  );
}
