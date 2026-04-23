import { useState } from 'react';
import { useApp } from '../context/AppContext';
import ComplaintCard from '../components/ComplaintCard';

const CATEGORIES = ['Academic','Infrastructure','Administration','Faculty','Hostel','Canteen','Library','Transport','Other'];
const STATUSES = ['Pending','Under Review','In Progress','Resolved','Rejected'];
const PRIORITIES = ['Critical','High','Medium','Low'];

export default function ComplaintsList({ isAdmin }) {
  const { currentUser, complaints } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const source = isAdmin
    ? complaints
    : complaints.filter(c => c.student === currentUser.id);

  const filtered = source.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || c.status === statusFilter;
    const matchCat = !categoryFilter || c.category === categoryFilter;
    const matchPri = !priorityFilter || c.priority === priorityFilter;
    return matchSearch && matchStatus && matchCat && matchPri;
  });

  const sorted = [...filtered].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      <div className="filter-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input type="text" className="form-input" placeholder="Search complaints..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="filter-select" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className="filter-select" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
          <option value="">All Priority</option>
          {PRIORITIES.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      {sorted.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No complaints found</h3>
          <p>Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className="complaint-list">
          {sorted.map(c => <ComplaintCard key={c._id} complaint={c} />)}
        </div>
      )}
    </div>
  );
}
