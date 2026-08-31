import { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import ComponentDemo  from './pages/ComponentDemo';
import Login          from './pages/Login';
import StoreSetup     from './pages/StoreSetup';
import BrandKit       from './pages/BrandKit';
import Dashboard      from './pages/Dashboard';
import CreateTab      from './pages/tabs/CreateTab';
import TemplatesTab   from './pages/tabs/TemplatesTab';
import OccasionsTab   from './pages/tabs/OccasionsTab';
import ArchiveTab     from './pages/tabs/ArchiveTab';
import AccountTab     from './pages/tabs/AccountTab';
import ProtectedRoute from './components/app/ProtectedRoute';

/**
 * App — root router.
 * Phase 0: component demo
 * Phase 1 & 2: Login, StoreSetup, BrandKit
 * Phase 3: Dashboard with 5 nested tab routes
 */
export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSessionExpired = () => {
      toast.error('انتهت صلاحية الجلسة. يُرجى إعادة تسجيل الدخول.');
      navigate('/login');
    };

    window.addEventListener('fashionai:session-expired', handleSessionExpired);
    return () => window.removeEventListener('fashionai:session-expired', handleSessionExpired);
  }, [navigate]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/"     element={<Navigate to="/login" replace />} />
      <Route path="/demo" element={<ComponentDemo />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route path="/store-setup" element={<ProtectedRoute><StoreSetup /></ProtectedRoute>} />
      <Route path="/brandkit"    element={<ProtectedRoute><BrandKit /></ProtectedRoute>} />

      {/* Phase 3: Dashboard with nested tabs */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      >
        <Route index           element={<Navigate to="/dashboard/create" replace />} />
        <Route path="create"    element={<CreateTab />} />
        <Route path="templates" element={<TemplatesTab />} />
        <Route path="occasions" element={<OccasionsTab />} />
        <Route path="archive"   element={<ArchiveTab />} />
        <Route path="account"   element={<AccountTab />} />
      </Route>
    </Routes>
  );
}

