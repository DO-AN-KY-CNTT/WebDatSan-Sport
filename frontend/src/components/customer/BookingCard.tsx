import React from 'react';
import { CalendarDays, Clock3, MapPin, QrCode, Star, XCircle } from 'lucide-react';
import type { Booking } from '../../types';
import { Button, StatusBadge } from '../ui';
import { formatBookingStatus, formatVnd } from '../../utils/formatters';

type BookingCardProps = { booking: Booking; onQr: () => void; onCancel: () => void; onReview: () => void };

const fallbackImage = 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400';
const statusTone = (status: Booking['status']) => status === 'confirmed' ? 'success' : status === 'completed' ? 'info' : status === 'cancelled' ? 'danger' : 'warning';

export const BookingCard: React.FC<BookingCardProps> = ({ booking, onQr, onCancel, onReview }) => (
  <article className="grid gap-5 border-b border-[var(--sb-line)] py-5 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
    <div className="flex min-w-0 gap-4"><img src={booking.court?.images?.[0] || fallbackImage} alt={booking.court?.name} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage; }} className="h-24 w-24 shrink-0 rounded-[var(--sb-radius)] object-cover" /><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="font-mono text-xs font-bold text-[var(--sb-accent)]">{booking.bookingCode}</span><StatusBadge tone={statusTone(booking.status)}>{formatBookingStatus(booking.status)}</StatusBadge></div><h2 className="mt-2 truncate text-base font-bold text-[var(--sb-ink)]">{booking.court?.name}</h2><div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--sb-ink-2)]"><span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-[var(--sb-accent)]" />{booking.date}</span><span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-[var(--sb-accent)]" />{booking.startTime} – {booking.endTime}</span></div><p className="mt-2 flex items-center gap-1.5 truncate text-xs text-[var(--sb-ink-3)]"><MapPin className="h-3.5 w-3.5 shrink-0" />{booking.court?.address}</p></div></div>
    <div className="flex flex-col items-start gap-3 border-t border-[var(--sb-line)] pt-4 md:items-end md:border-t-0 md:pt-0"><p className="text-lg font-extrabold text-[var(--sb-ink)]">{formatVnd(booking.totalPrice)}</p><div className="flex flex-wrap gap-2 md:justify-end">{booking.status === 'confirmed' && <Button tone="ink" onClick={onQr}><QrCode className="h-3.5 w-3.5" />Vé QR</Button>}{booking.status === 'completed' && <Button tone="quiet" onClick={onReview}><Star className="h-3.5 w-3.5 text-[#b07a2d]" />Đánh giá</Button>}{['pending', 'confirmed'].includes(booking.status) && <Button tone="quiet" onClick={onCancel}><XCircle className="h-3.5 w-3.5 text-[var(--sb-danger)]" />Hủy sân</Button>}</div></div>
  </article>
);
