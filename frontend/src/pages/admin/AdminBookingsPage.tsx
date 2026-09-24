import React, { useState, useEffect } from 'react';
import {
  CalendarDays,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Building2,
} from 'lucide-react';
import { api } from '../../services/api';
import { Booking, ApiResponse } from '../../types';
import { useToast } from '../../components/common/Toast';

export const AdminBookingsPage: React.FC = () => {
  const { showToast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (dateFilter) params.set('date', dateFilter);

      const res = await api.get<ApiResponse<{ bookings: Booking[] }>>(
        `/bookings?${params.toString()}`
      );
      if (res.data.success) {
        setBookings(res.data.data.bookings);
      }
    } catch (err) {
      console.error('Error fetching admin bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter, dateFilter]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await api.patch(`/bookings/${id}/status`, { status: newStatus });
      if (res.data.success) {
        showToast(`Cập nhật trạng thái thành công: ${newStatus}`, 'success');
        fetchBookings();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Cập nhật thất bại', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Quản lý Đơn Đặt Sân
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Theo dõi toàn bộ lịch đặt sân của khách hàng, xác nhận và quản lý trạng thái thanh toán.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3">
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="completed">Đã hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>

        <div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700"
          />
        </div>

        {dateFilter && (
          <button
            onClick={() => setDateFilter('')}
            className="text-xs text-rose-600 font-bold px-2"
          >
            Xóa lọc ngày
          </button>
        )}
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Đang tải danh sách booking...</div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">Không có đơn đặt sân nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Mã Đơn</th>
                  <th className="py-3.5 px-4">Khách hàng</th>
                  <th className="py-3.5 px-4">Sân thể thao</th>
                  <th className="py-3.5 px-4">Ngày chơi</th>
                  <th className="py-3.5 px-4">Khung giờ</th>
                  <th className="py-3.5 px-4">Tổng tiền</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4">Thanh toán</th>
                  <th className="py-3.5 px-4 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {bookings.map((b) => {
                  const customer = b.user as any;
                  return (
                    <tr key={b._id} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-600">
                        {b.bookingCode}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">{customer?.fullName}</span>
                        <span className="text-[11px] text-slate-400 block">{customer?.phone}</span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-900">{b.court?.name}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">{b.date}</td>
                      <td className="py-3.5 px-4 font-mono">
                        {b.startTime} - {b.endTime}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {b.totalPrice?.toLocaleString('vi-VN')} đ
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : b.status === 'completed'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : b.status === 'cancelled'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                            b.paymentStatus === 'paid'
                              ? 'text-emerald-700 bg-emerald-50'
                              : b.paymentStatus === 'refunded'
                              ? 'text-rose-700 bg-rose-50'
                              : 'text-slate-600 bg-slate-100'
                          }`}
                        >
                          {b.paymentStatus === 'paid' ? 'Đã thu' : b.paymentStatus === 'refunded' ? 'Đã hoàn' : 'Chưa thu'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => handleUpdateStatus(b._id, 'completed')}
                            className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold rounded-lg text-[10px]"
                          >
                            Hoàn tất
                          </button>
                        )}
                        {b.status !== 'cancelled' && (
                          <button
                            onClick={() => handleUpdateStatus(b._id, 'cancelled')}
                            className="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold rounded-lg text-[10px]"
                          >
                            Hủy đơn
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
