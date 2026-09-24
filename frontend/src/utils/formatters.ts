import type {
  AttendanceStatus,
  BookingStatus,
  CourtType,
  LeaveStatus,
  PaymentStatus,
} from '../types';

const safeDate = (value: string | Date | null | undefined) => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const formatVnd = (value: number | null | undefined): string =>
  `${Number(value || 0).toLocaleString('vi-VN')} đ`;

export const formatDateVi = (value: string | null | undefined): string => {
  const date = safeDate(value);
  return date ? date.toLocaleDateString('vi-VN') : '—';
};

export const formatDateTimeVi = (value: string | null | undefined): string => {
  const date = safeDate(value);
  return date ? date.toLocaleString('vi-VN') : '—';
};

export const formatTimeVi = (value: string | Date | null | undefined): string => {
  const date = safeDate(value);
  return date ? date.toLocaleTimeString('vi-VN') : '—';
};

export const formatCourtType = (type: CourtType | string | null | undefined): string => {
  const labels: Record<string, string> = {
    football: 'Bóng đá',
    badminton: 'Cầu lông',
    tennis: 'Tennis',
    basketball: 'Bóng rổ',
    pickleball: 'Pickleball',
    volleyball: 'Bóng chuyền',
  };
  return labels[type || ''] || String(type || 'Khác');
};

export const formatBookingStatus = (status: BookingStatus | string | null | undefined): string => {
  const labels: Record<string, string> = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy',
  };
  return labels[status || ''] || 'Không xác định';
};

export const formatPaymentStatus = (status: PaymentStatus | string | null | undefined): string => {
  const labels: Record<string, string> = {
    unpaid: 'Chưa thu',
    paid: 'Đã thu',
    refunded: 'Đã hoàn',
  };
  return labels[status || ''] || 'Không xác định';
};

export const formatAttendanceStatus = (status: AttendanceStatus | string | null | undefined): string => {
  const labels: Record<string, string> = {
    present: 'Đúng giờ',
    late: 'Đi muộn',
    absent: 'Vắng mặt',
    leave: 'Nghỉ phép',
    half_day: 'Nửa ngày',
    holiday: 'Ngày lễ',
  };
  return labels[status || ''] || 'Không xác định';
};

export const formatLeaveStatus = (status: LeaveStatus | string | null | undefined): string => {
  const labels: Record<string, string> = {
    pending: 'Chờ duyệt',
    approved: 'Đã duyệt',
    rejected: 'Bị từ chối',
    cancelled: 'Đã hủy',
  };
  return labels[status || ''] || 'Không xác định';
};
