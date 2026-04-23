import { useState } from 'react';
import { useApp } from '../context/AppContext';

const CATEGORIES = ['Academic','Infrastructure','Administration','Faculty','Hostel','Canteen','Library','Transport','Other'];
const CAT_EMOJIS = { Academic:'📚', Infrastructure:'🏗️', Administration:'🏛️', Faculty:'👨‍🏫', Hostel:'🏠', Canteen:'🍽️', Library:'📖', Transport:'🚌', Other:'📌' };
const PRIORITIES = ['Low','Medium','High','Critical'];

export default function NewComplaint() {
  const { submitComplaint, navigate, showToast } = useApp();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) { alert('Please enter a title'); return; }
    if (!category) { alert('Please select a category'); return; }
    if (!description.trim()) { alert('Please describe your issue'); return; }
    submitComplaint({ title: title.trim(), description: description.trim(), category, priority, isAnonymous });
  };

  return (
    <div className="form-card">
      <div className="form-section-title">Complaint Details</div>

      <div className="form-group">
        <label>Complaint Title *</label>
        <input type="text" className="form-input" placeholder="Brief title describing your issue"
          value={title} onChange={e => setTitle(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Category *</label>
        <div className="category-grid">
          {CATEGORIES.map(cat => (
            <button key={cat} type="button"
              className={`category-btn ${category === cat ? 'selected' : ''}`}
              onClick={() => setCategory(cat)}>
              {CAT_EMOJIS[cat]} {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Priority *</label>
        <div className="priority-grid">
          {PRIORITIES.map(p => (
            <button key={p} type="button"
              className={`priority-btn priority-${p.toLowerCase()} ${priority === p ? 'selected' : ''}`}
              onClick={() => setPriority(p)}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Detailed Description *</label>
        <textarea className="form-input" rows={5}
          placeholder="Describe the issue in detail. Include relevant dates, locations, and any previous attempts to resolve it..."
          value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      <div className="toggle-row">
        <div>
          <div style={{ fontSize:14, fontWeight:500 }}>Submit Anonymously</div>
          <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>Your name will be hidden from the complaint</div>
        </div>
        <label className="toggle">
          <input type="checkbox" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} />
          <span className="toggle-slider" />
        </label>
      </div>

      <div style={{ marginTop:24, display:'flex', gap:12 }}>
        <button className="btn btn-primary" style={{ flex:1 }} onClick={handleSubmit}>
          🚀 Submit Complaint
        </button>
        <button className="btn btn-outline btn-sm" onClick={() => navigate('my-complaints')}>Cancel</button>
      </div>
    </div>
  );
}
