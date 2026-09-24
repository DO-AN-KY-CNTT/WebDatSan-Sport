import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock3, MapPin, Share2, ShieldCheck, Star } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import type { ApiResponse, Court, Review } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../components/common/Toast';
import { BookingPanel, CourtGallery, ReviewList } from '../../components/customer';
import { Button, FormField, LoadingState, ModalShell, StatusBadge, SurfaceCard } from '../../components/ui';

interface OccupiedSlot { startTime: string; endTime: string; status: string }

const timeSlots = [
  { start: '06:00', end: '08:00' },
  { start: '08:00', end: '10:00' },
  { start: '10:00', end: '12:00' },
  { start: '12:00', end: '14:00' },
  { start: '14:00', end: '16:00' },
  { start: '16:00', end: '18:00' },
  { start: '18:00', end: '20:00' },
  { start: '20:00', end: '22:00' },
];

export const CourtDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [court, setCourt] = useState<Court | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [occupiedSlots, setOccupiedSlots] = useState<OccupiedSlot[]>([]);
  const [selectedStart, setSelectedStart] = useState('');
  const [selectedEnd, setSelectedEnd] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'banking' | 'cash'>('banking');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [submittingBooking, setSubmittingBooking] = useState(false);

  useEffect(() => {
    const fetchCourtData = async () => {
      try {
        const [courtRes, reviewRes] = await Promise.all([
          api.get<ApiResponse<Court>>(`/courts/${id}`),
          api.get<ApiResponse<Review[]>>(`/reviews/court/${id}`),
        ]);
        if (courtRes.data.success) setCourt(courtRes.data.data);
        if (reviewRes.data.success) setReviews(reviewRes.data.data);
      } catch (error) {
        showToast('Không thể tải thông tin sân', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchCourtData();
  }, [id, showToast]);

  useEffect(() => {
    if (!id || !selectedDate) return;
    const fetchSlots = async () => {
      try {
        const res = await api.get<ApiResponse<OccupiedSlot[]>>(`/bookings/court/${id}/slots?date=${selectedDate}`);
        if (res.data.success) setOccupiedSlots(res.data.data);
      } catch (error) {
        console.error('Error fetching occupied slots:', error);
      }
    };
    fetchSlots();
    setSelectedStart('');
    setSelectedEnd('');
  }, [id, selectedDate]);

  const timeToMin = (value: string) => {
    const [hours, minutes] = value.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const isSlotOccupied = (start: string, end: string) => occupiedSlots.some((slot) => Math.max(timeToMin(start), timeToMin(slot.startTime)) < Math.min(timeToMin(end), timeToMin(slot.endTime)));
  const totalHours = selectedStart && selectedEnd ? (timeToMin(selectedEnd) - timeToMin(selectedStart)) / 60 : 0;
  const totalPrice = court ? Math.round(totalHours * court.pricePerHour) : 0;

  const handleConfirmBooking = async () => {
    if (!isAuthenticated) { showToast('Vui lòng đăng nhập để tiến hành đặt sân', 'info'); navigate('/login'); return; }
    if (!selectedStart || !selectedEnd) { showToast('Vui lòng chọn khung giờ đặt sân', 'error'); return; }
    setSubmittingBooking(true);
    try {
      const res = await api.post<ApiResponse<any>>('/bookings', { courtId: id, date: selectedDate, startTime: selectedStart, endTime: selectedEnd, paymentMethod, notes: bookingNotes });
      if (res.data.success) { showToast('Đặt sân thành công! Bạn có thể xem vé tại Booking của tôi.', 'success'); setBookingModalOpen(false); navigate('/my-bookings'); }
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Đặt sân thất bại. Vui lòng thử lại.', 'error');
    } finally { setSubmittingBooking(false); }
  };

  if (loading) return <div className="sb-shell sb-page"><LoadingState /></div>;
  if (!court) return <div className="sb-shell sb-page"><div className="sb-surface px-6 py-16 text-center"><h1 className="text-2xl font-bold text-[var(--sb-ink)]">Không tìm thấy sân thể thao</h1><Link to="/search" className="mt-4 inline-block text-sm font-bold text-[var(--sb-accent)] hover:underline">Quay lại danh sách sân</Link></div></div>;

  return <div className="sb-page"><div className="sb-shell">
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-[var(--sb-ink-3)]"><Link to="/" className="hover:text-[var(--sb-accent)]">Trang chủ</Link><span aria-hidden="true">•</span><Link to="/search" className="hover:text-[var(--sb-accent)]">Sân thể thao</Link><span aria-hidden="true">•</span><span className="font-semibold text-[var(--sb-ink)]">{court.name}</span></nav>
    <header className="mt-6 flex flex-col justify-between gap-5 border-b border-[var(--sb-line)] pb-6 lg:flex-row lg:items-end"><div><div className="flex flex-wrap items-center gap-3"><StatusBadge tone={court.status === 'active' ? 'success' : 'warning'}>{court.status === 'active' ? 'Đang hoạt động' : 'Bảo trì'}</StatusBadge><span className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--sb-accent)]">{court.type}</span><span className="inline-flex items-center gap-1 text-sm font-bold text-[#b07a2d]"><Star className="h-4 w-4 fill-current" /> {court.ratingAvg.toFixed(1)} <span className="font-normal text-[var(--sb-ink-3)]">({court.totalReviews})</span></span></div><h1 className="sb-title mt-4">{court.name}</h1><p className="mt-3 flex items-center gap-2 text-sm text-[var(--sb-ink-2)]"><MapPin className="h-4 w-4 text-[var(--sb-accent)]" />{court.address}</p></div><div className="flex items-center gap-2"><Button tone="quiet" onClick={() => { if (navigator.share) navigator.share({ title: court.name, url: window.location.href }); else showToast('Đã sao chép liên kết sân', 'info'); }}><Share2 className="h-4 w-4" /> Chia sẻ</Button><div className="hidden border-l border-[var(--sb-line)] pl-5 sm:block"><p className="text-[11px] uppercase tracking-[0.08em] text-[var(--sb-ink-3)]">Giá tiêu chuẩn</p><p className="mt-1 text-2xl font-extrabold text-[var(--sb-ink)]">{court.pricePerHour.toLocaleString('vi-VN')} <span className="text-sm font-normal text-[var(--sb-ink-3)]">đ / giờ</span></p></div></div></header>
    <div className="mt-7"><CourtGallery court={court} activeImageIndex={activeImageIndex} onSelectImage={setActiveImageIndex} /></div>
    <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start"><div className="min-w-0 space-y-10"><SurfaceCard as="section" className="p-6 sm:p-8"><p className="sb-kicker">Thông tin sân</p><h2 className="mt-2 text-2xl font-bold text-[var(--sb-ink)]">Chơi thoải mái, mọi thứ đã sẵn sàng</h2><p className="mt-4 whitespace-pre-line text-sm leading-7 text-[var(--sb-ink-2)]">{court.description || 'Sân thể thao chất lượng cao với đầy đủ trang thiết bị đạt chuẩn thi đấu.'}</p><div className="mt-7 grid gap-4 border-t border-[var(--sb-line)] pt-5 sm:grid-cols-3"><div className="flex items-start gap-3 text-sm text-[var(--sb-ink-2)]"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--sb-accent)]" /><span><strong className="block text-xs text-[var(--sb-ink)]">Giờ mở cửa</strong>{court.openingTime} – {court.closingTime}</span></div><div className="flex items-start gap-3 text-sm text-[var(--sb-ink-2)]"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--sb-success)]" /><span><strong className="block text-xs text-[var(--sb-ink)]">An tâm đặt sân</strong>Thông tin rõ ràng</span></div><div className="flex items-start gap-3 text-sm text-[var(--sb-ink-2)]"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--sb-accent)]" /><span><strong className="block text-xs text-[var(--sb-ink)]">Khu vực</strong>{court.location?.district}, {court.location?.city}</span></div></div></SurfaceCard>
      <section><div className="flex items-end justify-between gap-4 border-b border-[var(--sb-line)] pb-4"><div><p className="sb-kicker">Tiện ích</p><h2 className="mt-2 text-2xl font-bold text-[var(--sb-ink)]">Mọi thứ bạn cần</h2></div></div><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{court.amenities.map((amenity, index) => <div key={`${amenity}-${index}`} className="flex items-center gap-2.5 rounded-[var(--sb-radius)] border border-[var(--sb-line)] bg-white px-3 py-3 text-xs font-semibold capitalize text-[var(--sb-ink-2)]"><CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--sb-accent)]" />{amenity.replace(/_/g, ' ')}</div>)}</div></section>
      <section><div className="flex items-end justify-between gap-4 border-b border-[var(--sb-line)] pb-4"><div><p className="sb-kicker">Cộng đồng</p><h2 className="mt-2 text-2xl font-bold text-[var(--sb-ink)]">Đánh giá từ người chơi</h2></div><span className="inline-flex items-center gap-1 text-sm font-bold text-[#b07a2d]"><Star className="h-4 w-4 fill-current" />{court.ratingAvg.toFixed(1)}</span></div><div className="mt-5"><ReviewList reviews={reviews} /></div></section>
    </div><BookingPanel court={court} selectedDate={selectedDate} occupiedSlots={occupiedSlots} selectedStart={selectedStart} selectedEnd={selectedEnd} totalHours={totalHours} totalPrice={totalPrice} timeSlots={timeSlots} onDateChange={setSelectedDate} onSelectSlot={(start, end) => { if (!isSlotOccupied(start, end)) { setSelectedStart(start); setSelectedEnd(end); } }} onConfirm={() => { if (!selectedStart) { showToast('Vui lòng chọn khung giờ để đặt sân', 'error'); return; } setBookingModalOpen(true); }} isSlotOccupied={isSlotOccupied} /></div>
    <ModalShell open={bookingModalOpen} title="Xác nhận đặt sân" description="Kiểm tra lại thông tin trước khi giữ chỗ." onClose={() => setBookingModalOpen(false)} footer={<><Button tone="quiet" onClick={() => setBookingModalOpen(false)}>Hủy bỏ</Button><Button tone="accent" loading={submittingBooking} onClick={handleConfirmBooking}>Xác nhận & giữ chỗ</Button></>}><div className="space-y-4"><div className="space-y-3 rounded-[var(--sb-radius)] border border-[var(--sb-line)] bg-[#fffafa] p-4 text-sm"><div className="flex justify-between gap-4"><span className="text-[var(--sb-ink-3)]">Sân</span><strong className="text-right text-[var(--sb-ink)]">{court.name}</strong></div><div className="flex justify-between gap-4"><span className="text-[var(--sb-ink-3)]">Ngày chơi</span><strong className="text-[var(--sb-ink)]">{selectedDate}</strong></div><div className="flex justify-between gap-4"><span className="text-[var(--sb-ink-3)]">Khung giờ</span><strong className="text-[var(--sb-accent)]">{selectedStart} – {selectedEnd}</strong></div><div className="flex justify-between gap-4 border-t border-[var(--sb-line)] pt-3 font-bold"><span>Tổng tiền</span><strong className="text-[var(--sb-accent)]">{totalPrice.toLocaleString('vi-VN')} đ</strong></div></div><FormField label="Phương thức thanh toán"><div className="grid grid-cols-2 gap-2"><button type="button" aria-pressed={paymentMethod === 'banking'} onClick={() => setPaymentMethod('banking')} className={`rounded-[var(--sb-radius)] border px-3 py-3 text-xs font-bold ${paymentMethod === 'banking' ? 'border-[var(--sb-accent)] bg-[var(--sb-accent-soft)] text-[var(--sb-accent)]' : 'border-[var(--sb-line)] text-[var(--sb-ink-2)]'}`}>Chuyển khoản online</button><button type="button" aria-pressed={paymentMethod === 'cash'} onClick={() => setPaymentMethod('cash')} className={`rounded-[var(--sb-radius)] border px-3 py-3 text-xs font-bold ${paymentMethod === 'cash' ? 'border-[var(--sb-accent)] bg-[var(--sb-accent-soft)] text-[var(--sb-accent)]' : 'border-[var(--sb-line)] text-[var(--sb-ink-2)]'}`}>Thanh toán tại quầy</button></div></FormField><FormField label="Ghi chú cho sân"><textarea value={bookingNotes} onChange={(event) => setBookingNotes(event.target.value)} placeholder="Ví dụ: cần mượn bóng, chuẩn bị nước..." className="sb-field resize-none" rows={3} /></FormField></div></ModalShell>
  </div></div>;
};
