import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Activity, Mail, MapPin, Phone } from 'lucide-react';
import { StorefrontHeader } from '../components/layout/StorefrontHeader';

export const CustomerLayout: React.FC = () => (
  <div className="min-h-screen bg-[var(--sb-bg)] text-[var(--sb-ink)]">
    <StorefrontHeader />
    <main className="min-h-[calc(100vh-74px)] lg:min-h-[calc(100vh-87px)]"><Outlet /></main>
    <footer className="mt-16 border-t border-[var(--sb-line)] bg-[var(--sb-ink)] text-white">
      <div className="sb-shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-extrabold tracking-[-0.04em]"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sb-accent)]"><Activity className="h-4 w-4" /></span>Sport<span className="text-[#8ec1d4]">Booking</span></Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/55">Nền tảng đặt sân thể thao rõ ràng, nhanh gọn và kết nối người chơi với những địa điểm đáng tin cậy.</p>
        </div>
        <div><h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">Khám phá</h2><ul className="mt-4 space-y-3 text-sm text-white/70"><li><Link to="/search?type=football" className="hover:text-white">Bóng đá</Link></li><li><Link to="/search?type=badminton" className="hover:text-white">Cầu lông</Link></li><li><Link to="/search?type=tennis" className="hover:text-white">Tennis</Link></li><li><Link to="/search?type=pickleball" className="hover:text-white">Pickleball</Link></li></ul></div>
        <div><h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">Dịch vụ</h2><ul className="mt-4 space-y-3 text-sm text-white/70"><li>Đặt sân không trùng lịch</li><li>Vé điện tử QR</li><li>Đánh giá minh bạch</li><li>Quản lý vận hành</li></ul></div>
        <div><h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">Hỗ trợ</h2><ul className="mt-4 space-y-3 text-sm text-white/70"><li className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#8ec1d4]" />1900 8888</li><li className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#8ec1d4]" />hotro@sportbooking.com</li><li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#8ec1d4]" />TP. Hồ Chí Minh & Hà Nội</li></ul></div>
      </div>
      <div className="border-t border-white/10"><div className="sb-shell flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 SportBooking Platform.</p><p>Đặt sân rõ ràng. Chơi vui hơn.</p></div></div>
    </footer>
  </div>
);
