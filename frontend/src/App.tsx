import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './components/common/Toast';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Layouts
import { CustomerLayout } from './layouts/CustomerLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Customer Pages
import { HomePage } from './pages/customer/HomePage';
import { SearchCourtsPage } from './pages/customer/SearchCourtsPage';
import { CourtDetailPage } from './pages/customer/CourtDetailPage';
import { MyBookingsPage } from './pages/customer/MyBookingsPage';
import { ProfilePage } from './pages/customer/ProfilePage';

// Staff Pages
import { StaffDashboardPage } from './pages/employee/StaffDashboardPage';
import { StaffAttendancePage } from './pages/employee/StaffAttendancePage';
import { StaffSchedulePage } from './pages/employee/StaffSchedulePage';
import { StaffLeavePage } from './pages/employee/StaffLeavePage';

// Manager Pages
import { ManagerDashboardPage } from './pages/admin/ManagerDashboardPage';

// Admin Pages kkk
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminCourtsPage } from './pages/admin/AdminCourtsPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminEmployeesPage } from './pages/admin/AdminEmployeesPage';
import { AdminShiftsPage } from './pages/admin/AdminShiftsPage';
import { AdminSchedulesPage } from './pages/admin/AdminSchedulesPage';
import { AdminAttendancePage } from './pages/admin/AdminAttendancePage';
import { AdminLeavesPage } from './pages/admin/AdminLeavesPage';
import { AdminPayrollsPage } from './pages/admin/AdminPayrollsPage';
import { AdminReviewsPage } from './pages/admin/AdminReviewsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Customer Layout Routes */}
            <Route element={<CustomerLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchCourtsPage />} />
              <Route path="/courts/:id" element={<CourtDetailPage />} />

              {/* Protected Customer Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/my-bookings" element={<MyBookingsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Route>

            {/* Admin / Manager / Staff Layout Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'manager', 'staff']} />}>
              <Route element={<AdminLayout />}>
                {/* Staff Routes */}
                <Route path="/staff" element={<StaffDashboardPage />} />
                <Route path="/staff/attendance" element={<StaffAttendancePage />} />
                <Route path="/staff/schedule" element={<StaffSchedulePage />} />
                <Route path="/staff/leaves" element={<StaffLeavePage />} />

                {/* Manager Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin', 'manager']} />}>
                  <Route path="/manager" element={<ManagerDashboardPage />} />
                </Route>

                {/* Admin & Manager Management Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin', 'manager']} />}>
                  <Route path="/admin/courts" element={<AdminCourtsPage />} />
                  <Route path="/admin/bookings" element={<AdminBookingsPage />} />
                  <Route path="/admin/reviews" element={<AdminReviewsPage />} />
                  <Route path="/admin/employees" element={<AdminEmployeesPage />} />
                  <Route path="/admin/shifts" element={<AdminShiftsPage />} />
                  <Route path="/admin/schedules" element={<AdminSchedulesPage />} />
                  <Route path="/admin/attendance" element={<AdminAttendancePage />} />
                  <Route path="/admin/leaves" element={<AdminLeavesPage />} />
                  <Route path="/admin/payrolls" element={<AdminPayrollsPage />} />
                </Route>

                {/* Admin-only Analytics Dashboard */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                  <Route path="/admin" element={<AdminDashboardPage />} />
                </Route>
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
