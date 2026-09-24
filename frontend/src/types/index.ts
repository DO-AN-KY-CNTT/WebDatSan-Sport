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

export type LeaveType =
  | 'annual_leave'
  | 'sick_leave'
  | 'personal_leave'
  | 'unpaid_leave'
  | 'other';

export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export type PayrollStatus = 'draft' | 'approved' | 'paid';

export interface User {
  _id: string;
  email: string;
  fullName: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  mustChangePassword?: boolean;
  createdAt?: string;
}

export interface Court {
  _id: string;
  name: string;
  type: CourtType;
  description: string;
  address: string;
  location: {
    city: string;
    district: string;
  };
  images: string[];
  pricePerHour: number;
  amenities: string[];
  openingTime: string;
  closingTime: string;
  status: CourtStatus;
  ratingAvg: number;
  totalReviews: number;
  createdAt?: string;
}

export interface Booking {
  _id: string;
  bookingCode: string;
  user: User | string;
  court: Court;
  date: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  pricePerHour: number;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  notes?: string;
  cancelReason?: string;
  createdAt?: string;
}

export interface Review {
  _id: string;
  user: User;
  court: Court | string;
  booking: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Employee {
  _id: string;
  user?: User;
  employeeCode: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth?: string;
  gender: 'male' | 'female' | 'other';
  address?: string;
  position: EmployeePosition;
  department: string;
  salary: number;
  hireDate: string;
  status: EmployeeStatus;
  createdAt?: string;
}

export interface Shift {
  _id: string;
  name: string;
  startTime: string;
  endTime: string;
  breakStart?: string;
  breakEnd?: string;
  gracePeriod: number;
  status: ShiftStatus;
}

export interface WorkSchedule {
  _id: string;
  employee: Employee;
  shift: Shift;
  court?: Court;
  date: string;
  status: ScheduleStatus;
  note?: string;
  createdBy?: User;
}

export interface Attendance {
  _id: string;
  employee: Employee;
  workSchedule: WorkSchedule;
  date: string;
  checkIn?: string;
  checkOut?: string;
  workHours: number;
  status: AttendanceStatus;
  note?: string;
  qrVerified: boolean;
  createdAt?: string;
}

export interface AttendanceLog {
  _id: string;
  attendance: string;
  action: string;
  oldValue?: any;
  newValue?: any;
  performedBy: User;
  reason: string;
  createdAt: string;
}

export interface LeaveRequest {
  _id: string;
  employee: Employee;
  startDate: string;
  endDate: string;
  type: LeaveType;
  reason: string;
  status: LeaveStatus;
  approvedBy?: User;
  approvedAt?: string;
  responseNote?: string;
  createdAt?: string;
}

export interface Payroll {
  _id: string;
  employee: Employee;
  month: number;
  year: number;
  baseSalary: number;
  totalWorkDays: number;
  totalWorkHours: number;
  allowance: number;
  overtimePay: number;
  deduction: number;
  totalSalary: number;
  status: PayrollStatus;
  notes?: string;
  createdAt?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  error?: any;
}
