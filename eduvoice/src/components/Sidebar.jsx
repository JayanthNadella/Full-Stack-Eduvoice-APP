import { useApp } from '../context/AppContext';

export default function Sidebar() {
  const { currentUser, currentPage, navigate, logout, pendingCount, sidebarOpen } = useApp();

  const NavItem = ({ id, icon, label, badge }) => (
    <button
      className={`nav-item ${currentPage === id ? 'active' : ''}`}
      onClick={() => navigate(id)}
    >
      <span className="nav-icon">{icon}</span>
      {label}
      {badge > 0 && <span className="nav-badge">{badge}</span>}
    </button>
  );

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-icon" style={{ width:36, height:36, fontSize:16, borderRadius:10 }}>🎓</div>
        <div>
          <div className="logo-text" style={{ fontSize:16 }}>EduVoice</div>
          <div className="logo-sub">College Portal</div>
        </div>
      </div>

      <nav className="nav-section">
        <div className="nav-label">Main</div>
        <NavItem id="dashboard" icon="📊" label="Dashboard" />
        <NavItem id="complaints" icon="📋" label="Complaints" badge={pendingCount} />

        {currentUser.role === 'student' && (
          <>
            <div className="nav-label" style={{ marginTop: 12 }}>Student</div>
            <NavItem id="new-complaint" icon="✏️" label="New Complaint" />
            <NavItem id="my-complaints" icon="📁" label="My Complaints" />
          </>
        )}

        {currentUser.role === 'admin' && (
          <>
            <div className="nav-label" style={{ marginTop: 12 }}>Admin</div>
            <NavItem id="all-complaints" icon="🗂️" label="All Complaints" />
            <NavItem id="analytics" icon="📈" label="Analytics" />
          </>
        )}

        <div className="nav-label" style={{ marginTop: 12 }}>Account</div>
        <NavItem id="profile" icon="👤" label="Profile" />
      </nav>

      <div className="sidebar-user">
        <div className="user-avatar">{currentUser.avatar || '??'}</div>
        <div className="user-info">
          <div className="user-name">{currentUser.name}</div>
          <span className="user-role">{currentUser.role}</span>
        </div>
        <button className="logout-btn" onClick={logout} title="Logout">⏻</button>
      </div>
    </aside>
  );
}
