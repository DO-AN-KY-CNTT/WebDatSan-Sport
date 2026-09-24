import React, { useState, useEffect } from 'react';
import { Clock, Plus, Edit2, Trash2, X } from 'lucide-react';
import { api } from '../../services/api';
import { Shift, ApiResponse } from '../../types';
import { useToast } from '../../components/common/Toast';

export const AdminShiftsPage: React.FC = () => {
  const { showToast } = useToast();
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    startTime: '08:00',
    endTime: '17:00',
    breakStart: '12:00',
    breakEnd: '13:00',
    gracePeriod: 15,
    status: 'active',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchShifts = async () => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<Shift[]>>('/shifts');
      if (res.data.success) {
        setShifts(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching shifts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const openCreateModal = () => {
    setEditingShift(null);
    setFormData({
      name: '',
      startTime: '08:00',
      endTime: '12:00',
      breakStart: '12:00',
      breakEnd: '13:00',
      gracePeriod: 15,
      status: 'active',
    });
    setModalOpen(true);
  };

  const openEditModal = (s: Shift) => {
    setEditingShift(s);
    setFormData({
      name: s.name,
      startTime: s.startTime,
      endTime: s.endTime,
      breakStart: s.breakStart || '12:00',
      breakEnd: s.breakEnd || '13:00',
      gracePeriod: s.gracePeriod,
      status: s.status,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        gracePeriod: Number(formData.gracePeriod),
      };

      if (editingShift) {
        const res = await api.put(`/shifts/${editingShift._id}`, payload);
        if (res.data.success) showToast('Cập nhật ca làm thành công', 'success');
      } else {
        const res = await api.post('/shifts', payload);
        if (res.data.success) showToast('Tạo ca làm mới thành công', 'success');
      }
      setModalOpen(false);
      fetchShifts();
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Thao tác thất bại', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa ca làm này?')) return;
    try {
      const res = await api.delete(`/shifts/${id}`);
      if (res.data.success) {
        showToast('Xóa ca làm thành công', 'success');
        fetchShifts();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Xóa ca làm thất bại', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Quản lý Ca Làm Việc
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Cấu hình thời gian bắt đầu, kết thúc, thời gian nghỉ và thời gian ân hạn trễ theo quy chế.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center space-x-2 shadow-md shadow-brand-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Ca Mới</span>
        </button>
      </div>

      {/* Shifts Grid */}
      {loading ? (
        <div className="p-8 text-center text-xs text-slate-400">Đang tải danh sách ca làm...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shifts.map((s) => (
            <div
              key={s._id}
              className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">{s.name}</h3>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      s.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {s.status === 'active' ? 'Đang áp dụng' : 'Tạm dừng'}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => openEditModal(s)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-50"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Giờ làm việc:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {s.startTime} - {s.endTime}
                  </span>
                </div>
                {s.breakStart && s.breakEnd && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Giờ nghỉ giữa ca:</span>
                    <span className="font-mono font-semibold text-slate-700">
                      {s.breakStart} - {s.breakEnd}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Cho phép trễ:</span>
                  <span className="font-bold text-amber-600">{s.gracePeriod} phút</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {editingShift ? 'Chỉnh sửa ca làm' : 'Thêm ca làm việc mới'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên ca làm</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Ca Sáng, Ca Tối..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Giờ bắt đầu</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Giờ kết thúc</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bắt đầu nghỉ</label>
                  <input
                    type="time"
                    value={formData.breakStart}
                    onChange={(e) => setFormData({ ...formData, breakStart: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kết thúc nghỉ</label>
                  <input
                    type="time"
                    value={formData.breakEnd}
                    onChange={(e) => setFormData({ ...formData, breakEnd: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Thời gian cho phép trễ (Phút)
                </label>
                <input
                  type="number"
                  value={formData.gracePeriod}
                  onChange={(e) => setFormData({ ...formData, gracePeriod: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  required
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
                  {submitting ? 'Đang lưu...' : 'Lưu Ca Làm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
