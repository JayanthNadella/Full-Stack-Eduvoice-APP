import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { statusClass } from './ComplaintCard';

export default function ComplaintModal() {
  const { complaints, currentUser, modalComplaintId, setModalComplaintId, updateComplaintStatus, saveAdminNote, addComment } = useApp();
  const [commentText, setCommentText] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [noteInit, setNoteInit] = useState(false);

  const c = complaints.find(x => x._id === modalComplaintId);
  if (!c) return null;

  if (!noteInit) {
    setAdminNote(c.adminNote || '');
    setNoteInit(true);
  }

  const sc = statusClass(c.status);
  const pc = c.priority.toLowerCase();
  const date = new Date(c.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
  const isAdmin = currentUser.role === 'admin';
  const statuses = ['Pending', 'Under Review', 'In Progress', 'Resolved', 'Rejected'];

  const handleAddComment = () => {
    addComment(c._id, commentText);
    setCommentText('');
  };

  const handleSaveNote = () => saveAdminNote(c._id, adminNote);

  const handleUpdateStatus = (status) => {
    updateComplaintStatus(c._id, status);
    setNoteInit(false); // reset to get fresh note next render
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target.classList.contains('modal-overlay')) setModalComplaintId(null); }}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ fontSize:18, fontWeight:700, marginBottom:8 }}>{c.title}</div>
            <div className="complaint-meta" style={{ margin:0 }}>
              <span className={`chip chip-${sc}`}>{c.status}</span>
              <span className={`chip chip-${pc}`}>{c.priority}</span>
              <span className="chip chip-cat">{c.category}</span>
              {c.isAnonymous && <span className="chip" style={{ background:'rgba(255,255,255,0.05)', color:'var(--text3)', border:'1px solid var(--border)' }}>🎭 Anonymous</span>}
            </div>
          </div>
          <button className="close-btn" onClick={() => setModalComplaintId(null)}>✕</button>
        </div>

        <div className="modal-body">
          {c.adminNote && !isAdmin && (
            <div className="admin-note">
              <div className="detail-label">📌 Admin Note</div>
              <div className="detail-text">{c.adminNote}</div>
            </div>
          )}

          {isAdmin && (
            <div style={{ background:'var(--surface2)', borderRadius:14, padding:20, marginBottom:20, border:'1px solid var(--border)' }}>
              <div className="detail-label">⚙️ Admin Actions</div>
              <div className="detail-label" style={{ marginTop:12 }}>Update Status</div>
              <div className="status-grid">
                {statuses.map(s => {
                  const ssc = statusClass(s);
                  const isActive = c.status === s;
                  return (
                    <button
                      key={s}
                      className={`status-btn chip-${ssc}`}
                      style={{ opacity: isActive ? 1 : 0.5, transform: isActive ? 'scale(1.05)' : 'none' }}
                      onClick={() => handleUpdateStatus(s)}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              <div style={{ marginTop:16 }}>
                <div className="detail-label">Admin Note</div>
                <textarea
                  className="comment-input"
                  rows={2}
                  placeholder="Add a note for the student..."
                  value={adminNote}
                  onChange={e => setAdminNote(e.target.value)}
                />
                <button className="btn btn-primary btn-sm" style={{ marginTop:8, width:'auto', padding:'10px 20px' }} onClick={handleSaveNote}>
                  Save Note
                </button>
              </div>
            </div>
          )}

          <div className="detail-grid" style={{ marginBottom:20 }}>
            <div>
              <div className="detail-label">Filed by</div>
              <div className="detail-text">{c.isAnonymous ? '🎭 Anonymous' : c.studentName}</div>
            </div>
            <div>
              <div className="detail-label">Date Filed</div>
              <div className="detail-text">{date}</div>
            </div>
            {!c.isAnonymous && (
              <div>
                <div className="detail-label">Student ID</div>
                <div className="detail-text">{c.studentId}</div>
              </div>
            )}
            <div>
              <div className="detail-label">Department</div>
              <div className="detail-text">{c.department}</div>
            </div>
          </div>

          <div className="detail-section">
            <div className="detail-label">Description</div>
            <div className="detail-text">{c.description}</div>
          </div>

          <div className="comments-section">
            <div className="detail-label">💬 Comments ({(c.comments || []).length})</div>

            {(c.comments || []).length === 0 ? (
              <div style={{ color:'var(--text3)', fontSize:13, padding:'12px 0' }}>No comments yet</div>
            ) : (
              (c.comments || []).map(cm => {
                const initials = cm.userName.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
                const dt = new Date(cm.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short' });
                return (
                  <div key={cm._id} className="comment">
                    <div className="comment-header">
                      <div className="comment-avatar">{initials}</div>
                      <span className="comment-author">{cm.userName}</span>
                      <span className={`comment-role ${cm.role}`}>{cm.role}</span>
                      <span className="comment-date">{dt}</span>
                    </div>
                    <div className="comment-text">{cm.text}</div>
                  </div>
                );
              })
            )}

            <div className="comment-input-area">
              <textarea
                className="comment-input"
                rows={1}
                placeholder="Add a comment..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddComment(); } }}
              />
              <button className="btn-icon" onClick={handleAddComment}>➤</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
