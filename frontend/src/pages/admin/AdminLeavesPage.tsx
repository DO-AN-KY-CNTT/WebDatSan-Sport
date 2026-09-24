import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, Clock, User, Filter, Search } from 'lucide-react';
import { api } from '../../services/api';
import { LeaveRequest, ApiResponse } from '../../types';
import { useToast } from '../../components/common/Toast';

export const AdminLeavesPage: React.FC = () => {
  const { showToast } = useToast();
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<LeaveRequest[]>>(
        `/leave-requests?status=${statusFilter}`
      );
      if (res.data.success) {
        setLeaves(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching leaves:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [statusFilter]);

  const handleApprove = async (id: string) => {
    try {
      const res = await api.put<ApiResponse<any>>(`/leave-requests/${id}/approve`, {
        responseNote: 'Ban Giám đốc / Quản lý đã phê duyệt',
      });
      if (res.data.success) {
        showToast('Duyệt đơn nghỉ phép thành công', 'success');
        fetchLeaves();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Duyệt thất bại', 'error');
    }
  };

  const handleReject = async (id: string) => {
    const note = window.prompt('Nhập lý do từ chối (tùy chọn):', 'Không sắp xếp được nhân sự thay thế');
    try {
      const res = await api.put<ApiResponse<any>>(`/leave-requests/${id}/reject`, {
        responseNote: note || 'Không thể duyệt',
      });
      if (res.data.success) {
        showToast('Đã từ chối đơn nghỉ phép', 'info');
        fetchLeaves();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Từ chối thất bại', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Quản lý Đơn Xin Nghỉ Phép
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Xét duyệt hoặc từ chối các yêu cầu nghỉ phép của nhân viên toàn hệ thống.
          </p>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ duyệt (pending)</option>
            <option value="approved">Đã duyệt (approved)</option>
            <option value="rejected">Bị từ chối (rejected)</option>
            <option value="cancelled">Đã hủy (cancelled)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Đang tải danh sách đơn nghỉ...</div>
        ) : leaves.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">Không có đơn xin nghỉ phép nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Nhân viên</th>
                  <th className="py-3.5 px-4">Loại nghỉ</th>
                  <th className="py-3.5 px-4">Thời gian nghỉ</th>
                  <th className="py-3.5 px-4">Lý do</th>
                  <th className="py-3.5 px-4">Người duyệt</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {leaves.map((l) => (
                  <tr key={l._id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">{l.employee?.fullName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {l.employee?.employeeCode} • {l.employee?.department}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800 capitalize">
                      {l.type.replace(/_/g, ' ')}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {l.startDate} → {l.endDate}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate" title={l.reason}>
                      {l.reason}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {l.approvedBy ? l.approvedBy.fullName : '--'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          l.status === 'approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : l.status === 'rejected'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : l.status === 'cancelled'
                            ? 'bg-slate-100 text-slate-500'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {l.status === 'approved'
                          ? 'Đã duyệt'
                          : l.status === 'rejected'
                          ? 'Từ chối'
                          : l.status === 'cancelled'
                          ? 'Đã hủy'
                          : 'Chờ duyệt'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      {l.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(l._id)}
                            className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold rounded-lg text-[10px]"
                          >
                            Duyệt
                          </button>
                          <button
                            onClick={() => handleReject(l._id)}
                            className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold rounded-lg text-[10px]"
                          >
                            Từ chối
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
