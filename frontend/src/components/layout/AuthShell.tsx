import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { BrandMark } from './BrandMark';

type AuthShellProps = { title: string; subtitle: React.ReactNode; children: React.ReactNode; footer?: React.ReactNode };

export const AuthShell: React.FC<AuthShellProps> = ({ title, subtitle, children, footer }) => (
  <div className="min-h-screen bg-[var(--sb-bg)] px-4 py-8 sm:px-6 lg:px-8">
    <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-5xl items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
      <div className="hidden lg:block"><Link to="/" aria-label="Về trang chủ"><BrandMark /></Link><p className="sb-kicker mt-16">SportBooking · chơi có kế hoạch</p><h1 className="mt-4 max-w-md text-5xl font-extrabold leading-[1.05] tracking-[-0.055em] text-[var(--sb-ink)]">Một tài khoản cho mọi trận chơi.</h1><p className="mt-5 max-w-sm text-sm leading-6 text-[var(--sb-ink-2)]">Lưu sân yêu thích, quản lý booking và nhận vé QR ngay sau khi xác nhận.</p><ul className="mt-8 space-y-3 text-sm font-semibold text-[var(--sb-ink-2)]"><li className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--sb-success)]" /> Lịch đặt sân rõ ràng</li><li className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--sb-success)]" /> Thanh toán linh hoạt</li><li className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--sb-success)]" /> Hỗ trợ khi cần</li></ul></div>
      <main className="mx-auto w-full max-w-[440px]"><Link to="/" className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-[var(--sb-ink-2)] hover:text-[var(--sb-accent)]"><ArrowLeft className="h-4 w-4" /> Về trang chủ</Link><div className="mb-6 lg:hidden"><BrandMark /></div><div className="sb-surface p-6 sm:p-9"><div className="border-b border-[var(--sb-line)] pb-6"><p className="sb-kicker">Chào mừng trở lại</p><h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-[var(--sb-ink)]">{title}</h2><p className="mt-3 text-sm leading-6 text-[var(--sb-ink-2)]">{subtitle}</p></div><div className="pt-6">{children}</div>{footer && <div className="mt-6 border-t border-[var(--sb-line)] pt-5 text-center text-sm text-[var(--sb-ink-2)]">{footer}</div>}</div></main>
    </div>
  </div>
);
