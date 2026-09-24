import { User } from '../models/User';
import { Employee } from '../models/Employee';
import { Court } from '../models/Court';
import { Booking } from '../models/Booking';
import { Attendance } from '../models/Attendance';
import { LeaveRequest } from '../models/LeaveRequest';
import { Payroll } from '../models/Payroll';

export class ReportService {
  static async getDashboardOverview() {
    const todayStr = new Date().toISOString().split('T')[0];
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const monthStr = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;
    const monthPrefix = `${currentYear}-${monthStr}`;

    const [
      totalUsers,
      totalEmployees,
      totalCourts,
      totalBookings,
      allCompletedBookings,
      todayBookingsCount,
      todayAttendances,
      pendingLeavesCount,
      courtsList,
    ] = await Promise.all([
      User.countDocuments({ role: 'customer' }),
      Employee.countDocuments({ status: 'active' }),
      Court.countDocuments(),
      Booking.countDocuments(),
      Booking.find({ status: { $in: ['confirmed', 'completed'] } }).select('totalPrice date court'),
      Booking.countDocuments({ date: todayStr }),
      Attendance.find({ date: todayStr }),
      LeaveRequest.countDocuments({ status: 'pending' }),
      Court.find().select('type'),
    ]);

    // Doanh thu tổng & doanh thu tháng này
    let totalRevenue = 0;
    let thisMonthRevenue = 0;

    allCompletedBookings.forEach((b) => {
      totalRevenue += b.totalPrice || 0;
      if (b.date && b.date.startsWith(monthPrefix)) {
        thisMonthRevenue += b.totalPrice || 0;
      }
    });

    // Thống kê nhân sự hôm nay
    const workingToday = todayAttendances.filter((a) => a.checkIn).length;
    const lateToday = todayAttendances.filter((a) => a.status === 'late').length;

    // Doanh thu và booking theo 6 tháng gần nhất
    const monthlyStats: Array<{
      month: string;
      revenue: number;
      bookings: number;
    }> = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const m = d.getMonth() + 1;
      const y = d.getFullYear();
      const mPrefix = `${y}-${m < 10 ? '0' + m : m}`;
      const label = `T${m}/${y}`;

      const matched = allCompletedBookings.filter((b) => b.date && b.date.startsWith(mPrefix));
      const rev = matched.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

      monthlyStats.push({
        month: label,
        revenue: rev,
        bookings: matched.length,
      });
    }

    // Booking theo loại sân
    const typeCounts: Record<string, number> = {
      football: 0,
      badminton: 0,
      tennis: 0,
      basketball: 0,
      pickleball: 0,
      volleyball: 0,
    };

    const courtTypeMap = new Map<string, string>();
    courtsList.forEach((c) => courtTypeMap.set(c._id.toString(), c.type));

    allCompletedBookings.forEach((b) => {
      const type = courtTypeMap.get(b.court?.toString() || '');
      if (type && typeCounts[type] !== undefined) {
        typeCounts[type] += 1;
      }
    });

    const bookingsByCourtType = Object.entries(typeCounts).map(([type, count]) => ({
      type,
      name:
        type === 'football'
          ? 'Bóng đá'
          : type === 'badminton'
          ? 'Cầu lông'
          : type === 'tennis'
          ? 'Quần vợt'
          : type === 'basketball'
          ? 'Bóng rổ'
          : type === 'pickleball'
          ? 'Pickleball'
          : 'Bóng chuyền',
      count,
    }));

    // Phân bố nhân sự theo bộ phận
    const employees = await Employee.find({ status: 'active' }).select('department');
    const deptMap: Record<string, number> = {};
    employees.forEach((e) => {
      const dept = e.department || 'Vận hành';
      deptMap[dept] = (deptMap[dept] || 0) + 1;
    });

    const employeesByDepartment = Object.entries(deptMap).map(([department, count]) => ({
      department,
      count,
    }));

    return {
      kpi: {
        totalUsers,
        totalEmployees,
        totalCourts,
        totalBookings,
        totalRevenue,
        thisMonthRevenue,
        todayBookings: todayBookingsCount,
        staffWorkingToday: workingToday,
        staffLateToday: lateToday,
        pendingLeaves: pendingLeavesCount,
      },
      charts: {
        monthlyStats,
        bookingsByCourtType,
        employeesByDepartment,
      },
    };
  }
}
