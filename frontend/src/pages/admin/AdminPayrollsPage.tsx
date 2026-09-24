import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, Plus, Edit2, DollarSign, Calculator, CheckCircle2, X } from 'lucide-react';
import { api } from '../../services/api';
import { Payroll, Employee, ApiResponse } from '../../types';
import { useToast } from '../../components/common/Toast';

export const AdminPayrollsPage: React.FC = () => {
  const { showToast } = useToast();
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  // Month & Year Filter
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  // Calculate Modal
  const [calcModalOpen, setCalcModalOpen] = useState(false);
  const [calcEmployeeId, setCalcEmployeeId] = useState('');
  const [calcAllowance, setCalcAllowance] = useState(500000);
  const [calcOvertime, setCalcOvertime] = useState(0);
  const [calcDeduction, setCalcDeduction] = useState(0);
  const [calculating, setCalculating] = useState(false);

  // Edit Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingPayroll, setEditingPayroll] = useState<Payroll | null>(null);
  const [editAllowance, setEditAllowance] = useState(0);
  const [editOvertime, setEditOvertime] = useState(0);
  const [editDeduction, setEditDeduction] = useState(0);
  const [editStatus, setEditStatus] = useState<any>('draft');
  const [submittingEdit, setSubmittingEdit] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [payRes, empRes] = await Promise.all([
        api.get<ApiResponse<Payroll[]>>(`/payrolls?month=${selectedMonth}&year=${selectedYear}`),
        api.get<ApiResponse<{ employees: Employee[] }>>('/employees?limit=100'),
      ]);

      if (payRes.data.success) setPayrolls(payRes.data.data);
      if (empRes.data.success) {
        setEmployees(empRes.data.data.employees);
        if (empRes.data.data.employees.length > 0) {
          setCalcEmployeeId(empRes.data.data.employees[0]._id);
        }
      }
    } catch (err) {
      console.error('Error fetching payrolls:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear]);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCalculating(true);
    try {
      const res = await api.post('/payrolls', {
        employeeId: calcEmployeeId,
        month: selectedMonth,
        year: selectedYear,
        allowance: Number(calcAllowance),
        overtimePay: Number(calcOvertime),
        deduction: Number(calcDeduction),
      });

      if (res.data.success) {
        showToast('Tính toán bảng lương thành công!', 'success');
        setCalcModalOpen(false);
        fetchData();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Tính lương thất bại', 'error');
    } finally {
      setCalculating(false);
    }
  };

  const openEditModal = (p: Payroll) => {
    setEditingPayroll(p);
    setEditAllowance(p.allowance);
    setEditOvertime(p.overtimePay);
    setEditDeduction(p.deduction);
    setEditStatus(p.status);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPayroll) return;
    setSubmittingEdit(true);
    try {
      const res = await api.put(`/payrolls/${editingPayroll._id}`, {
        allowance: Number(editAllowance),
        overtimePay: Number(editOvertime),
        deduction: Number(editDeduction),
        status: editStatus,
      });

      if (res.data.success) {
        showToast('Cập nhật bảng lương thành công!', 'success');
        setEditModalOpen(false);
        fetchData();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Cập nhật thất bại', 'error');
    } finally {
      setSubmittingEdit(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Quản lý Bảng Lương Nhân Sự
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tính toán lương tự động dựa trên ngày công chấm công thực tế, phụ cấp và khấu trừ.
          </p>
        </div>

        <button
          onClick={() => setCalcModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center space-x-2 shadow-md shadow-brand-600/30"
        >
          <Calculator className="w-4 h-4" />
          <span>Tính Lương Nhân Viên</span>
        </button>
      </div>

      {/* Month Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
        <span className="text-xs font-bold text-slate-700">Kỳ lương:</span>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>
              Tháng {m}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800"
        >
          <option value={2026}>Năm 2026</option>
          <option value={2025}>Năm 2025</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Đang tải bảng lương...</div>
        ) : payrolls.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            Chưa có bảng lương cho tháng {selectedMonth}/{selectedYear}. Hãy bấm "Tính Lương Nhân Viên" để tạo mới!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Nhân viên</th>
                  <th className="py-3.5 px-4">Lương cơ bản</th>
                  <th className="py-3.5 px-4">Số công</th>
                  <th className="py-3.5 px-4">Giờ làm</th>
                  <th className="py-3.5 px-4">Phụ cấp</th>
                  <th className="py-3.5 px-4">Tăng ca</th>
                  <th className="py-3.5 px-4">Khấu trừ</th>
                  <th className="py-3.5 px-4">Thực nhận</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4 text-right">Sửa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {payrolls.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">{p.employee?.fullName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {p.employee?.employeeCode} • {p.employee?.department}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                      {p.baseSalary.toLocaleString('vi-VN')} đ
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600">{p.totalWorkDays} ngày</td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{p.totalWorkHours}h</td>
                    <td className="py-3.5 px-4 text-slate-700">
                      +{p.allowance.toLocaleString('vi-VN')} đ
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      +{p.overtimePay.toLocaleString('vi-VN')} đ
                    </td>
                    <td className="py-3.5 px-4 text-rose-600">
                      -{p.deduction.toLocaleString('vi-VN')} đ
                    </td>
                    <td className="py-3.5 px-4 font-black text-brand-600 text-sm">
                      {p.totalSalary.toLocaleString('vi-VN')} đ
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          p.status === 'paid'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : p.status === 'approved'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {p.status === 'paid' ? 'Đã thanh toán' : p.status === 'approved' ? 'Đã duyệt' : 'Dự thảo'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-50"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Calculate Modal */}
      {calcModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                Tính lương tháng {selectedMonth}/{selectedYear}
              </h3>
              <button onClick={() => setCalcModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCalculate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Chọn nhân viên</label>
                <select
                  value={calcEmployeeId}
                  onChange={(e) => setCalcEmployeeId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold"
                  required
                >
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeCode} - {emp.fullName} ({emp.salary.toLocaleString('vi-VN')} đ)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phụ cấp (VNĐ)</label>
                <input
                  type="number"
                  value={calcAllowance}
                  onChange={(e) => setCalcAllowance(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tiền tăng ca (VNĐ)</label>
                <input
                  type="number"
                  value={calcOvertime}
                  onChange={(e) => setCalcOvertime(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Khấu trừ (VNĐ)</label>
                <input
                  type="number"
                  value={calcDeduction}
                  onChange={(e) => setCalcDeduction(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCalcModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={calculating}
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-600/30"
                >
                  {calculating ? 'Đang tính...' : 'Tính Lương Tự Động'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Payroll Modal */}
      {editModalOpen && editingPayroll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                Cập nhật lương ({editingPayroll.employee?.fullName})
              </h3>
              <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Phụ cấp (VNĐ)</label>
                <input
                  type="number"
                  value={editAllowance}
                  onChange={(e) => setEditAllowance(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tiền tăng ca (VNĐ)</label>
                <input
                  type="number"
                  value={editOvertime}
                  onChange={(e) => setEditOvertime(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Khấu trừ (VNĐ)</label>
                <input
                  type="number"
                  value={editDeduction}
                  onChange={(e) => setEditDeduction(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Trạng thái chi trả</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold"
                >
                  <option value="draft">Dự thảo (draft)</option>
                  <option value="approved">Đã duyệt (approved)</option>
                  <option value="paid">Đã thanh toán (paid)</option>
                </select>
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
                  {submittingEdit ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
