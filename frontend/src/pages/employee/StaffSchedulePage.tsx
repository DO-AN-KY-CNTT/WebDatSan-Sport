import React, { useEffect, useState } from 'react';
import { Building2, CalendarDays, Clock3 } from 'lucide-react';
import { api } from '../../services/api';
import type { ApiResponse, WorkSchedule } from '../../types';
import { EmptyState, LoadingState, PageHeader, StatusBadge, SurfaceCard } from '../../components/ui';

export const StaffSchedulePage: React.FC = () => {
  const [schedules, setSchedules] = useState<WorkSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { const fetchSchedules = async () => { try { const res = await api.get<ApiResponse<WorkSchedule[]>>('/work-schedules/my'); if (res.data.success) setSchedules(res.data.data); } catch (error) { console.error('Error fetching schedules:', error); } finally { setLoading(false); } }; fetchSchedules(); }, []);
  return <div className="space-y-7"><PageHeader eyebrow="Staff portal" title="Lịch làm việc của tôi" description="Xem các ca trực được phân công theo ngày và sân phụ trách." />{loading ? <LoadingState /> : schedules.length === 0 ? <SurfaceCard><EmptyState title="Chưa có lịch phân ca" description="Quản lý chưa phân ca làm việc mới cho bạn trong thời gian tới." /></SurfaceCard> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{schedules.map((item) => <SurfaceCard as="article" key={item._id} className="p-5"><div className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--sb-accent)]"><CalendarDays className="h-3.5 w-3.5" />{item.date}</span><StatusBadge tone={item.status === 'completed' ? 'info' : item.status === 'scheduled' ? 'success' : 'default'}>{item.status === 'completed' ? 'Đã trực' : item.status === 'scheduled' ? 'Sắp tới' : 'Đã hủy'}</StatusBadge></div><h2 className="mt-6 text-lg font-bold text-[var(--sb-ink)]">{item.shift?.name}</h2><p className="mt-2 flex items-center gap-2 text-sm text-[var(--sb-ink-2)]"><Clock3 className="h-4 w-4 text-[var(--sb-accent)]" />{item.shift?.startTime} – {item.shift?.endTime}</p>{item.court && <p className="mt-5 flex items-center gap-2 border-t border-[var(--sb-line)] pt-4 text-xs font-semibold text-[var(--sb-ink-2)]"><Building2 className="h-4 w-4 text-[var(--sb-accent)]" />{item.court.name}</p>}{item.note && <p className="mt-3 text-xs italic text-[var(--sb-ink-3)]">Ghi chú: {item.note}</p>}</SurfaceCard>)}</div>}</div>;
};
