import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Eye,
  Edit2,
  Lock,
  Unlock,
  Trash2,
  Search,
  Building2,
  X,
  Phone,
  Mail,
  Calendar,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { api } from '../../services/api';
import { Employee, ApiResponse } from '../../types';
import { useToast } from '../../components/common/Toast';

export const AdminEmployeesPage: React.FC = () => {
  const { showToast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');

  // Detail Modal
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedEmployeeDetail, setSelectedEmployeeDetail] = useState<any>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Create Modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeCode: '',
    fullName: '',
    email: '',
    phone: '',
    position: 'field_staff',
    department: 'Vận hành sân',
    salary: 9000000,
    createUserAccount: true,
    temporaryPassword: 'Staff@123456',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<{ employees: Employee[] }>>('/employees?limit=50');
      if (res.data.success) {
        setEmployees(res.data.data.employees);
      }
    } catch (err) {
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const openViewDetail = async (emp: Employee) => {
    setDetailModalOpen(true);
    setLoadingDetail(true);
    try {
      const res = await api.get<ApiResponse<any>>(`/employees/${emp._id}`);
      if (res.data.success) {
        setSelectedEmployeeDetail(res.data.data);
      }
    } catch (err: any) {
      showToast('Không thể tải chi tiết nhân viên', 'error');
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post<ApiResponse<any>>('/employees', {
        ...formData,
        salary: Number(formData.salary),
      });
      if (res.data.success) {
        showToast('Thêm nhân viên mới thành công!', 'success');
        setCreateModalOpen(false);
        fetchEmployees();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Thêm nhân viên thất bại', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (emp: Employee) => {
    const nextStatus = emp.status === 'active' ? 'inactive' : 'active';
    try {
      const res = await api.patch(`/employees/${emp._id}/status`, { status: nextStatus });
      if (res.data.success) {
        showToast(`Đã đổi trạng thái nhân viên thành ${nextStatus}`, 'success');
        fetchEmployees();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Đổi trạng thái thất bại', 'error');
    }
  };

  const filtered = employees.filter((e) => {
    const matchSearch =
      e.fullName.toLowerCase().includes(search.toLowerCase()) ||
      e.employeeCode.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'all' || e.department === deptFilter;
    return matchSearch && matchDept;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Quản lý Nhân sự & Hồ sơ
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Hồ sơ nhân viên, phân quyền tài khoản, cấp mật khẩu tạm và theo dõi ngày công.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center space-x-2 shadow-md shadow-brand-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Nhân Viên</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo mã NV, họ tên, email..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs pr-8"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
        </div>

        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700"
        >
          <option value="all">Tất cả bộ phận</option>
          <option value="Quản lý Điều hành">Quản lý Điều hành</option>
          <option value="Vận hành sân">Vận hành sân</option>
          <option value="Lễ tân">Lễ tân</option>
          <option value="Thu ngân">Thu ngân</option>
          <option value="An ninh & Trật tự">An ninh & Trật tự</option>
        </select>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Đang tải danh sách nhân viên...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">Không tìm thấy nhân viên nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Mã NV</th>
                  <th className="py-3.5 px-4">Nhân viên</th>
                  <th className="py-3.5 px-4">Liên hệ</th>
                  <th className="py-3.5 px-4">Vị trí</th>
                  <th className="py-3.5 px-4">Bộ phận</th>
                  <th className="py-3.5 px-4">Lương cơ bản</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((emp) => (
                  <tr key={emp._id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-600">
                      {emp.employeeCode}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={emp.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">{emp.fullName}</span>
                          <span className="text-[11px] text-slate-400 block">{emp.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{emp.phone}</td>
                    <td className="py-3.5 px-4 font-semibold capitalize text-slate-800">
                      {emp.position.replace(/_/g, ' ')}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{emp.department}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {emp.salary.toLocaleString('vi-VN')} đ
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          emp.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {emp.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => openViewDetail(emp)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-brand-600"
                        title="Xem chi tiết & Thống kê"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(emp)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          emp.status === 'active'
                            ? 'text-rose-500 hover:bg-rose-50'
                            : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                        title={emp.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa'}
                      >
                        {emp.status === 'active' ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Unlock className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Employee Detail & Stats Modal */}
      {detailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Chi tiết nhân sự & Hiệu suất</h3>
              <button onClick={() => setDetailModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {loadingDetail || !selectedEmployeeDetail ? (
              <div className="p-8 text-center text-xs text-slate-400">Đang tải dữ liệu...</div>
            ) : (
              <div className="space-y-5 text-xs">
                {/* Profile Header */}
                <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <img
                    src={selectedEmployeeDetail.employee?.avatar}
                    alt=""
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-500"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-extrabold text-base text-slate-900">
                        {selectedEmployeeDetail.employee?.fullName}
                      </h4>
                      <span className="font-mono text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                        {selectedEmployeeDetail.employee?.employeeCode}
                      </span>
                    </div>
                    <p className="text-slate-500">{selectedEmployeeDetail.employee?.position} • {selectedEmployeeDetail.employee?.department}</p>
                    <p className="text-slate-400 mt-1">{selectedEmployeeDetail.employee?.email} | {selectedEmployeeDetail.employee?.phone}</p>
                  </div>
                </div>

                {/* Performance Stats Cards */}
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Thống kê ngày công & Chuyên cần</h4>
                  <div className="grid grid-cols-4 gap-3 text-center">
                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                      <span className="text-[10px] text-emerald-700 block font-semibold">Tổng ngày làm</span>
                      <span className="text-lg font-black text-emerald-800">
                        {selectedEmployeeDetail.stats?.totalWorkDays || 0}
                      </span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                      <span className="text-[10px] text-blue-700 block font-semibold">Tổng giờ làm</span>
                      <span className="text-lg font-black text-blue-800">
                        {selectedEmployeeDetail.stats?.totalWorkHours || 0}h
                      </span>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                      <span className="text-[10px] text-amber-700 block font-semibold">Đi muộn</span>
                      <span className="text-lg font-black text-amber-800">
                        {selectedEmployeeDetail.stats?.lateDays || 0}
                      </span>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-xl border border-purple-200">
                      <span className="text-[10px] text-purple-700 block font-semibold">Nghỉ phép duyệt</span>
                      <span className="text-lg font-black text-purple-800">
                        {selectedEmployeeDetail.stats?.approvedLeaveDays || 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recent Attendances */}
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Lịch sử chấm công gần đây</h4>
                  <div className="max-h-40 overflow-y-auto border border-slate-100 rounded-xl divide-y divide-slate-100">
                    {(selectedEmployeeDetail.recentAttendances || []).map((att: any) => (
                      <div key={att._id} className="p-2.5 flex justify-between items-center text-slate-600">
                        <span className="font-bold text-slate-900">{att.date}</span>
                        <span>Vào: {att.checkIn ? new Date(att.checkIn).toLocaleTimeString('vi-VN') : '--'}</span>
                        <span>Ra: {att.checkOut ? new Date(att.checkOut).toLocaleTimeString('vi-VN') : '--'}</span>
                        <span className={`font-bold ${att.status === 'late' ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {att.status === 'late' ? 'Đi muộn' : 'Đúng giờ'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Create Employee */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Thêm hồ sơ nhân viên mới</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mã nhân viên (VD: NV010)</label>
                  <input
                    type="text"
                    value={formData.employeeCode}
                    onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 uppercase font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Họ và tên</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Vị trí</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold"
                  >
                    <option value="field_staff">Nhân viên sân (field_staff)</option>
                    <option value="receptionist">Lễ tân (receptionist)</option>
                    <option value="cashier">Thu ngân (cashier)</option>
                    <option value="security">An ninh (security)</option>
                    <option value="manager">Quản lý (manager)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bộ phận</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mức lương cơ bản (VNĐ/tháng)</label>
                <input
                  type="number"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  required
                />
              </div>

              <div className="p-3 bg-brand-50 rounded-xl border border-brand-200 space-y-2">
                <label className="flex items-center space-x-2 font-bold text-brand-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.createUserAccount}
                    onChange={(e) => setFormData({ ...formData, createUserAccount: e.target.checked })}
                    className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                  />
                  <span>Tự động cấp tài khoản đăng nhập cho nhân viên</span>
                </label>
                {formData.createUserAccount && (
                  <div>
                    <label className="block text-[11px] text-brand-700 font-semibold mb-1">
                      Mật khẩu tạm thời (nhân viên đổi ở lần đầu đăng nhập)
                    </label>
                    <input
                      type="text"
                      value={formData.temporaryPassword}
                      onChange={(e) => setFormData({ ...formData, temporaryPassword: e.target.value })}
                      className="w-full bg-white border border-brand-300 rounded-lg p-2 font-mono text-xs"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-600/30"
                >
                  {submitting ? 'Đang thêm...' : 'Tạo Nhân Viên Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
