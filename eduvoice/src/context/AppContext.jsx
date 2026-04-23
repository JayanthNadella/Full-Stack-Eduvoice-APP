import { createContext, useContext, useState, useCallback } from 'react';
import { demoUsers, initialComplaints } from '../data/demoData';

const AppContext = createContext(null);

let complaintCounter = 6;

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [complaints, setComplaints] = useState(initialComplaints);
  const [users, setUsers] = useState(demoUsers);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalComplaintId, setModalComplaintId] = useState(null);

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
  }, []);

  const login = useCallback((email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) { showToast('Invalid email or password', 'error'); return false; }
    setCurrentUser(user);
    setCurrentPage('dashboard');
    return true;
  }, [users, showToast]);

  const register = useCallback((data) => {
    if (!data.name || !data.email || !data.password) {
      showToast('Please fill all required fields', 'error'); return false;
    }
    if (users.find(u => u.email === data.email)) {
      showToast('Email already registered', 'error'); return false;
    }
    const initials = data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const newUser = {
      id: `user_${Date.now()}`,
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'student',
      studentId: data.studentId,
      department: data.department,
      year: data.year,
      avatar: initials,
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setCurrentPage('dashboard');
    showToast('Account created successfully!', 'success');
    return true;
  }, [users, showToast]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setCurrentPage('dashboard');
    showToast('Logged out successfully', 'success');
  }, [showToast]);

  const navigate = useCallback((page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  }, []);

  const submitComplaint = useCallback((data) => {
    const newC = {
      _id: `c00${complaintCounter++}`,
      ...data,
      status: 'Pending',
      student: currentUser.id,
      studentName: data.isAnonymous ? 'Anonymous' : currentUser.name,
      studentId: currentUser.studentId || 'N/A',
      department: currentUser.department || 'N/A',
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setComplaints(prev => [newC, ...prev]);
    showToast('Complaint submitted successfully! 🎉', 'success');
    navigate('my-complaints');
  }, [currentUser, showToast, navigate]);

  const updateComplaintStatus = useCallback((id, status) => {
    setComplaints(prev => prev.map(c =>
      c._id === id
        ? { ...c, status, updatedAt: new Date().toISOString(), ...(status === 'Resolved' ? { resolvedAt: new Date().toISOString() } : {}) }
        : c
    ));
    showToast(`Status updated to ${status}`, 'success');
  }, [showToast]);

  const saveAdminNote = useCallback((id, note) => {
    setComplaints(prev => prev.map(c => c._id === id ? { ...c, adminNote: note } : c));
    showToast('Note saved!', 'success');
  }, [showToast]);

  const addComment = useCallback((id, text) => {
    if (!text.trim()) { showToast('Please write a comment', 'error'); return; }
    const comment = {
      _id: `cm_${Date.now()}`,
      userName: currentUser.name,
      role: currentUser.role,
      text,
      createdAt: new Date().toISOString(),
    };
    setComplaints(prev => prev.map(c =>
      c._id === id ? { ...c, comments: [...(c.comments || []), comment] } : c
    ));
    showToast('Comment added!', 'success');
  }, [currentUser, showToast]);

  const pendingCount = complaints.filter(c => c.status === 'Pending').length;

  return (
    <AppContext.Provider value={{
      currentUser, complaints, currentPage, toast,
      sidebarOpen, setSidebarOpen,
      modalComplaintId, setModalComplaintId,
      pendingCount,
      login, register, logout, navigate,
      submitComplaint, updateComplaintStatus, saveAdminNote, addComment,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
