import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/server';
import { User } from '../src/models/User';
import { Employee } from '../src/models/Employee';
import { Shift } from '../src/models/Shift';
import { WorkSchedule } from '../src/models/WorkSchedule';
import { Attendance } from '../src/models/Attendance';
import { AttendanceLog } from '../src/models/AttendanceLog';
import { ENV } from '../src/config/env';
import { signToken } from '../src/utils/jwt';

describe('Attendance & Work Schedule Integration Tests', () => {
  let staffToken = '';
  let adminToken = '';
  let employeeDoc: any;
  let shiftDoc: any;
  let scheduleDoc: any;
  let attendanceId = '';

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(ENV.MONGODB_URI);
    }

    // 1. Tạo Staff User & Employee
    const staffUser = await User.create({
      email: 'staff_att_test@sportbooking.com',
      password: 'password123',
      fullName: 'Nhân Viên Chấm Công Test',
      phone: '0933333333',
      role: 'staff',
    });

    staffToken = signToken({
      userId: staffUser._id.toString(),
      role: 'staff',
      email: staffUser.email,
    });

    employeeDoc = await Employee.create({
      user: staffUser._id,
      employeeCode: 'NVTEST99',
      fullName: 'Nhân Viên Chấm Công Test',
      email: staffUser.email,
      phone: staffUser.phone,
      position: 'field_staff',
      department: 'Vận hành sân',
      salary: 9000000,
      status: 'active',
    });

    // 2. Tạo Admin User
    const adminUser = await User.create({
      email: 'admin_att_test@sportbooking.com',
      password: 'password123',
      fullName: 'Quản Trị Viên Test',
      phone: '0988888889',
      role: 'admin',
    });

    adminToken = signToken({
      userId: adminUser._id.toString(),
      role: 'admin',
      email: adminUser.email,
    });

    // 3. Tạo Shift
    shiftDoc = await Shift.create({
      name: 'Ca Sáng Test',
      startTime: '08:00',
      endTime: '17:00',
      breakStart: '12:00',
      breakEnd: '13:00',
      gracePeriod: 15,
      status: 'active',
    });

    // 4. Tạo WorkSchedule
    scheduleDoc = await WorkSchedule.create({
      employee: employeeDoc._id,
      shift: shiftDoc._id,
      date: '2026-10-20',
      status: 'scheduled',
      createdBy: adminUser._id,
    });
  });

  afterAll(async () => {
    await AttendanceLog.deleteMany({ attendance: attendanceId });
    if (attendanceId) await Attendance.findByIdAndDelete(attendanceId);
    if (scheduleDoc) await WorkSchedule.findByIdAndDelete(scheduleDoc._id);
    if (shiftDoc) await Shift.findByIdAndDelete(shiftDoc._id);
    if (employeeDoc) await Employee.findByIdAndDelete(employeeDoc._id);
    await User.deleteMany({ email: /.*_att_test@sportbooking\.com/ });
    await mongoose.connection.close();
  });

  it('1. Chấm công ra khi chưa chấm công vào bị chặn (400)', async () => {
    const fakeAttId = new mongoose.Types.ObjectId().toString();
    const res = await request(app)
      .post('/api/attendance/check-out')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({ attendanceId: fakeAttId });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('2. Chấm công vào (Check-in) thành công (201)', async () => {
    const res = await request(app)
      .post('/api/attendance/check-in')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({
        workScheduleId: scheduleDoc._id.toString(),
        note: 'Đến đúng giờ',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.checkIn).toBeDefined();
    attendanceId = res.body.data._id;
  });

  it('3. CHỐNG CHECK-IN NHIỀU LẦN: Chấm công vào lần thứ 2 cho cùng ca bị chặn (400)', async () => {
    const res = await request(app)
      .post('/api/attendance/check-in')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({
        workScheduleId: scheduleDoc._id.toString(),
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('đã chấm công vào');
  });

  it('4. Chấm công ra (Check-out) thành công và tự động tính workHours (200)', async () => {
    const res = await request(app)
      .post('/api/attendance/check-out')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({
        attendanceId,
        note: 'Kết thúc ca làm tốt đẹp',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.checkOut).toBeDefined();
    expect(res.body.data.workHours).toBeDefined();
  });

  it('5. CHỐNG CHECK-OUT NHIỀU LẦN: Chấm công ra lần 2 bị chặn (400)', async () => {
    const res = await request(app)
      .post('/api/attendance/check-out')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({ attendanceId });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('đã chấm công ra');
  });

  it('6. Admin sửa chấm công bắt buộc có lý do và lưu vào Audit Log (200)', async () => {
    const res = await request(app)
      .put(`/api/attendance/${attendanceId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        status: 'present',
        reason: 'Xác nhận nhân viên có mặt đúng giờ, sửa lại trạng thái theo đơn giải trình',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    // Kiểm tra Audit Log được lưu
    const logRes = await request(app)
      .get(`/api/attendance/${attendanceId}/logs`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(logRes.status).toBe(200);
    expect(logRes.body.data.length).toBeGreaterThanOrEqual(1);
    expect(logRes.body.data[0].reason).toContain('sửa lại trạng thái');
  });
});
