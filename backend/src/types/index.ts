export type UserRole = 'admin' | 'manager' | 'staff' | 'customer';

export type CourtType = 'football' | 'badminton' | 'tennis' | 'basketball' | 'pickleball' | 'volleyball';

export type CourtStatus = 'active' | 'inactive' | 'maintenance';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';

export type PaymentMethod = 'cash' | 'banking' | 'vnpay_simulated';

export type EmployeePosition =
  | 'manager'
  | 'receptionist'
  | 'field_staff'
  | 'cashier'
  | 'security'
  | 'cleaner'
  | 'other';

export type EmployeeStatus = 'active' | 'inactive' | 'on_leave' | 'terminated';

export type ShiftStatus = 'active' | 'inactive';

export type ScheduleStatus = 'scheduled' | 'completed' | 'cancelled';

export type AttendanceStatus =
  | 'present'
  | 'late'
  | 'absent'
  | 'leave'
  | 'half_day'
  | 'holiday';

export type AttendanceAuditAction =
  | 'check_in'
  | 'check_out'
  | 'manual_update'
  | 'admin_override';

export type LeaveType =
  | 'annual_leave'
  | 'sick_leave'
  | 'personal_leave'
  | 'unpaid_leave'
  | 'other';

export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export type PayrollStatus = 'draft' | 'approved' | 'paid';
