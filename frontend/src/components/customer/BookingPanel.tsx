import React from 'react';
import { CalendarDays, Clock3 } from 'lucide-react';
import type { Court } from '../../types';
import { Button } from '../ui';
import { formatVnd } from '../../utils/formatters';

type OccupiedSlot = { startTime: string; endTime: string; status: string };
type TimeSlot = { start: string; end: string };

type BookingPanelProps = {
  court: Court;
  selectedDate: string;
  occupiedSlots: OccupiedSlot[];
  selectedStart: string;
  selectedEnd: string;
  totalHours: number;
  totalPrice: number;
  timeSlots: TimeSlot[];
  onDateChange: (value: string) => void;
  onSelectSlot: (start: string, end: string) => void;
  onConfirm: () => void;
  isSlotOccupied: (start: string, end: string) => boolean;
};

export const BookingPanel: React.FC<BookingPanelProps> = ({ court, selectedDate, occupiedSlots, selectedStart, selectedEnd, totalHours, totalPrice, timeSlots, onDateChange, onSelectSlot, onConfirm, isSlotOccupied }) => (
  <aside className="sticky top-24 rounded-[var(--sb-radius-lg)] border border-[var(--sb-line)] bg-white p-5 shadow-[var(--sb-shadow-card)] sm:p-6">
    <div className="flex items-start justify-between gap-3 border-b border-[var(--sb-line)] pb-5"><div><p className="sb-kicker">Đặt sân online</p><h2 className="mt-1 text-xl font-bold tracking-[-0.02em] text-[var(--sb-ink)]">Chọn giờ chơi</h2></div><CalendarDays className="h-5 w-5 text-[var(--sb-accent)]" /></div>
    <div className="mt-5"><label htmlFor="booking-date" className="sb-field-label">Ngày chơi</label><input id="booking-date" type="date" min={new Date().toISOString().split('T')[0]} value={selectedDate} onChange={(event) => onDateChange(event.target.value)} className="sb-field" /></div>
    <div className="mt-6"><div className="mb-3 flex items-center justify-between gap-3"><label className="sb-field-label mb-0">Khung giờ</label><span className="text-[11px] text-[var(--sb-ink-3)]">{occupiedSlots.length} slot đã đặt</span></div><div className="grid grid-cols-2 gap-2">{timeSlots.map((slot) => { const occupied = isSlotOccupied(slot.start, slot.end); const selected = selectedStart === slot.start && selectedEnd === slot.end; return <button key={slot.start} type="button" disabled={occupied} onClick={() => onSelectSlot(slot.start, slot.end)} aria-pressed={selected} className={`flex min-h-11 items-center justify-center gap-1.5 rounded-[var(--sb-radius)] border px-2 text-xs font-bold transition-colors ${occupied ? 'cursor-not-allowed border-[rgba(166,74,74,.2)] bg-[rgba(166,74,74,.06)] text-[var(--sb-danger)] line-through' : selected ? 'border-[var(--sb-accent)] bg-[var(--sb-accent)] text-white' : 'border-[var(--sb-line)] bg-[#fffafa] text-[var(--sb-ink-2)] hover:border-[var(--sb-accent)] hover:text-[var(--sb-accent)]'}`}><Clock3 className="h-3.5 w-3.5" />{slot.start}–{slot.end}</button>; })}</div></div>
    <div className="mt-6 space-y-2 border-t border-[var(--sb-line)] pt-5 text-sm"><div className="flex justify-between gap-3 text-[var(--sb-ink-2)]"><span>Khung giờ</span><strong className="text-[var(--sb-ink)]">{selectedStart ? `${selectedStart} – ${selectedEnd}` : 'Chưa chọn'}</strong></div><div className="flex justify-between gap-3 text-[var(--sb-ink-2)]"><span>Thời lượng</span><strong className="text-[var(--sb-ink)]">{totalHours} giờ</strong></div><div className="flex justify-between gap-3 border-t border-[var(--sb-line)] pt-3 text-base font-bold text-[var(--sb-ink)]"><span>Tổng chi phí</span><strong className="text-[var(--sb-accent)]">{formatVnd(totalPrice)}</strong></div></div>
    <Button type="button" tone="accent" fullWidth className="mt-6" onClick={onConfirm}>Tiến hành đặt sân</Button>
    <p className="mt-3 text-center text-[11px] leading-5 text-[var(--sb-ink-3)]">{court.openingTime} – {court.closingTime} · Hệ thống khóa slot theo thời gian thực</p>
  </aside>
);
