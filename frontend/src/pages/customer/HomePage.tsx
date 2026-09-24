import React, { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, Check, MapPin, Search, ShieldCheck, Sparkles, Star, Users, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import type { ApiResponse, Court } from '../../types';
import { Button, LoadingState } from '../../components/ui';
import { CourtCard } from '../../components/customer/CourtCard';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [featuredCourts, setFeaturedCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [sportType, setSportType] = useState('all');
  const [district, setDistrict] = useState('all');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const res = await api.get<ApiResponse<{ courts: Court[] }>>('/courts?limit=6&sortBy=rating');
        if (res.data.success) setFeaturedCourts(res.data.data.courts);
      } catch (error) {
        console.error('Error fetching courts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourts();
  }, []);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (sportType !== 'all') params.set('type', sportType);
    if (district !== 'all') params.set('district', district);
    if (date) params.set('date', date);
    navigate(`/search?${params.toString()}`);
  };

  const categories = [
    { type: 'football', name: 'Bóng đá', count: '12+ sân', icon: '⚽', note: 'Sân cỏ nhân tạo' },
    { type: 'badminton', name: 'Cầu lông', count: '18+ sân', icon: '🏸', note: 'Thảm thi đấu' },
    { type: 'pickleball', name: 'Pickleball', count: '10+ sân', icon: '🏓', note: 'Môn mới mỗi ngày' },
    { type: 'tennis', name: 'Tennis', count: '8+ sân', icon: '🎾', note: 'Mặt sân chuẩn' },
    { type: 'basketball', name: 'Bóng rổ', count: '6+ sân', icon: '🏀', note: 'Sàn gỗ trong nhà' },
    { type: 'volleyball', name: 'Bóng chuyền', count: '5+ sân', icon: '🏐', note: 'Trong nhà & biển' },
  ];

  return (
    <div>
      <section className="border-b border-[var(--sb-line)] bg-[var(--sb-bg)]">
        <div className="sb-shell grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end lg:py-24">
          <div>
            <p className="sb-kicker flex items-center gap-2"><Sparkles className="h-4 w-4" /> Đặt sân theo cách rõ ràng hơn</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-[1.04] tracking-[-0.055em] text-[var(--sb-ink)] sm:text-7xl">Sân tốt.<br /><span className="text-[var(--sb-accent)]">Trận chơi hay.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[var(--sb-ink-2)] sm:text-lg">Khám phá sân thể thao đáng tin cậy quanh bạn, xem giờ trống theo thời gian thực và đặt chỗ trong vài thao tác.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-semibold text-[var(--sb-ink-2)]"><span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[var(--sb-success)]" /> Không trùng lịch</span><span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[var(--sb-success)]" /> Vé QR tức thì</span><span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[var(--sb-success)]" /> Đánh giá thật</span></div>
          </div>
          <form onSubmit={handleSearchSubmit} className="rounded-[var(--sb-radius-lg)] border border-[var(--sb-line-strong)] bg-white p-5 shadow-[var(--sb-shadow-card)]">
            <div className="mb-5 flex items-start justify-between gap-4 border-b border-[var(--sb-line)] pb-4"><div><p className="sb-kicker">Tìm sân nhanh</p><h2 className="mt-1 text-xl font-bold text-[var(--sb-ink)]">Bạn muốn chơi gì?</h2></div><Search className="h-5 w-5 text-[var(--sb-accent)]" /></div>
            <div className="space-y-4">
              <label className="block"><span className="sb-field-label">Khu vực</span><span className="relative block"><MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[var(--sb-accent)]" /><select value={district} onChange={(event) => setDistrict(event.target.value)} className="sb-field pl-10"><option value="all">Tất cả khu vực</option><option value="Quận 1">Quận 1</option><option value="Quận 7">Quận 7</option><option value="Quận 10">Quận 10</option><option value="Bình Thạnh">Bình Thạnh</option><option value="Phú Nhuận">Phú Nhuận</option><option value="Tân Bình">Tân Bình</option><option value="Thủ Đức">TP. Thủ Đức</option></select></span></label>
              <label className="block"><span className="sb-field-label">Môn thể thao</span><select value={sportType} onChange={(event) => setSportType(event.target.value)} className="sb-field"><option value="all">Tất cả môn thể thao</option><option value="football">Bóng đá</option><option value="badminton">Cầu lông</option><option value="tennis">Tennis</option><option value="pickleball">Pickleball</option><option value="basketball">Bóng rổ</option><option value="volleyball">Bóng chuyền</option></select></label>
              <label className="block"><span className="sb-field-label">Ngày chơi</span><span className="relative block"><CalendarDays className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[var(--sb-accent)]" /><input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="sb-field pl-10" /></span></label>
              <Button tone="ink" type="submit" fullWidth><Search className="h-4 w-4" /> Tìm sân ngay</Button>
            </div>
          </form>
        </div>
      </section>

      <section id="categories" className="sb-shell py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-4 border-b border-[var(--sb-line)] pb-5 sm:flex-row sm:items-end"><div><p className="sb-kicker">Chọn theo sở thích</p><h2 className="sb-section-title mt-2">Loại sân thể thao</h2></div><Link to="/search" className="inline-flex items-center gap-1 text-sm font-bold text-[var(--sb-accent)] hover:underline">Xem tất cả <ArrowRight className="h-4 w-4" /></Link></div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{categories.map((category) => <Link key={category.type} to={`/search?type=${category.type}`} className="group border-b border-[var(--sb-line)] pb-4 transition-colors hover:border-[var(--sb-accent)]"><span className="text-3xl transition-transform duration-300 group-hover:scale-110">{category.icon}</span><h3 className="mt-4 text-sm font-bold text-[var(--sb-ink)] group-hover:text-[var(--sb-accent)]">{category.name}</h3><p className="mt-1 text-xs text-[var(--sb-ink-3)]">{category.note}</p><p className="mt-3 text-xs font-bold text-[var(--sb-accent)]">{category.count}</p></Link>)}</div>
      </section>

      <section className="sb-shell pb-16 sm:pb-24"><div className="flex flex-col justify-between gap-4 border-b border-[var(--sb-line)] pb-5 sm:flex-row sm:items-end"><div><p className="sb-kicker">Được chọn nhiều</p><h2 className="sb-section-title mt-2">Sân thể thao nổi bật</h2><p className="mt-2 max-w-xl text-sm text-[var(--sb-ink-2)]">Những địa điểm có điểm đánh giá tốt, thông tin rõ ràng và luôn sẵn sàng cho trận chơi tiếp theo.</p></div><Link to="/search" className="inline-flex items-center gap-1 text-sm font-bold text-[var(--sb-accent)] hover:underline">Khám phá thêm <ArrowRight className="h-4 w-4" /></Link></div>{loading ? <LoadingState /> : featuredCourts.length ? <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{featuredCourts.map((court) => <CourtCard key={court._id} court={court} />)}</div> : <div className="mt-8 rounded-[var(--sb-radius-lg)] border border-dashed border-[var(--sb-line-strong)] py-14 text-center text-sm text-[var(--sb-ink-3)]">Chưa có sân nổi bật để hiển thị.</div>}</section>

      <section id="about" className="border-y border-[var(--sb-line)] bg-white"><div className="sb-shell grid gap-10 py-16 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div><p className="sb-kicker">Vì sao SportBooking</p><h2 className="sb-section-title mt-2">Ít bước hơn.<br />Nhiều thời gian chơi hơn.</h2><p className="mt-4 max-w-md text-sm leading-6 text-[var(--sb-ink-2)]">Một hệ thống được thiết kế để người chơi nhìn thấy đúng điều cần biết trước khi bấm đặt sân.</p></div><div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">{[{ icon: ShieldCheck, title: 'Không trùng lịch', text: 'Slot được khóa theo thời gian thực, minh bạch từ lúc chọn đến lúc xác nhận.' }, { icon: Zap, title: 'Đặt trong 30 giây', text: 'Chọn địa điểm, giờ chơi và nhận vé điện tử mà không cần gọi điện.' }, { icon: Star, title: 'Đánh giá thực tế', text: 'Chỉ người đã hoàn thành buổi chơi mới có thể để lại nhận xét.' }, { icon: Users, title: 'Vận hành chuyên nghiệp', text: 'Đội ngũ sân bãi được hỗ trợ bởi phân ca, QR và chấm công rõ ràng.' }].map(({ icon: Icon, title, text }) => <div key={title} className="border-t border-[var(--sb-line)] pt-4"><Icon className="h-5 w-5 text-[var(--sb-accent)]" /><h3 className="mt-4 text-base font-bold text-[var(--sb-ink)]">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--sb-ink-2)]">{text}</p></div>)}</div></div></section>
    </div>
  );
};
