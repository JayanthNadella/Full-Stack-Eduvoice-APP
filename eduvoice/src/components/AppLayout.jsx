import { useApp } from '../context/AppContext';
import Sidebar from './Sidebar';
import Dashboard from '../pages/Dashboard';
import ComplaintsList from '../pages/ComplaintsList';
import NewComplaint from '../pages/NewComplaint';
import Analytics from '../pages/Analytics';
import Profile from '../pages/Profile';
import ComplaintModal from './ComplaintModal';

const pageMeta = {
  dashboard: { title: 'Dashboard' },
  complaints: { title: 'All Complaints', sub: 'Track and manage all complaints' },
  'new-complaint': { title: 'New Complaint', sub: 'Submit a new complaint or grievance' },
  'my-complaints': { title: 'My Complaints', sub: 'View all your submitted complaints' },
  'all-complaints': { title: 'All Complaints', sub: 'Review and manage all student complaints' },
  analytics: { title: 'Analytics', sub: 'Insights and statistics' },
  profile: { title: 'My Profile', sub: 'Your account information' },
};

export default function AppLayout() {
  const { currentUser, currentPage, navigate, sidebarOpen, setSidebarOpen, modalComplaintId } = useApp();

  const meta = pageMeta[currentPage] || {};
  const title = currentPage === 'dashboard'
    ? `Dashboard`
    : meta.title;
  const sub = currentPage === 'dashboard'
    ? `Welcome back, ${currentUser.name.split(' ')[0]}! 👋`
    : meta.sub;

  const showNewBtn = ['my-complaints','all-complaints','complaints'].includes(currentPage) && currentUser.role === 'student';

  return (
    <div className="app-layout">
      {sidebarOpen && <div className="sidebar-overlay active" onClick={() => setSidebarOpen(false)} />}

      <Sidebar />

      <div className="main-content">
        <div className="topbar">
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
          <div style={{ flex: 1 }}>
            <div className="page-title">{title}</div>
            {sub && <div className="page-sub">{sub}</div>}
          </div>
          <div className="topbar-actions">
            {showNewBtn && (
              <button className="btn btn-primary btn-sm" onClick={() => navigate('new-complaint')}>
                + New Complaint
              </button>
            )}
          </div>
        </div>

        <div className="content-area">
          {currentPage === 'dashboard' && <Dashboard />}
          {(currentPage === 'complaints' || currentPage === 'my-complaints') && <ComplaintsList isAdmin={false} />}
          {currentPage === 'all-complaints' && <ComplaintsList isAdmin={true} />}
          {currentPage === 'new-complaint' && <NewComplaint />}
          {currentPage === 'analytics' && <Analytics />}
          {currentPage === 'profile' && <Profile />}
        </div>
      </div>

      {modalComplaintId && <ComplaintModal />}
    </div>
  );
}
