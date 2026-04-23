import { useApp } from '../context/AppContext';

export function statusClass(status) {
  return status.toLowerCase()
    .replace('under review', 'review')
    .replace('in progress', 'progress')
    .replace(' ', '-');
}

export default function ComplaintCard({ complaint }) {
  const { currentUser, setModalComplaintId } = useApp();
  const c = complaint;
  const sc = statusClass(c.status);
  const pc = c.priority.toLowerCase();
  const date = new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const commentCount = (c.comments || []).length;

  return (
    <div
      className="complaint-card"
      style={{ animationDelay: `${Math.random() * 0.2}s` }}
      onClick={() => setModalComplaintId(c._id)}
    >
      <div className="complaint-header">
        <div className="complaint-title">{c.title}</div>
      </div>
      <div className="complaint-meta">
        <span className={`chip chip-${sc}`}>{c.status}</span>
        <span className={`chip chip-${pc}`}>{c.priority}</span>
        <span className="chip chip-cat">{c.category}</span>
        {c.isAnonymous && (
          <span className="chip" style={{ background:'rgba(255,255,255,0.05)', color:'var(--text3)', borderColor:'var(--border)' }}>
            🎭 Anonymous
          </span>
        )}
      </div>
      <div className="complaint-desc">{c.description}</div>
      <div className="complaint-footer">
        <div className="complaint-info">
          <span>📅 {date}</span>
          {currentUser.role === 'admin' && (
            <span>👤 {c.isAnonymous ? 'Anonymous' : c.studentName}</span>
          )}
          {commentCount > 0 && (
            <span>💬 {commentCount} comment{commentCount > 1 ? 's' : ''}</span>
          )}
        </div>
        <span style={{ color:'var(--accent)', fontSize:12, fontWeight:600 }}>View Details →</span>
      </div>
    </div>
  );
}
