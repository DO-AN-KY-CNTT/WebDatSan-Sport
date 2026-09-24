import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, CalendarCheck, CalendarDays, ChevronRight, ClipboardList, Clock, ExternalLink, FileSpreadsheet, LayoutDashboard, LogOut, ShieldAlert, Star, Users, X } from 'lucide-react';
import type { User, UserRole } from '../../types';
import { BrandMark } from './BrandMark';

export type OperationsNavItem = { label: string; href: string; icon: React.ElementType };

type OperationsSidebarProps = {
  user: User | null;
  role: UserRole;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const navByRole: Record<'admin' | 'manager' | 'staff', OperationsNavItem[]> = {
  admin: [
    { label: 'Tổng quan', href: '/admin', icon: LayoutDashboard },
    { label: 'Sân thể thao', href: '/admin/courts', icon: Building2 },
    { label: 'Đơn đặt sân', href: '/admin/bookings', icon: CalendarDays },
    { label: 'Đánh giá sân', href: '/admin/reviews', icon: Star },
    { label: 'Nhân sự', href: '/admin/employees', icon: Users },
    { label: 'Ca làm việc', href: '/admin/shifts', icon: Clock },
    { label: 'Phân ca làm', href: '/admin/schedules', icon: CalendarCheck },
    { label: 'Chấm công & QR', href: '/admin/attendance', icon: ClipboardList },
    { label: 'Nghỉ phép', href: '/admin/leaves', icon: ShieldAlert },
    { label: 'Bảng lương', href: '/admin/payrolls', icon: FileSpreadsheet },
  ],
  manager: [
    { label: 'Bàn giao ca', href: '/manager', icon: LayoutDashboard },
    { label: 'Nhân viên', href: '/admin/employees', icon: Users },
    { label: 'Ca làm việc', href: '/admin/shifts', icon: Clock },
    { label: 'Lịch phân ca', href: '/admin/schedules', icon: CalendarCheck },
    { label: 'Chấm công', href: '/admin/attendance', icon: ClipboardList },
    { label: 'Duyệt nghỉ phép', href: '/admin/leaves', icon: ShieldAlert },
    { label: 'Booking', href: '/admin/bookings', icon: CalendarDays },
    { label: 'Sân thể thao', href: '/admin/courts', icon: Building2 },
    { label: 'Bảng lương', href: '/admin/payrolls', icon: FileSpreadsheet },
  ],
  staff: [
    { label: 'Bảng điều khiển', href: '/staff', icon: LayoutDashboard },
    { label: 'Chấm công hôm nay', href: '/staff/attendance', icon: ClipboardList },
    { label: 'Lịch ca của tôi', href: '/staff/schedule', icon: CalendarCheck },
    { label: 'Xin nghỉ phép', href: '/staff/leaves', icon: ShieldAlert },
  ],
};

export const OperationsSidebar: React.FC<OperationsSidebarProps> = ({ user, role, open, onClose, onLogout }) => {
  const location = useLocation();
  const items = navByRole[role === 'admin' || role === 'manager' ? role : 'staff'];

  return (
    <>
      {open && <button type="button" aria-label="Đóng menu vận hành" onClick={onClose} className="fixed inset-0 z-40 bg-[rgba(28,11,14,.45)] backdrop-blur-sm lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[268px] flex-col border-r border-[var(--sb-line)] bg-[var(--sb-ink)] text-white transition-transform duration-300 lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-[74px] shrink-0 items-center justify-between border-b border-white/10 px-5">
          <Link to="/" onClick={onClose} aria-label="SportBooking trang chủ"><BrandMark inverse /></Link>
          <button type="button" onClick={onClose} aria-label="Đóng menu" className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"><X className="h-5 w-5" /></button>
        </div>
        <div className="mx-4 my-4 flex items-center gap-3 rounded-[var(--sb-radius-lg)] border border-white/10 bg-white/5 p-3">
          <img src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'} alt={user?.fullName || 'Tài khoản'} className="h-10 w-10 rounded-full object-cover ring-2 ring-[var(--sb-accent)]" />
          <div className="min-w-0"><p className="truncate text-sm font-bold">{user?.fullName || 'Tài khoản'}</p><p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/55">{role}</p></div>
        </div>
        <div className="px-5 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">Không gian làm việc</div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4" aria-label="Điều hướng vận hành">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return <Link key={item.href} to={item.href} onClick={onClose} aria-current={isActive ? 'page' : undefined} className={`group flex items-center justify-between rounded-[var(--sb-radius)] px-3 py-3 text-sm font-semibold transition-colors ${isActive ? 'bg-[var(--sb-accent)] text-white' : 'text-white/62 hover:bg-white/10 hover:text-white'}`}><span className="flex items-center gap-3"><Icon className={`h-[18px] w-[18px] ${isActive ? 'text-white' : 'text-white/45 group-hover:text-white'}`} />{item.label}</span>{isActive && <ChevronRight className="h-4 w-4 text-white/70" />}</Link>;
          })}
        </nav>
        <div className="space-y-1 border-t border-white/10 p-3">
          <Link to="/" onClick={onClose} className="flex items-center gap-3 rounded-[var(--sb-radius)] px-3 py-2.5 text-xs font-semibold text-white/55 hover:bg-white/10 hover:text-white"><ExternalLink className="h-4 w-4" /> Xem storefront</Link>
          <button type="button" onClick={onLogout} className="flex w-full items-center gap-3 rounded-[var(--sb-radius)] px-3 py-2.5 text-left text-xs font-semibold text-[#e5a0a0] hover:bg-[#a64a4a]/20"><LogOut className="h-4 w-4" /> Đăng xuất hệ thống</button>
        </div>
      </aside>
    </>
  );
};
