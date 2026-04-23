import { useApp } from '../context/AppContext';

export default function Profile() {
  const { currentUser, complaints } = useApp();

  const myComplaints = complaints.filter(c => c.student === currentUser.id);
  const resolved = myComplaints.filter(c => c.status === 'Resolved').length;
  const pending = myComplaints.filter(c => c.status === 'Pending').length;

  return (
    <div>
      <div className="profile-header">
        <div className="profile-avatar">{currentUser.avatar || '??'}</div>
        <div>
          <div className="profile-name">{currentUser.name}</div>
          <div className="profile-email">✉️ {currentUser.email}</div>
          <div className="profile-tags">
            {currentUser.role === 'student' ? (
              <>
                {currentUser.studentId && <span className="tag">🎒 {currentUser.studentId}</span>}
                {currentUser.department && <span className="tag">📚 {currentUser.department}</span>}
                {currentUser.year && <span className="tag">📅 {currentUser.year}</span>}
              </>
            ) : (
              <span className="tag" style={{ color:'var(--accent)', borderColor:'rgba(108,99,255,0.4)' }}>
                🛡️ Administrator
              </span>
            )}
          </div>
        </div>
      </div>

      {currentUser.role === 'student' && (
        <div className="stats-grid" style={{ gridTemplateColumns:'repeat(3,1fr)', marginBottom:24 }}>
          <div className="stat-card">
            <div className="stat-icon" style={{ background:'rgba(108,99,255,.15)', color:'#6c63ff' }}>📋</div>
            <div className="stat-value" style={{ color:'#6c63ff' }}>{myComplaints.length}</div>
            <div className="stat-label">Total Filed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background:'rgba(67,233,123,.15)', color:'#43e97b' }}>✅</div>
            <div className="stat-value" style={{ color:'#43e97b' }}>{resolved}</div>
            <div className="stat-label">Resolved</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background:'rgba(247,151,30,.15)', color:'#f7971e' }}>⏳</div>
            <div className="stat-value" style={{ color:'#f7971e' }}>{pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      )}

      <div className="form-card" style={{ marginTop: 0 }}>
        <div className="form-section-title">Account Information</div>
        <div className="detail-grid">
          <div className="detail-section">
            <div className="detail-label">Full Name</div>
            <div className="detail-text">{currentUser.name}</div>
          </div>
          <div className="detail-section">
            <div className="detail-label">Role</div>
            <div className="detail-text" style={{ textTransform:'capitalize' }}>{currentUser.role}</div>
          </div>
          <div className="detail-section">
            <div className="detail-label">Email</div>
            <div className="detail-text">{currentUser.email}</div>
          </div>
          {currentUser.department && (
            <div className="detail-section">
              <div className="detail-label">Department</div>
              <div className="detail-text">{currentUser.department}</div>
            </div>
          )}
          {currentUser.studentId && (
            <div className="detail-section">
              <div className="detail-label">Student ID</div>
              <div className="detail-text">{currentUser.studentId}</div>
            </div>
          )}
          {currentUser.year && (
            <div className="detail-section">
              <div className="detail-label">Year</div>
              <div className="detail-text">{currentUser.year}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
