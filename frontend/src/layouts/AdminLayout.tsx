import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { OperationsSidebar } from '../components/layout/OperationsSidebar';
import { OperationsTopbar } from '../components/layout/OperationsTopbar';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const role = user?.role === 'admin' || user?.role === 'manager' || user?.role === 'staff' ? user.role : 'staff';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[var(--sb-bg)] text-[var(--sb-ink)] lg:flex">
      <OperationsSidebar user={user} role={role} open={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />
      <div className="flex min-w-0 flex-1 flex-col">
        <OperationsTopbar role={role} onMenuClick={() => setSidebarOpen(true)} />
        <main className="operations-content flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
};
