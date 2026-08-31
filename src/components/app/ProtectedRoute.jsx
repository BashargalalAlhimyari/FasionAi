import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function ProtectedRoute({ children }) {
  const jwt = useAuthStore((state) => state.jwt);
  const isAuthenticated = !!jwt;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
