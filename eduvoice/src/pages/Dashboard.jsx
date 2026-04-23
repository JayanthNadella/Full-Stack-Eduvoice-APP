import { useApp } from '../context/AppContext';
import ComplaintCard from '../components/ComplaintCard';

export default function Dashboard() {
  const { currentUser, complaints, navigate } = useApp();

  const userComplaints = currentUser.role === 'student'
    ? complaints.filter(c => c.student === currentUser.id)
    : complaints;

  const stats = {
    total: userComplaints.length,
    pending: userComplaints.filter(c => c.status === 'Pending').length,
    review: userComplaints.filter(c => c.status === 'Under Review').length,
    progress: userComplaints.filter(c => c.status === 'In Progress').length,
    resolved: userComplaints.filter(c => c.status === 'Resolved').length,
    critical: userComplaints.filter(c => c.priority === 'Critical').length,
  };

  const statCards = [
    { label: 'Total Complaints', value: stats.total, icon: '📋', color: '#6c63ff' },
    { label: 'Pending', value: stats.pending, icon: '⏳', color: '#f7971e' },
    { label: 'Under Review', value: stats.review, icon: '🔍', color: '#7c5cfc' },
    { label: 'In Progress', value: stats.progress, icon: '⚙️', color: '#00b4d8' },
    { label: 'Resolved', value: stats.resolved, icon: '✅', color: '#43e97b' },
    { label: 'Critical', value: stats.critical, icon: '🚨', color: '#ff3366' },
  ];

  const recent = [...userComplaints]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div>
      <div className="stats-grid">
        {statCards.map((s, i) => (
          <div className="stat-card" key={s.label} style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="stat-glow" style={{ background: s.color }} />
            <div className="stat-icon" style={{ background: `${s.color}22`, color: s.color }}>{s.icon}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize:16, marginBottom:16, color:'var(--text2)' }}>Recent Activity</h3>

      {recent.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No complaints yet</h3>
          <p>Submit your first complaint to get started</p>
        </div>
      ) : (
        <div className="complaint-list">
          {recent.map(c => <ComplaintCard key={c._id} complaint={c} />)}
        </div>
      )}

      {currentUser.role === 'student' && (
        <div style={{ marginTop:20 }}>
          <button className="btn btn-primary" style={{ width:'auto', padding:'14px 32px' }} onClick={() => navigate('new-complaint')}>
            ✏️ Submit New Complaint
          </button>
        </div>
      )}
    </div>
  );
}
