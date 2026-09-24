import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/server';
import { User } from '../src/models/User';
import { ENV } from '../src/config/env';

describe('Auth API Integration Tests', () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(ENV.MONGODB_URI);
    }
    await User.deleteMany({ email: /test.*@sportbooking\.com/i });
  });

  afterAll(async () => {
    await User.deleteMany({ email: /test.*@sportbooking\.com/i });
    await mongoose.connection.close();
  });

  const testUser = {
    email: 'test_customer_phase3@sportbooking.com',
    password: 'password123',
    fullName: 'Nguyễn Văn Test',
    phone: '0901234567',
  };

  let token = '';

  it('1. Đăng ký tài khoản customer mới thành công (201)', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(testUser.email);
    expect(res.body.data.user.role).toBe('customer');
    expect(res.body.data.token).toBeDefined();
  });

  it('2. Từ chối đăng ký nếu email đã tồn tại (400)', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('3. Đăng nhập thành công trả về JWT token (200)', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    token = res.body.data.token;
  });

  it('4. Đăng nhập thất bại với sai mật khẩu (401)', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: 'wrong_password',
    });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('5. Lấy thông tin cá nhân /api/auth/me với Bearer token (200)', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe(testUser.email);
  });

  it('6. Chặn truy cập nếu không có token (401)', async () => {
    const res = await request(app).get('/api/auth/me');

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('7. Cập nhật thông tin cá nhân thành công (200)', async () => {
    const res = await request(app)
      .put('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ fullName: 'Nguyễn Văn Test Updated', phone: '0988888888' });

    expect(res.status).toBe(200);
    expect(res.body.data.fullName).toBe('Nguyễn Văn Test Updated');
  });

  it('8. Đổi mật khẩu thành công (200)', async () => {
    const res = await request(app)
      .put('/api/auth/change-password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: testUser.password,
        newPassword: 'new_password_123',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    // Kiểm tra đăng nhập bằng mật khẩu mới
    const loginRes = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: 'new_password_123',
    });
    expect(loginRes.status).toBe(200);
  });
});
