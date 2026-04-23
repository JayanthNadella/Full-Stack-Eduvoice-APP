import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast } = useApp();
  const icon = toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️';
  const borderColor = toast.type === 'success'
    ? 'rgba(67,233,123,0.3)'
    : toast.type === 'error'
    ? 'rgba(255,101,132,0.3)'
    : 'var(--border)';

  return (
    <div className={`toast ${toast.show ? 'show' : ''}`} style={{ borderColor }}>
      <span className="toast-icon">{icon}</span>
      <span>{toast.msg}</span>
    </div>
  );
}
