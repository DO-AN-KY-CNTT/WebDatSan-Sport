import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  Search,
  Filter,
  Edit2,
  FileText,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  X,
  Clock,
  User,
} from 'lucide-react';
import { api } from '../../services/api';
import { Attendance, AttendanceLog, Court, ApiResponse } from '../../types';
import { useToast } from '../../components/common/Toast';

export const AdminAttendancePage: React.FC = () => {
  const { showToast } = useToast();
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingAtt, setEditingAtt] = useState<Attendance | null>(null);
  const [editCheckIn, setEditCheckIn] = useState('');
  const [editCheckOut, setEditCheckOut] = useState('');
  const [editStatus, setEditStatus] = useState<any>('present');
  const [editReason, setEditReason] = useState('');
  const [submittingEdit, setSubmittingEdit] = useState(false);

  // Audit Logs Modal State
  const [logsModalOpen, setLogsModalOpen] = useState(false);
  const [selectedLogs, setSelectedLogs] = useState<AttendanceLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // QR Generation Modal State
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedCourtForQr, setSelectedCourtForQr] = useState('');
  const [generatedQr, setGeneratedQr] = useState<any>(null);
  const [generatingQr, setGeneratingQr] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (dateFilter) params.set('date', dateFilter);
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const [attRes, courtRes] = await Promise.all([
        api.get<ApiResponse<{ attendances: Attendance[] }>>(`/attendance?${params.toString()}`),
        api.get<ApiResponse<{ courts: Court[] }>>('/courts?limit=100'),
      ]);

      if (attRes.data.success) setAttendances(attRes.data.data.attendances);
      if (courtRes.data.success) {
        setCourts(courtRes.data.data.courts);
        if (courtRes.data.data.courts.length > 0) {
          setSelectedCourtForQr(courtRes.data.data.courts[0]._id);
        }
      }
    } catch (err) {
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateFilter, statusFilter]);

  const openEditModal = (att: Attendance) => {
    setEditingAtt(att);
    setEditCheckIn(att.checkIn ? new Date(att.checkIn).toISOString().slice(0, 16) : '');
    setEditCheckOut(att.checkOut ? new Date(att.checkOut).toISOString().slice(0, 16) : '');
    setEditStatus(att.status);
    setEditReason('');
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAtt) return;
    if (!editReason.trim()) {
      showToast('Lý do chỉnh sửa chấm công là bắt buộc để ghi nhận Audit Log', 'error');
      return;
    }

    setSubmittingEdit(true);
    try {
      const payload: any = {
        status: editStatus,
        reason: editReason,
      };
      if (editCheckIn) payload.checkIn = new Date(editCheckIn).toISOString();
      if (editCheckOut) payload.checkOut = new Date(editCheckOut).toISOString();

      const res = await api.put(`/attendance/${editingAtt._id}`, payload);
      if (res.data.success) {
        showToast('Cập nhật chấm công và lưu vết kiểm toán thành công', 'success');
        setEditModalOpen(false);
        fetchData();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Cập nhật thất bại', 'error');
    } finally {
      setSubmittingEdit(false);
    }
  };

  const openLogsModal = async (attId: string) => {
    setLogsModalOpen(true);
    setLoadingLogs(true);
    try {
      const res = await api.get<ApiResponse<AttendanceLog[]>>(`/attendance/${attId}/logs`);
      if (res.data.success) {
        setSelectedLogs(res.data.data);
      }
    } catch (err) {
      showToast('Lỗi khi tải audit logs', 'error');
    } finally {
      setLoadingLogs(false);
    }
  };

  const handleGenerateQr = async () => {
    if (!selectedCourtForQr) return;
    setGeneratingQr(true);
    try {
      const res = await api.post<ApiResponse<any>>('/attendance/generate-qr', {
        courtId: selectedCourtForQr,
        expiresInMinutes: 120, // 2 hours
      });
      if (res.data.success) {
        setGeneratedQr(res.data.data);
        showToast('Tạo mã QR chấm công thành công!', 'success');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Tạo QR thất bại', 'error');
    } finally {
      setGeneratingQr(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Quản trị Chấm công & Audit Log
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kiểm soát giờ vào ra của nhân viên, hiệu chỉnh sai sót có lưu vết và tạo mã QR sân.
          </p>
        </div>

        <button
          onClick={() => {
            setGeneratedQr(null);
            setQrModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold flex items-center space-x-2 shadow-md"
        >
          <QrCode className="w-4 h-4" />
          <span>Tạo Mã QR Sân</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3">
        <div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="present">Đúng giờ (present)</option>
            <option value="late">Đi muộn (late)</option>
            <option value="absent">Vắng mặt (absent)</option>
            <option value="leave">Nghỉ phép (leave)</option>
          </select>
        </div>

        {dateFilter && (
          <button
            onClick={() => setDateFilter('')}
            className="text-xs text-rose-600 font-bold px-2 self-center"
          >
            Xóa lọc ngày
          </button>
        )}
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Đang tải dữ liệu chấm công...</div>
        ) : attendances.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">Chưa có bản ghi chấm công nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Nhân viên</th>
                  <th className="py-3.5 px-4">Ngày trực</th>
                  <th className="py-3.5 px-4">Ca làm việc</th>
                  <th className="py-3.5 px-4">Check-in</th>
                  <th className="py-3.5 px-4">Check-out</th>
                  <th className="py-3.5 px-4">Giờ làm</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {attendances.map((att) => (
                  <tr key={att._id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">{att.employee?.fullName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {att.employee?.employeeCode} • {att.employee?.department}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{att.date}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {att.workSchedule?.shift?.name || 'Ca làm'}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {att.checkIn ? new Date(att.checkIn).toLocaleTimeString('vi-VN') : '--:--'}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {att.checkOut ? new Date(att.checkOut).toLocaleTimeString('vi-VN') : '--:--'}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-brand-600">
                      {att.workHours ? `${att.workHours}h` : '0h'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          att.status === 'present'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : att.status === 'late'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {att.status === 'present' ? 'Đúng giờ' : att.status === 'late' ? 'Đi muộn' : att.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <button
                        onClick={() => openEditModal(att)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-brand-600"
                        title="Sửa chấm công"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openLogsModal(att._id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600"
                        title="Xem Audit Log"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Edit Attendance */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                Hiệu chỉnh chấm công ({editingAtt?.employee?.fullName})
              </h3>
              <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Giờ Check-in</label>
                  <input
                    type="datetime-local"
                    value={editCheckIn}
                    onChange={(e) => setEditCheckIn(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Giờ Check-out</label>
                  <input
                    type="datetime-local"
                    value={editCheckOut}
                    onChange={(e) => setEditCheckOut(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Trạng thái chấm công</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold"
                >
                  <option value="present">Đúng giờ (present)</option>
                  <option value="late">Đi muộn (late)</option>
                  <option value="half_day">Nửa ngày (half_day)</option>
                  <option value="absent">Vắng mặt (absent)</option>
                </select>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                <label className="block font-bold text-amber-900">
                  Lý do chỉnh sửa (BẮT BUỘC để ghi log kiểm toán)
                </label>
                <textarea
                  value={editReason}
                  onChange={(e) => setEditReason(e.target.value)}
                  placeholder="Ví dụ: Nhân viên quên bấm check-out, đã xác nhận qua camera an ninh..."
                  className="w-full bg-white border border-amber-300 rounded-lg p-2 text-xs"
                  rows={2}
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submittingEdit}
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-600/30"
                >
                  {submittingEdit ? 'Đang lưu...' : 'Lưu & Ghi Nhận Audit Log'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Audit Logs */}
      {logsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Lịch sử Audit Log Chấm Công</span>
              </h3>
              <button onClick={() => setLogsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {loadingLogs ? (
              <div className="p-8 text-center text-xs text-slate-400">Đang tải nhật ký...</div>
            ) : selectedLogs.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">Không có bản ghi log nào.</div>
            ) : (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {selectedLogs.map((log) => (
                  <div key={log._id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-400 text-[10px]">
                      <span>Thực hiện bởi: <strong>{log.performedBy?.fullName}</strong> ({log.performedBy?.role})</span>
                      <span>{new Date(log.createdAt).toLocaleString('vi-VN')}</span>
                    </div>
                    <div className="font-semibold text-slate-800">
                      Hành động: <span className="font-mono text-brand-600 uppercase">{log.action}</span>
                    </div>
                    <div className="text-slate-600 bg-white p-2 rounded-lg border border-slate-200">
                      <strong>Lý do:</strong> {log.reason}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Generate Dynamic QR Code */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-slate-900">Tạo Mã QR Chấm Công Động</h3>
              <button onClick={() => setQrModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!generatedQr ? (
              <div className="space-y-4 text-left text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chọn Sân Thể Thao</label>
                  <select
                    value={selectedCourtForQr}
                    onChange={(e) => setSelectedCourtForQr(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold"
                  >
                    {courts.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name} ({c.type})
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleGenerateQr}
                  disabled={generatingQr}
                  className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/30"
                >
                  {generatingQr ? 'Đang tạo...' : 'Tạo Mã QR Mới'}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-2 bg-slate-50 rounded-2xl border border-slate-100 inline-block">
                  <img src={generatedQr.qrDataUrl} alt="QR Code" className="w-48 h-48 mx-auto" />
                </div>
                <div className="text-[11px] font-mono text-slate-600 bg-slate-100 p-2 rounded-lg truncate">
                  Token: {generatedQr.code}
                </div>
                <p className="text-[11px] text-emerald-600 font-semibold">
                  Mã QR có hiệu lực trong 120 phút. Nhân viên có thể quét để check-in.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
