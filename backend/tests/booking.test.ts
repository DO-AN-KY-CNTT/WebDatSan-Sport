import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/server';
import { User } from '../src/models/User';
import { Court } from '../src/models/Court';
import { Booking } from '../src/models/Booking';
import { ENV } from '../src/config/env';
import { signToken } from '../src/utils/jwt';

describe('Booking API & Anti-Collision Integration Tests', () => {
  let customerToken = '';
  let customerId = '';
  let courtId = '';

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(ENV.MONGODB_URI);
    }

    // Tạo test customer
    const user = await User.create({
      email: 'customer_booking_test@sportbooking.com',
      password: 'password123',
      fullName: 'Khách hàng Test Đặt Sân',
      phone: '0912345678',
      role: 'customer',
    });
    customerId = user._id.toString();
    customerToken = signToken({
      userId: customerId,
      role: 'customer',
      email: user.email,
    });

    // Tạo test court
    const court = await Court.create({
      name: 'Sân Bóng Đá Test 1',
      type: 'football',
      address: '123 Đường Test, Quận 1',
      pricePerHour: 200000,
      openingTime: '06:00',
      closingTime: '23:00',
      status: 'active',
    });
    courtId = court._id.toString();
  });

  afterAll(async () => {
    await Booking.deleteMany({ court: courtId });
    await Court.findByIdAndDelete(courtId);
    await User.findByIdAndDelete(customerId);
    await mongoose.connection.close();
  });

  const testDate = '2026-10-15';
  let createdBookingId = '';

  it('1. Đặt sân thành công khung giờ 08:00 - 10:00 (201)', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        courtId,
        date: testDate,
        startTime: '08:00',
        endTime: '10:00',
        paymentMethod: 'banking',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.totalPrice).toBe(400000); // 2 hours * 200,000
    expect(res.body.data.status).toBe('confirmed');
    createdBookingId = res.body.data._id;
  });

  it('2. CHỐNG TRÙNG LỊCH: Đặt sân trùng khung giờ (09:00 - 11:00) bị chặn với 409 Conflict', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        courtId,
        date: testDate,
        startTime: '09:00',
        endTime: '11:00',
        paymentMethod: 'banking',
      });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('đã có khách hàng đặt');
  });

  it('3. CHỐNG TRÙNG LỊCH: Đặt sân nằm trọn bên trong khung giờ đã đặt (08:30 - 09:30) bị chặn với 409 Conflict', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        courtId,
        date: testDate,
        startTime: '08:30',
        endTime: '09:30',
        paymentMethod: 'banking',
      });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it('4. Đặt sân liền kề không giao nhau (10:00 - 12:00) thành công (201)', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        courtId,
        date: testDate,
        startTime: '10:00',
        endTime: '12:00',
        paymentMethod: 'banking',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('5. Lấy danh sách khung giờ đã bận của sân trong ngày (200)', async () => {
    const res = await request(app)
      .get(`/api/bookings/court/${courtId}/slots?date=${testDate}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(2);
  });

  it('6. Khách hàng xem danh sách booking của mình (200)', async () => {
    const res = await request(app)
      .get('/api/bookings/my')
      .set('Authorization', `Bearer ${customerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(2);
  });

  it('7. Hủy đơn đặt sân thành công (200)', async () => {
    const res = await request(app)
      .put(`/api/bookings/${createdBookingId}/cancel`)
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ cancelReason: 'Bận việc đột xuất không tham gia được' });

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('cancelled');
    expect(res.body.data.paymentStatus).toBe('refunded');
  });
});
