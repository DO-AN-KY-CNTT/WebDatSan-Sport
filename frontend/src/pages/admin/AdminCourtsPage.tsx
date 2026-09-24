import React, { useState, useEffect } from 'react';
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  AlertTriangle,
  X,
  Search,
} from 'lucide-react';
import { api } from '../../services/api';
import { Court, ApiResponse } from '../../types';
import { useToast } from '../../components/common/Toast';

export const AdminCourtsPage: React.FC = () => {
  const { showToast } = useToast();
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Modal State (Create & Edit)
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourt, setEditingCourt] = useState<Court | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'football',
    description: '',
    address: '',
    pricePerHour: 200000,
    openingTime: '06:00',
    closingTime: '23:00',
    images: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800',
    status: 'active',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchCourts = async () => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<{ courts: Court[] }>>('/courts?limit=50');
      if (res.data.success) {
        setCourts(res.data.data.courts);
      }
    } catch (err) {
      console.error('Error fetching courts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  const openCreateModal = () => {
    setEditingCourt(null);
    setFormData({
      name: '',
      type: 'football',
      description: '',
      address: '',
      pricePerHour: 200000,
      openingTime: '06:00',
      closingTime: '23:00',
      images: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800',
      status: 'active',
    });
    setModalOpen(true);
  };

  const openEditModal = (c: Court) => {
    setEditingCourt(c);
    setFormData({
      name: c.name,
      type: c.type,
      description: c.description || '',
      address: c.address,
      pricePerHour: c.pricePerHour,
      openingTime: c.openingTime,
      closingTime: c.closingTime,
      images: c.images.join(', '),
      status: c.status,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        pricePerHour: Number(formData.pricePerHour),
        images: formData.images.split(',').map((s) => s.trim()),
      };

      if (editingCourt) {
        const res = await api.put(`/courts/${editingCourt._id}`, payload);
        if (res.data.success) {
          showToast('Cập nhật thông tin sân thành công', 'success');
        }
      } else {
        const res = await api.post('/courts', payload);
        if (res.data.success) {
          showToast('Tạo sân mới thành công', 'success');
        }
      }
      setModalOpen(false);
      fetchCourts();
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Thao tác thất bại', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sân thể thao này?')) return;
    try {
      const res = await api.delete(`/courts/${id}`);
      if (res.data.success) {
        showToast('Xóa sân thành công', 'success');
        fetchCourts();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Xóa sân thất bại', 'error');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'maintenance' : 'active';
    try {
      const res = await api.patch(`/courts/${id}/status`, { status: nextStatus });
      if (res.data.success) {
        showToast(`Đã chuyển trạng thái sân sang: ${nextStatus}`, 'success');
        fetchCourts();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Đổi trạng thái thất bại', 'error');
    }
  };

  const filteredCourts = courts.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase());
    const matchType = selectedType === 'all' || c.type === selectedType;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Quản lý Sân Thể Thao
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Thêm mới sân, cập nhật giá thuê, tiện ích và điều chỉnh trạng thái bảo trì.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center space-x-2 shadow-md shadow-brand-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Sân Mới</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên sân hoặc địa chỉ..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs pr-8"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700"
        >
          <option value="all">Tất cả môn</option>
          <option value="football">Bóng đá</option>
          <option value="badminton">Cầu lông</option>
          <option value="tennis">Tennis</option>
          <option value="pickleball">Pickleball</option>
          <option value="basketball">Bóng rổ</option>
          <option value="volleyball">Bóng chuyền</option>
        </select>
      </div>

      {/* Courts Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Đang tải danh sách sân...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Hình ảnh</th>
                  <th className="py-3.5 px-4">Tên sân</th>
                  <th className="py-3.5 px-4">Môn thể thao</th>
                  <th className="py-3.5 px-4">Giá / giờ</th>
                  <th className="py-3.5 px-4">Giờ mở cửa</th>
                  <th className="py-3.5 px-4">Đánh giá</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredCourts.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4">
                      <img
                        src={c.images[0] || 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=100'}
                        alt=""
                        className="w-12 h-10 rounded-lg object-cover bg-slate-100"
                      />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">{c.name}</span>
                      <span className="text-[11px] text-slate-400 truncate max-w-xs block">
                        {c.address}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 uppercase font-semibold text-brand-600">{c.type}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {c.pricePerHour.toLocaleString('vi-VN')} đ
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">
                      {c.openingTime} - {c.closingTime}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-amber-500">
                      ★ {c.ratingAvg?.toFixed(1)} ({c.totalReviews})
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleStatus(c._id, c.status)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-all ${
                          c.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : c.status === 'maintenance'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {c.status === 'active' ? 'Hoạt động' : c.status === 'maintenance' ? 'Bảo trì' : 'Tạm dừng'}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(c)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-brand-600"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600"
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

      {/* Modal: Create & Edit Court */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {editingCourt ? 'Chỉnh sửa sân thể thao' : 'Thêm sân thể thao mới'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên sân</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Môn thể thao</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold"
                  >
                    <option value="football">Bóng đá</option>
                    <option value="badminton">Cầu lông</option>
                    <option value="tennis">Tennis</option>
                    <option value="pickleball">Pickleball</option>
                    <option value="basketball">Bóng rổ</option>
                    <option value="volleyball">Bóng chuyền</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Giá thuê / giờ (VNĐ)</label>
                  <input
                    type="number"
                    value={formData.pricePerHour}
                    onChange={(e) => setFormData({ ...formData, pricePerHour: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Địa chỉ</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Giờ mở cửa</label>
                  <input
                    type="time"
                    value={formData.openingTime}
                    onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Giờ đóng cửa</label>
                  <input
                    type="time"
                    value={formData.closingTime}
                    onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Hình ảnh (ngăn cách bằng dấu phẩy)</label>
                <input
                  type="text"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mô tả sân</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  {submitting ? 'Đang lưu...' : 'Lưu Sân Thể Thao'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
