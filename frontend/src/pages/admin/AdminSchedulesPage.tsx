import React, { useState, useEffect } from 'react';
import { CalendarCheck, Plus, Trash2, Building2, User, Clock, X } from 'lucide-react';
import { api } from '../../services/api';
import { WorkSchedule, Employee, Shift, Court, ApiResponse } from '../../types';
import { useToast } from '../../components/common/Toast';

export const AdminSchedulesPage: React.FC = () => {
  const { showToast } = useToast();
  const [schedules, setSchedules] = useState<WorkSchedule[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    shiftId: '',
    courtId: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [schedRes, empRes, shiftRes, courtRes] = await Promise.all([
        api.get<ApiResponse<WorkSchedule[]>>('/work-schedules'),
        api.get<ApiResponse<{ employees: Employee[] }>>('/employees?limit=100'),
        api.get<ApiResponse<Shift[]>>('/shifts'),
        api.get<ApiResponse<{ courts: Court[] }>>('/courts?limit=100'),
      ]);

      if (schedRes.data.success) setSchedules(schedRes.data.data);
      if (empRes.data.success) setEmployees(empRes.data.data.employees);
      if (shiftRes.data.success) setShifts(shiftRes.data.data);
      if (courtRes.data.success) setCourts(courtRes.data.data.courts);
    } catch (err) {
      console.error('Error fetching schedule data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setFormData({
      employeeId: employees[0]?._id || '',
      shiftId: shifts[0]?._id || '',
      courtId: courts[0]?._id || '',
      date: new Date().toISOString().split('T')[0],
      note: '',
    });
    setModalOpen(true);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post('/work-schedules', formData);
      if (res.data.success) {
        showToast('Phân ca làm việc thành công!', 'success');
        setModalOpen(false);
        fetchData();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Phân ca thất bại', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Hủy lịch phân ca này?')) return;
    try {
      const res = await api.delete(`/work-schedules/${id}`);
      if (res.data.success) {
        showToast('Xóa lịch phân ca thành công', 'success');
        fetchData();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Xóa thất bại', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Phân Lịch Làm Việc & Điều Phối
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Sắp xếp nhân sự theo ca trực, quản lý địa điểm trực và chống trùng ca tự động.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center space-x-2 shadow-md shadow-brand-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Phân Ca Trực Mới</span>
        </button>
      </div>

      {/* Schedules Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Đang tải lịch phân ca...</div>
        ) : schedules.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">Chưa có lịch phân ca nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Ngày trực</th>
                  <th className="py-3.5 px-4">Nhân viên</th>
                  <th className="py-3.5 px-4">Ca làm việc</th>
                  <th className="py-3.5 px-4">Thời gian</th>
                  <th className="py-3.5 px-4">Sân phụ trách</th>
                  <th className="py-3.5 px-4">Ghi chú</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {schedules.map((s) => (
                  <tr key={s._id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{s.date}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">{s.employee?.fullName}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {s.employee?.employeeCode} • {s.employee?.department}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-brand-600">{s.shift?.name}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {s.shift?.startTime} - {s.shift?.endTime}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {s.court?.name || 'Trung tâm tổng'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 italic">{s.note || '--'}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Create Schedule */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Phân ca trực cho nhân viên</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Chọn nhân viên</label>
                <select
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold"
                  required
                >
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeCode} - {emp.fullName} ({emp.position})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Chọn ca làm việc</label>
                <select
                  value={formData.shiftId}
                  onChange={(e) => setFormData({ ...formData, shiftId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold"
                  required
                >
                  {shifts.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name} ({s.startTime} - {s.endTime})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ngày làm việc</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Sân trực phân công</label>
                <select
                  value={formData.courtId}
                  onChange={(e) => setFormData({ ...formData, courtId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                >
                  <option value="">(Không chọn cụ thể - Trực trung tâm)</option>
                  {courts.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name} ({c.type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ghi chú phân ca</label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Ví dụ: Hỗ trợ giải đấu, trực lễ tân chính..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  rows={2}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-600/30"
                >
                  {submitting ? 'Đang lưu...' : 'Xác Nhận Phân Ca'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
