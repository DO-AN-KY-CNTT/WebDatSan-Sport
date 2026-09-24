import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CalendarDays, ChevronDown, LogOut, MapPin, Menu, Search, Shield, User as UserIcon, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { BrandMark } from './BrandMark';
import { Button } from '../ui';

const fallbackAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';

export const StorefrontHeader: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [sportType, setSportType] = useState('all');
  const [district, setDistrict] = useState('all');
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'manager') return '/manager';
    if (user.role === 'staff') return '/staff';
    return '/my-bookings';
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (sportType !== 'all') params.set('type', sportType);
    if (district !== 'all') params.set('district', district);
    if (date) params.set('date', date);
    navigate(`/search?${params.toString()}`);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--sb-line)] bg-white/95 backdrop-blur-md">
      <div className="sb-shell flex min-h-[74px] items-center gap-4 py-3 lg:min-h-[87px]">
        <Link to="/" aria-label="SportBooking trang chủ" className="shrink-0">
          <BrandMark />
        </Link>

        <form onSubmit={handleSearch} role="search" className="hidden min-w-0 flex-1 lg:flex">
          <div className="sb-search-pill w-full">
            <div className="sb-search-cell">
              <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--sb-accent)]" />
              <label htmlFor="header-sport">Môn</label>
              <select id="header-sport" value={sportType} onChange={(event) => setSportType(event.target.value)} aria-label="Môn thể thao">
                <option value="all">Tất cả môn</option>
                <option value="football">Bóng đá</option>
                <option value="badminton">Cầu lông</option>
                <option value="tennis">Tennis</option>
                <option value="pickleball">Pickleball</option>
                <option value="basketball">Bóng rổ</option>
                <option value="volleyball">Bóng chuyền</option>
              </select>
            </div>
            <div className="sb-search-cell">
              <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--sb-accent)]" />
              <label htmlFor="header-district">Khu vực</label>
              <select id="header-district" value={district} onChange={(event) => setDistrict(event.target.value)} aria-label="Khu vực">
                <option value="all">Mọi khu vực</option>
                <option value="Quận 1">Quận 1</option>
                <option value="Quận 7">Quận 7</option>
                <option value="Quận 10">Quận 10</option>
                <option value="Bình Thạnh">Bình Thạnh</option>
                <option value="Phú Nhuận">Phú Nhuận</option>
                <option value="Thủ Đức">TP. Thủ Đức</option>
              </select>
            </div>
            <div className="sb-search-cell">
              <CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--sb-accent)]" />
              <label htmlFor="header-date">Ngày</label>
              <input id="header-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} aria-label="Ngày chơi" />
            </div>
            <button type="submit" className="m-1 flex shrink-0 items-center justify-center rounded-full bg-[var(--sb-ink)] px-5 text-xs font-bold text-white transition-colors hover:bg-[var(--sb-accent)]">
              Tìm sân
            </button>
          </div>
        </form>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-[var(--sb-ink-2)] xl:flex" aria-label="Điều hướng chính">
          <Link className={location.pathname === '/' ? 'text-[var(--sb-accent)]' : 'hover:text-[var(--sb-accent)]'} to="/">Trang chủ</Link>
          <Link className={location.pathname.startsWith('/search') ? 'text-[var(--sb-accent)]' : 'hover:text-[var(--sb-accent)]'} to="/search">Tìm sân</Link>
          <a className="hover:text-[var(--sb-accent)]" href="/#categories">Loại sân</a>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {isAuthenticated && user ? (
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setAccountOpen((open) => !open)}
                aria-expanded={accountOpen}
                className="flex items-center gap-2 rounded-full border border-[var(--sb-line-strong)] bg-white py-1 pl-1 pr-3 transition-colors hover:border-[var(--sb-ink)]"
              >
                <img src={user.avatar || fallbackAvatar} alt={user.fullName} className="h-8 w-8 rounded-full object-cover" />
                <span className="max-w-28 truncate text-left text-xs font-bold text-[var(--sb-ink)]">{user.fullName}</span>
                <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 text-[var(--sb-ink-3)]" />
              </button>
              {accountOpen && (
                <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-[var(--sb-radius-lg)] border border-[var(--sb-line)] bg-white py-2 shadow-[var(--sb-shadow-card)]">
                  <div className="border-b border-[var(--sb-line)] px-4 py-3">
                    <p className="text-[11px] uppercase tracking-wider text-[var(--sb-ink-3)]">Đăng nhập với</p>
                    <p className="mt-1 truncate text-xs font-bold text-[var(--sb-ink)]">{user.email}</p>
                  </div>
                  {user.role !== 'customer' && <Link to={getDashboardLink()} onClick={() => setAccountOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[var(--sb-ink-2)] hover:bg-[#fffafa] hover:text-[var(--sb-accent)]"><Shield className="h-4 w-4" /> Hệ thống quản trị</Link>}
                  <Link to="/my-bookings" onClick={() => setAccountOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[var(--sb-ink-2)] hover:bg-[#fffafa] hover:text-[var(--sb-accent)]"><CalendarDays className="h-4 w-4" /> Booking của tôi</Link>
                  <Link to="/profile" onClick={() => setAccountOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[var(--sb-ink-2)] hover:bg-[#fffafa] hover:text-[var(--sb-accent)]"><UserIcon className="h-4 w-4" /> Hồ sơ cá nhân</Link>
                  <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 border-t border-[var(--sb-line)] px-4 py-3 text-left text-sm font-semibold text-[var(--sb-danger)] hover:bg-[#fffafa]"><LogOut className="h-4 w-4" /> Đăng xuất</button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link to="/login" className="px-3 py-2 text-sm font-bold text-[var(--sb-ink-2)] hover:text-[var(--sb-accent)]">Đăng nhập</Link>
              <Link to="/register" className="sb-button sb-button-ink">Đăng ký</Link>
            </div>
          )}
          <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'} className="sb-icon-button lg:hidden">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[var(--sb-line)] bg-white px-4 py-4 lg:hidden">
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="sb-search-pill">
              <div className="sb-search-cell"><Search className="h-4 w-4 shrink-0 text-[var(--sb-accent)]" /><label htmlFor="mobile-sport">Môn</label><select id="mobile-sport" value={sportType} onChange={(event) => setSportType(event.target.value)}><option value="all">Tất cả môn</option><option value="football">Bóng đá</option><option value="badminton">Cầu lông</option><option value="tennis">Tennis</option><option value="pickleball">Pickleball</option></select></div>
              <div className="sb-search-cell"><MapPin className="h-4 w-4 shrink-0 text-[var(--sb-accent)]" /><label htmlFor="mobile-district">Khu vực</label><select id="mobile-district" value={district} onChange={(event) => setDistrict(event.target.value)}><option value="all">Mọi khu vực</option><option value="Quận 1">Quận 1</option><option value="Quận 7">Quận 7</option><option value="Quận 10">Quận 10</option><option value="Bình Thạnh">Bình Thạnh</option><option value="Thủ Đức">TP. Thủ Đức</option></select></div>
              <div className="sb-search-cell"><CalendarDays className="h-4 w-4 shrink-0 text-[var(--sb-accent)]" /><label htmlFor="mobile-date">Ngày</label><input id="mobile-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} /></div>
            </div>
            <Button type="submit" tone="ink" fullWidth><Search className="h-4 w-4" /> Tìm sân</Button>
          </form>
          <nav className="mt-4 grid gap-1 border-t border-[var(--sb-line)] pt-3" aria-label="Điều hướng mobile">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-bold text-[var(--sb-ink-2)] hover:bg-[#fffafa]">Trang chủ</Link>
            <Link to="/search" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-bold text-[var(--sb-ink-2)] hover:bg-[#fffafa]">Tìm sân thể thao</Link>
            <a href="/#categories" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-bold text-[var(--sb-ink-2)] hover:bg-[#fffafa]">Loại sân</a>
          </nav>
          <div className="mt-3 border-t border-[var(--sb-line)] pt-3">
            {isAuthenticated && user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2"><img src={user.avatar || fallbackAvatar} alt={user.fullName} className="h-9 w-9 rounded-full object-cover" /><div><p className="text-sm font-bold text-[var(--sb-ink)]">{user.fullName}</p><p className="text-[10px] uppercase tracking-wider text-[var(--sb-accent)]">{user.role}</p></div></div>
                {user.role !== 'customer' && <Link to={getDashboardLink()} onClick={() => setMobileMenuOpen(false)} className="block rounded-lg bg-[var(--sb-accent-soft)] px-3 py-2.5 text-sm font-bold text-[var(--sb-accent)]">Vào hệ thống quản trị</Link>}
                <Link to="/my-bookings" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-bold text-[var(--sb-ink-2)] hover:bg-[#fffafa]">Booking của tôi</Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-bold text-[var(--sb-ink-2)] hover:bg-[#fffafa]">Hồ sơ cá nhân</Link>
                <button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-bold text-[var(--sb-danger)] hover:bg-[#fffafa]"><LogOut className="h-4 w-4" /> Đăng xuất</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2"><Link to="/login" onClick={() => setMobileMenuOpen(false)} className="rounded-lg border border-[var(--sb-line-strong)] py-2.5 text-center text-sm font-bold text-[var(--sb-ink-2)]">Đăng nhập</Link><Link to="/register" onClick={() => setMobileMenuOpen(false)} className="rounded-lg bg-[var(--sb-ink)] py-2.5 text-center text-sm font-bold text-white">Đăng ký</Link></div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
