import { AppProvider } from './context/AppContext';
import AuthScreen from './pages/AuthScreen';
import AppLayout from './components/AppLayout';
import Toast from './components/Toast';
import { useApp } from './context/AppContext';

function Inner() {
  const { currentUser } = useApp();
  return (
    <>
      {currentUser ? <AppLayout /> : <AuthScreen />}
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Inner />
    </AppProvider>
  );
}
