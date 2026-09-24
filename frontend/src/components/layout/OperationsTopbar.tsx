import React from 'react';
import { Menu, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { UserRole } from '../../types';

const roleLabels: Record<UserRole, string> = { admin: 'Admin', manager: 'Manager', staff: 'Nhân viên', customer: 'Khách hàng' };

type OperationsTopbarProps = { role: UserRole; onMenuClick: () => void };

export const OperationsTopbar: React.FC<OperationsTopbarProps> = ({ role, onMenuClick }) => (
  <header className="flex min-h-[74px] items-center justify-between border-b border-[var(--sb-line)] bg-white px-4 sm:px-6 lg:px-8">
    <div className="flex items-center gap-3">
      <button type="button" onClick={onMenuClick} aria-label="Mở menu vận hành" className="sb-icon-button lg:hidden"><Menu className="h-5 w-5" /></button>
      <div><p className="sb-kicker hidden sm:block">Operations desk</p><h1 className="text-lg font-bold tracking-[-0.02em] text-[var(--sb-ink)]">Không gian {roleLabels[role]}</h1></div>
    </div>
    <div className="flex items-center gap-3">
      <div className="hidden items-center gap-2 rounded-full border border-[var(--sb-line)] bg-[#fffafa] px-3 py-2 text-xs font-semibold text-[var(--sb-ink-2)] sm:flex"><span className="h-2 w-2 animate-pulse rounded-full bg-[var(--sb-success)]" /> Trực tuyến · {new Date().toLocaleDateString('vi-VN')}</div>
      <Link to="/profile" className="flex items-center gap-2 text-xs font-bold text-[var(--sb-ink-2)] hover:text-[var(--sb-accent)]"><UserRound className="h-4 w-4" /> <span className="hidden md:inline">Hồ sơ cá nhân</span></Link>
    </div>
  </header>
);
