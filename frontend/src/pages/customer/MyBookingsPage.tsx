import React, { useEffect, useState } from 'react';
import { CalendarDays, QrCode, Star } from 'lucide-react';
import { api } from '../../services/api';
import type { ApiResponse, Booking } from '../../types';
import { useToast } from '../../components/common/Toast';
import { BookingCard } from '../../components/customer/BookingCard';
import { Button, EmptyState, FormField, LoadingState, ModalShell, PageHeader } from '../../components/ui';

export const MyBookingsPage: React.FC = () => {
  const { showToast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedBookingForQr, setSelectedBookingForQr] = useState<Booking | null>(null);
  const [cancelModalBooking, setCancelModalBooking] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelling, setCancelling] = useState(false);
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<Booking[]>>(`/bookings/my?status=${filter}`);
      if (res.data.success) setBookings(res.data.data);
    } catch (error) { showToast('Lỗi khi tải danh sách booking', 'error'); } finally { setLoading(false); }
  };

  useEffect(() => { fetchBookings(); }, [filter]);

  const handleCancelBooking = async () => {
    if (!cancelModalBooking) return;
    if (!cancelReason.trim()) { showToast('Vui lòng nhập lý do hủy sân', 'error'); return; }
    setCancelling(true);
    try {
      const res = await api.put<ApiResponse<any>>(`/bookings/${cancelModalBooking._id}/cancel`, { cancelReason });
      if (res.data.success) { showToast('Hủy đơn đặt sân thành công', 'success'); setCancelModalBooking(null); setCancelReason(''); fetchBookings(); }
    } catch (error: any) { showToast(error.response?.data?.message || 'Hủy đơn thất bại', 'error'); } finally { setCancelling(false); }
  };

  const handleSendReview = async () => {
    if (!reviewBooking) return;
    if (!reviewComment.trim()) { showToast('Vui lòng nhập nội dung đánh giá', 'error'); return; }
    setSubmittingReview(true);
    try {
      const res = await api.post<ApiResponse<any>>('/reviews', { bookingId: reviewBooking._id, rating: reviewRating, comment: reviewComment });
      if (res.data.success) { showToast('Gửi đánh giá thành công! Cảm ơn bạn.', 'success'); setReviewBooking(null); setReviewComment(''); fetchBookings(); }
    } catch (error: any) { showToast(error.response?.data?.message || 'Gửi đánh giá thất bại', 'error'); } finally { setSubmittingReview(false); }
  };

  return <div className="sb-page"><div className="sb-shell"><PageHeader eyebrow="Tài khoản của bạn" title="Booking của tôi" description="Quản lý lịch đặt sân, vé điện tử và đánh giá dịch vụ trong một nơi." />
    <div className="mt-7 sb-tabs">{[{ id: 'all', label: 'Tất cả' }, { id: 'upcoming', label: 'Sắp tới' }, { id: 'completed', label: 'Đã hoàn thành' }, { id: 'cancelled', label: 'Đã hủy' }].map((tab) => <button key={tab.id} type="button" onClick={() => setFilter(tab.id)} className={`sb-tab ${filter === tab.id ? 'is-active' : ''}`} aria-current={filter === tab.id ? 'page' : undefined}>{tab.label}</button>)}</div>
    <section className="mt-7 rounded-[var(--sb-radius-lg)] border border-[var(--sb-line)] bg-white p-5 shadow-[var(--sb-shadow-card)] sm:p-7">{loading ? <LoadingState compact /> : bookings.length === 0 ? <EmptyState title="Không có đơn đặt sân nào" description="Hãy tìm một sân phù hợp và đặt ngay hôm nay." action={<Button tone="ink" onClick={() => window.location.assign('/search')}>Tìm sân thể thao</Button>} /> : <div>{bookings.map((booking) => <BookingCard key={booking._id} booking={booking} onQr={() => setSelectedBookingForQr(booking)} onCancel={() => setCancelModalBooking(booking)} onReview={() => setReviewBooking(booking)} />)}</div>}</section>
    <ModalShell open={!!selectedBookingForQr} title="Vé vào sân điện tử" onClose={() => setSelectedBookingForQr(null)} size="sm"><div className="text-center"><div className="mx-auto w-fit rounded-[var(--sb-radius-lg)] border border-[var(--sb-line)] bg-[#fffafa] p-4"><img src={selectedBookingForQr ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${selectedBookingForQr.bookingCode}` : ''} alt="Mã QR vé vào sân" className="h-48 w-48" /></div><p className="mt-3 font-mono text-sm font-bold text-[var(--sb-ink)]">{selectedBookingForQr?.bookingCode}</p><div className="mt-5 space-y-2 rounded-[var(--sb-radius)] border border-[var(--sb-line)] bg-[#fffafa] p-4 text-left text-xs"><p><span className="text-[var(--sb-ink-3)]">Sân: </span><strong>{selectedBookingForQr?.court?.name}</strong></p><p><span className="text-[var(--sb-ink-3)]">Thời gian: </span><strong>{selectedBookingForQr?.startTime} – {selectedBookingForQr?.endTime} ({selectedBookingForQr?.date})</strong></p></div><p className="mt-4 text-xs leading-5 text-[var(--sb-ink-3)]">Xuất trình mã QR tại quầy lễ tân để nhân viên check-in vào sân.</p></div></ModalShell>
    <ModalShell open={!!cancelModalBooking} title="Xác nhận hủy đơn đặt sân" description={`Bạn đang yêu cầu hủy đơn ${cancelModalBooking?.bookingCode || ''}.`} onClose={() => setCancelModalBooking(null)} footer={<><Button tone="quiet" onClick={() => setCancelModalBooking(null)}>Giữ lại đơn</Button><Button tone="danger" loading={cancelling} onClick={handleCancelBooking}>Xác nhận hủy sân</Button></>}><FormField label="Lý do hủy sân" required><textarea value={cancelReason} onChange={(event) => setCancelReason(event.target.value)} placeholder="Ví dụ: Bận việc đột xuất, thời tiết xấu..." className="sb-field resize-none" rows={3} required /></FormField></ModalShell>
    <ModalShell open={!!reviewBooking} title={`Đánh giá sân ${reviewBooking?.court?.name || ''}`} onClose={() => setReviewBooking(null)} footer={<><Button tone="quiet" onClick={() => setReviewBooking(null)}>Đóng</Button><Button tone="accent" loading={submittingReview} onClick={handleSendReview}>Gửi đánh giá</Button></>}><div className="space-y-5"><div className="flex justify-center gap-1" aria-label={`Đánh giá ${reviewRating} trên 5`} role="radiogroup">{[1, 2, 3, 4, 5].map((star) => <button key={star} type="button" role="radio" aria-checked={star === reviewRating} aria-label={`${star} sao`} onClick={() => setReviewRating(star)} className="rounded-full p-1 transition-transform hover:scale-110"><Star className={`h-8 w-8 ${star <= reviewRating ? 'fill-current text-[#b07a2d]' : 'text-[var(--sb-line-strong)]'}`} /></button>)}</div><FormField label="Nhận xét của bạn" required><textarea value={reviewComment} onChange={(event) => setReviewComment(event.target.value)} placeholder="Chia sẻ về chất lượng mặt sân, dịch vụ..." className="sb-field resize-none" rows={4} required /></FormField></div></ModalShell>
  </div></div>;
};
