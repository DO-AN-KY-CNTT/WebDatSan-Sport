import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { ENV } from '../src/config/env';
import {
  User,
  Employee,
  Court,
  Booking,
  Review,
  Shift,
  WorkSchedule,
  Attendance,
  AttendanceLog,
  LeaveRequest,
  Payroll,
} from '../src/models';

const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(ENV.MONGODB_URI);
    console.log('[Seed] Connected. Dropping existing collections...');

    // Clear existing collections
    await Promise.all([
      User.deleteMany({}),
      Employee.deleteMany({}),
      Court.deleteMany({}),
      Booking.deleteMany({}),
      Review.deleteMany({}),
      Shift.deleteMany({}),
      WorkSchedule.deleteMany({}),
      Attendance.deleteMany({}),
      AttendanceLog.deleteMany({}),
      LeaveRequest.deleteMany({}),
      Payroll.deleteMany({}),
    ]);

    const defaultPassword = 'password123'; // Demo password cho tất cả tài khoản
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(defaultPassword, salt);

    console.log('[Seed] 1. Creating Users & Roles (Admin, Managers, Staff, Customers)...');

    // 1. Admin
    const adminUser = await User.create({
      email: 'admin@sportbooking.com',
      password: defaultPassword,
      fullName: 'Trần Văn Hoàng (Admin)',
      phone: '0909123456',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      role: 'admin',
      isActive: true,
    });

    // 2. Managers
    const manager1 = await User.create({
      email: 'manager@sportbooking.com',
      password: defaultPassword,
      fullName: 'Lê Minh Tuấn (Manager 1)',
      phone: '0908234567',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
      role: 'manager',
      isActive: true,
    });

    const manager2 = await User.create({
      email: 'manager2@sportbooking.com',
      password: defaultPassword,
      fullName: 'Phạm Hồng Nhung (Manager 2)',
      phone: '0908765432',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      role: 'manager',
      isActive: true,
    });

    // 3. Staff Users
    const staffUser1 = await User.create({
      email: 'staff@sportbooking.com',
      password: defaultPassword,
      fullName: 'Nguyễn Văn An (Staff)',
      phone: '0912345001',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      role: 'staff',
      isActive: true,
    });

    const staffUser2 = await User.create({
      email: 'staff2@sportbooking.com',
      password: defaultPassword,
      fullName: 'Đỗ Thị Bích',
      phone: '0912345002',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      role: 'staff',
      isActive: true,
    });

    const staffUser3 = await User.create({
      email: 'staff3@sportbooking.com',
      password: defaultPassword,
      fullName: 'Vũ Đức Cường',
      phone: '0912345003',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      role: 'staff',
      isActive: true,
    });

    const staffUser4 = await User.create({
      email: 'staff4@sportbooking.com',
      password: defaultPassword,
      fullName: 'Hoàng Thị Dung',
      phone: '0912345004',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      role: 'staff',
      isActive: true,
    });

    const staffUser5 = await User.create({
      email: 'staff5@sportbooking.com',
      password: defaultPassword,
      fullName: 'Trịnh Quốc Em',
      phone: '0912345005',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
      role: 'staff',
      isActive: true,
    });

    // 4. Customers (10 khách hàng)
    const customerUsers = [];
    const customerNames = [
      'Nguyễn Văn Customer (Demo)',
      'Phan Thanh Tùng',
      'Đặng Thu Thảo',
      'Trần Đình Trọng',
      'Nguyễn Quang Hải',
      'Bùi Tiến Dũng',
      'Đỗ Hùng Dũng',
      'Nguyễn Hoàng Đức',
      'Vũ Văn Thanh',
      'Nguyễn Tiến Linh',
    ];

    for (let i = 0; i < customerNames.length; i++) {
      const email = i === 0 ? 'customer@sportbooking.com' : `customer${i + 1}@sportbooking.com`;
      const cust = await User.create({
        email,
        password: defaultPassword,
        fullName: customerNames[i],
        phone: `097700000${i}`,
        avatar: `https://images.unsplash.com/photo-${1534528741775 + i * 1000}-53994a69daeb?w=150`,
        role: 'customer',
        isActive: true,
      });
      customerUsers.push(cust);
    }

    console.log('[Seed] 2. Creating Employees linked with profiles...');
    // Create Employee profiles
    const employees = await Employee.create([
      {
        user: manager1._id,
        employeeCode: 'QL001',
        fullName: manager1.fullName,
        email: manager1.email,
        phone: manager1.phone,
        avatar: manager1.avatar,
        dateOfBirth: new Date('1988-04-15'),
        gender: 'male',
        address: '128 Điện Biên Phủ, Quận 3, TP.HCM',
        position: 'manager',
        department: 'Quản lý Điều hành',
        salary: 22000000,
        hireDate: new Date('2023-01-10'),
        status: 'active',
      },
      {
        user: manager2._id,
        employeeCode: 'QL002',
        fullName: manager2.fullName,
        email: manager2.email,
        phone: manager2.phone,
        avatar: manager2.avatar,
        dateOfBirth: new Date('1990-09-22'),
        gender: 'female',
        address: '45 Lê Duẩn, Quận 1, TP.HCM',
        position: 'manager',
        department: 'Chăm sóc Khách hàng & Dịch vụ',
        salary: 20000000,
        hireDate: new Date('2023-03-01'),
        status: 'active',
      },
      {
        user: staffUser1._id,
        employeeCode: 'NV001',
        fullName: staffUser1.fullName,
        email: staffUser1.email,
        phone: staffUser1.phone,
        avatar: staffUser1.avatar,
        dateOfBirth: new Date('1996-08-12'),
        gender: 'male',
        address: '25 Nguyễn Trãi, Quận 5, TP.HCM',
        position: 'field_staff',
        department: 'Vận hành sân',
        salary: 9500000,
        hireDate: new Date('2024-02-15'),
        status: 'active',
      },
      {
        user: staffUser2._id,
        employeeCode: 'NV002',
        fullName: staffUser2.fullName,
        email: staffUser2.email,
        phone: staffUser2.phone,
        avatar: staffUser2.avatar,
        dateOfBirth: new Date('1998-11-03'),
        gender: 'female',
        address: '89 Cách Mạng Tháng 8, Quận 10, TP.HCM',
        position: 'receptionist',
        department: 'Lễ tân',
        salary: 9000000,
        hireDate: new Date('2024-03-10'),
        status: 'active',
      },
      {
        user: staffUser3._id,
        employeeCode: 'NV003',
        fullName: staffUser3.fullName,
        email: staffUser3.email,
        phone: staffUser3.phone,
        avatar: staffUser3.avatar,
        dateOfBirth: new Date('1995-05-19'),
        gender: 'male',
        address: '150 Hoàng Văn Thụ, Tân Bình, TP.HCM',
        position: 'field_staff',
        department: 'Vận hành sân',
        salary: 9500000,
        hireDate: new Date('2024-04-01'),
        status: 'active',
      },
      {
        user: staffUser4._id,
        employeeCode: 'NV004',
        fullName: staffUser4.fullName,
        email: staffUser4.email,
        phone: staffUser4.phone,
        avatar: staffUser4.avatar,
        dateOfBirth: new Date('1999-01-25'),
        gender: 'female',
        address: '77 Phan Đăng Lưu, Phú Nhuận, TP.HCM',
        position: 'cashier',
        department: 'Thu ngân',
        salary: 8800000,
        hireDate: new Date('2024-05-15'),
        status: 'active',
      },
      {
        user: staffUser5._id,
        employeeCode: 'NV005',
        fullName: staffUser5.fullName,
        email: staffUser5.email,
        phone: staffUser5.phone,
        avatar: staffUser5.avatar,
        dateOfBirth: new Date('1994-07-30'),
        gender: 'male',
        address: '12 Kha Vạn Cân, TP. Thủ Đức',
        position: 'security',
        department: 'An ninh & Trật tự',
        salary: 8500000,
        hireDate: new Date('2024-06-01'),
        status: 'active',
      },
    ]);

    console.log('[Seed] 3. Creating Shifts (5 ca làm việc)...');
    const shifts = await Shift.create([
      {
        name: 'Ca Sáng (08:00 - 12:00)',
        startTime: '08:00',
        endTime: '12:00',
        gracePeriod: 15,
        status: 'active',
      },
      {
        name: 'Ca Chiều (13:00 - 17:00)',
        startTime: '13:00',
        endTime: '17:00',
        gracePeriod: 15,
        status: 'active',
      },
      {
        name: 'Ca Tối (17:00 - 22:00)',
        startTime: '17:00',
        endTime: '22:00',
        gracePeriod: 15,
        status: 'active',
      },
      {
        name: 'Ca Hành Chính (08:00 - 17:00)',
        startTime: '08:00',
        endTime: '17:00',
        breakStart: '12:00',
        breakEnd: '13:00',
        gracePeriod: 15,
        status: 'active',
      },
      {
        name: 'Ca Cuối Tuần (07:00 - 15:00)',
        startTime: '07:00',
        endTime: '15:00',
        breakStart: '11:30',
        breakEnd: '12:30',
        gracePeriod: 20,
        status: 'active',
      },
    ]);

    console.log('[Seed] 4. Creating 20 Realistic Courts (Bóng đá, Cầu lông, Tennis, Pickleball...)...');
    const courtData = [
      // Football (4)
      {
        name: 'Sân Bóng Đá Cỏ Nhân Tạo SportPro 1',
        type: 'football',
        description: 'Mặt cỏ sợi kim cương cao cấp đạt chuẩn FIFA 2 sao, hệ thống đèn LED Philips chống chói ban đêm, có khán đài có mái che.',
        address: 'Số 10 Chu Văn An, Phường 12, Bình Thạnh',
        location: { city: 'TP. Hồ Chí Minh', district: 'Bình Thạnh' },
        pricePerHour: 350000,
        images: [
          'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800',
          'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
        ],
        amenities: ['wifi', 'parking', 'shower', 'lighting', 'drinks', 'locker'],
        openingTime: '06:00',
        closingTime: '23:00',
        status: 'active',
      },
      {
        name: 'Sân Bóng Đá Mini 7 Người Thống Nhất',
        type: 'football',
        description: 'Sân bóng rộng rãi thoáng mát, khu phức hợp thể thao có căng tin phục vụ nước uống giải khát.',
        address: '138 Đào Duy Từ, Phường 6, Quận 10',
        location: { city: 'TP. Hồ Chí Minh', district: 'Quận 10' },
        pricePerHour: 450000,
        images: ['https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800'],
        amenities: ['wifi', 'parking', 'shower', 'lighting', 'drinks'],
        openingTime: '06:00',
        closingTime: '23:00',
        status: 'active',
      },
      {
        name: 'Sân Bóng Đá Trong Nhà Futsal Arena',
        type: 'football',
        description: 'Sàn gỗ cao cấp tiêu chuẩn thi đấu quốc gia, điều hòa nhiệt độ cực mát mẻ.',
        address: '25 Nguyễn Hữu Thọ, Tân Hưng, Quận 7',
        location: { city: 'TP. Hồ Chí Minh', district: 'Quận 7' },
        pricePerHour: 500000,
        images: ['https://images.unsplash.com/photo-1518604666864-742799a381c0?w=800'],
        amenities: ['wifi', 'parking', 'air_conditioning', 'shower', 'locker'],
        openingTime: '07:00',
        closingTime: '22:00',
        status: 'active',
      },
      {
        name: 'Sân Bóng Đá Cỏ Tự Nhiên Thanh Đa',
        type: 'football',
        description: 'Mặt cỏ tự nhiên được chăm sóc kỹ lưỡng, không gian ven sông thoáng mát.',
        address: 'Lô IV Cư xá Thanh Đa, Phường 27, Bình Thạnh',
        location: { city: 'TP. Hồ Chí Minh', district: 'Bình Thạnh' },
        pricePerHour: 300000,
        images: ['https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800'],
        amenities: ['parking', 'lighting', 'drinks'],
        openingTime: '06:00',
        closingTime: '21:00',
        status: 'maintenance',
      },

      // Badminton (4)
      {
        name: 'CLB Cầu Lông Victor Star - Sân 01',
        type: 'badminton',
        description: 'Thảm cầu lông Enlio BWF Certified chống trơn trượt, ánh sáng tiêu chuẩn không chói mắt, trần cao 11m.',
        address: '56 Phan Xích Long, Phường 2, Phú Nhuận',
        location: { city: 'TP. Hồ Chí Minh', district: 'Phú Nhuận' },
        pricePerHour: 120000,
        images: [
          'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800',
          'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=800',
        ],
        amenities: ['wifi', 'parking', 'shower', 'lighting', 'racket_rental'],
        openingTime: '05:30',
        closingTime: '23:00',
        status: 'active',
      },
      {
        name: 'CLB Cầu Lông Victor Star - Sân 02',
        type: 'badminton',
        description: 'Thảm cầu lông Enlio xanh lá thi đấu cao cấp, có cho thuê vợt Yonex và bán cầu thi đấu.',
        address: '56 Phan Xích Long, Phường 2, Phú Nhuận',
        location: { city: 'TP. Hồ Chí Minh', district: 'Phú Nhuận' },
        pricePerHour: 120000,
        images: ['https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800'],
        amenities: ['wifi', 'parking', 'shower', 'lighting', 'racket_rental'],
        openingTime: '05:30',
        closingTime: '23:00',
        status: 'active',
      },
      {
        name: 'Sân Cầu Lông Tân Sơn Nhất Airport View',
        type: 'badminton',
        description: 'Hệ thống 8 sân cầu lông liên hoàn, quạt trần công nghiệp làm mát liên tục.',
        address: '20 Cộng Hòa, Phường 12, Tân Bình',
        location: { city: 'TP. Hồ Chí Minh', district: 'Tân Bình' },
        pricePerHour: 110000,
        images: ['https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=800'],
        amenities: ['wifi', 'parking', 'drinks', 'lighting'],
        openingTime: '06:00',
        closingTime: '22:30',
        status: 'active',
      },
      {
        name: 'Sân Cầu Lông Quận 1 Sport Club',
        type: 'badminton',
        description: 'Vị trí trung tâm Sài Gòn, phòng thay đồ máy lạnh sạch sẽ, tủ locker cá nhân an toàn.',
        address: '143 Nguyễn Du, Phường Bến Thành, Quận 1',
        location: { city: 'TP. Hồ Chí Minh', district: 'Quận 1' },
        pricePerHour: 150000,
        images: ['https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=800'],
        amenities: ['wifi', 'parking', 'air_conditioning', 'shower', 'locker'],
        openingTime: '06:00',
        closingTime: '22:00',
        status: 'active',
      },

      // Tennis (3)
      {
        name: 'Sân Tennis Lan Anh Grand Slam',
        type: 'tennis',
        description: 'Mặt sân Plexipave chuyên nghiệp của giải Úc Mở Rộng, dàn đèn công suất lớn 1000 Lux.',
        address: '291 Cách Mạng Tháng 8, Phường 12, Quận 10',
        location: { city: 'TP. Hồ Chí Minh', district: 'Quận 10' },
        pricePerHour: 250000,
        images: [
          'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800',
          'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800',
        ],
        amenities: ['wifi', 'parking', 'shower', 'lighting', 'coach', 'drinks'],
        openingTime: '05:30',
        closingTime: '22:00',
        status: 'active',
      },
      {
        name: 'Sân Tennis Khách Sạn Rex Rooftop',
        type: 'tennis',
        description: 'Trải nghiệm đánh tennis đỉnh cao trên tầng thượng với tầm nhìn toàn cảnh phố đi bộ Nguyễn Huệ.',
        address: '141 Nguyễn Huệ, Phường Bến Nghé, Quận 1',
        location: { city: 'TP. Hồ Chí Minh', district: 'Quận 1' },
        pricePerHour: 400000,
        images: ['https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800'],
        amenities: ['wifi', 'parking', 'shower', 'drinks', 'locker'],
        openingTime: '06:00',
        closingTime: '22:00',
        status: 'active',
      },
      {
        name: 'Sân Tennis Thảo Điền Riverside',
        type: 'tennis',
        description: 'Khuôn viên xanh ven sông Sài Gòn tĩnh lặng, phù hợp giao lưu và luyện tập với HLV chuyên nghiệp.',
        address: '189 Nguyễn Văn Hưởng, Thảo Điền, TP. Thủ Đức',
        location: { city: 'TP. Hồ Chí Minh', district: 'Thủ Đức' },
        pricePerHour: 300000,
        images: ['https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800'],
        amenities: ['wifi', 'parking', 'shower', 'lighting', 'coach'],
        openingTime: '06:00',
        closingTime: '21:30',
        status: 'active',
      },

      // Pickleball (4)
      {
        name: 'Sân Pickleball Sài Gòn D-Court 1',
        type: 'pickleball',
        description: 'Môn thể thao hot nhất năm! Mặt sân Acrylic chống lóa cực êm chân, lưới chuẩn USA Pickleball.',
        address: '12 Nguyễn Thị Minh Khai, Đa Kao, Quận 1',
        location: { city: 'TP. Hồ Chí Minh', district: 'Quận 1' },
        pricePerHour: 180000,
        images: [
          'https://images.unsplash.com/photo-1592656094267-764a45160876?w=800',
          'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800',
        ],
        amenities: ['wifi', 'parking', 'lighting', 'drinks', 'paddle_rental'],
        openingTime: '06:00',
        closingTime: '23:00',
        status: 'active',
      },
      {
        name: 'Sân Pickleball Sài Gòn D-Court 2',
        type: 'pickleball',
        description: 'Có khu vực quầy bar nước ép detox, khu chụp ảnh check-in thể thao siêu đẹp.',
        address: '12 Nguyễn Thị Minh Khai, Đa Kao, Quận 1',
        location: { city: 'TP. Hồ Chí Minh', district: 'Quận 1' },
        pricePerHour: 180000,
        images: ['https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800'],
        amenities: ['wifi', 'parking', 'lighting', 'drinks', 'paddle_rental'],
        openingTime: '06:00',
        closingTime: '23:00',
        status: 'active',
      },
      {
        name: 'Sân Pickleball Phú Mỹ Hưng Garden',
        type: 'pickleball',
        description: 'Cụm 4 sân ngoài trời thoáng mát giữa công viên Hồ Bán Nguyệt, không khí trong lành.',
        address: 'Đường Tôn Dật Tiên, Tân Phong, Quận 7',
        location: { city: 'TP. Hồ Chí Minh', district: 'Quận 7' },
        pricePerHour: 160000,
        images: ['https://images.unsplash.com/photo-1592656094267-764a45160876?w=800'],
        amenities: ['wifi', 'parking', 'shower', 'drinks'],
        openingTime: '06:00',
        closingTime: '22:00',
        status: 'active',
      },
      {
        name: 'Sân Pickleball An Phú Indoor VIP',
        type: 'pickleball',
        description: 'Sân trong nhà có điều hòa mát rượi, bất chấp mưa nắng, dịch vụ cao cấp.',
        address: '32 Song Hành, An Phú, TP. Thủ Đức',
        location: { city: 'TP. Hồ Chí Minh', district: 'Thủ Đức' },
        pricePerHour: 220000,
        images: ['https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800'],
        amenities: ['wifi', 'parking', 'air_conditioning', 'shower', 'locker'],
        openingTime: '07:00',
        closingTime: '23:00',
        status: 'active',
      },

      // Basketball (3)
      {
        name: 'Sân Bóng Rổ Saigon Heat Center',
        type: 'basketball',
        description: 'Trụ bóng rổ thủy lực tiêu chuẩn FIBA, sàn gỗ bóng rổ chống sốc, bảng điểm điện tử chuyên nghiệp.',
        address: '15 Tố Hữu, Thủ Thiêm, TP. Thủ Đức',
        location: { city: 'TP. Hồ Chí Minh', district: 'Thủ Đức' },
        pricePerHour: 350000,
        images: [
          'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
          'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=800',
        ],
        amenities: ['wifi', 'parking', 'shower', 'lighting', 'scoreboard', 'ball_rental'],
        openingTime: '06:00',
        closingTime: '22:00',
        status: 'active',
      },
      {
        name: 'Sân Bóng Rổ Ngoài Trời Hoa Lư',
        type: 'basketball',
        description: 'Mặt sân sơn cao su ma sát cao, vành rổ lò xo trợ lực, điểm đến yêu thích của cộng đồng streetball.',
        address: '02 Đinh Tiên Hoàng, Đa Kao, Quận 1',
        location: { city: 'TP. Hồ Chí Minh', district: 'Quận 1' },
        pricePerHour: 200000,
        images: ['https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=800'],
        amenities: ['parking', 'lighting', 'drinks'],
        openingTime: '06:00',
        closingTime: '21:30',
        status: 'active',
      },
      {
        name: 'Sân Bóng Rổ Nhà Thi Đấu Phú Thọ',
        type: 'basketball',
        description: 'Khuôn viên nhà thi đấu quốc tế, khán đài 5000 chỗ, hệ thống âm thanh ánh sáng hiện đại.',
        address: '01 Lữ Gia, Phường 15, Quận 11',
        location: { city: 'TP. Hồ Chí Minh', district: 'Quận 11' },
        pricePerHour: 400000,
        images: ['https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800'],
        amenities: ['wifi', 'parking', 'shower', 'scoreboard', 'locker'],
        openingTime: '07:00',
        closingTime: '22:00',
        status: 'active',
      },

      // Volleyball (2)
      {
        name: 'Sân Bóng Chuyền Thể Thao Rạch Miễu',
        type: 'volleyball',
        description: 'Thảm Taraflex tiêu chuẩn bóng chuyền thế giới, cột lưới điều chỉnh độ cao nam/nữ linh hoạt.',
        address: '01 Hoa Phượng, Phường 2, Phú Nhuận',
        location: { city: 'TP. Hồ Chí Minh', district: 'Phú Nhuận' },
        pricePerHour: 200000,
        images: ['https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800'],
        amenities: ['wifi', 'parking', 'shower', 'lighting', 'drinks'],
        openingTime: '06:00',
        closingTime: '22:00',
        status: 'active',
      },
      {
        name: 'Sân Bóng Chuyền Bãi Biển Sunrise City',
        type: 'volleyball',
        description: 'Sân cát trắng mịn độ dày 40cm chuẩn thi đấu bóng chuyền bãi biển, trải nghiệm thể thao ngoài trời độc đáo.',
        address: '23 Nguyễn Hữu Thọ, Tân Hưng, Quận 7',
        location: { city: 'TP. Hồ Chí Minh', district: 'Quận 7' },
        pricePerHour: 250000,
        images: ['https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800'],
        amenities: ['parking', 'shower', 'lighting', 'drinks'],
        openingTime: '06:00',
        closingTime: '21:00',
        status: 'active',
      },
    ];

    const courts = await Court.create(courtData);

    console.log('[Seed] 5. Creating 30 Bookings across dates & courts...');
    const bookings = [];
    const dates = ['2026-09-18', '2026-09-19', '2026-09-20', '2026-09-21', '2026-09-22', '2026-09-23'];
    const timeSlots = [
      { start: '08:00', end: '10:00' },
      { start: '10:00', end: '12:00' },
      { start: '14:00', end: '16:00' },
      { start: '16:00', end: '18:00' },
      { start: '18:00', end: '20:00' },
      { start: '20:00', end: '22:00' },
    ];

    let bookingIndex = 1;
    for (let dIdx = 0; dIdx < dates.length; dIdx++) {
      const date = dates[dIdx];
      for (let sIdx = 0; sIdx < 5; sIdx++) {
        const court = courts[(dIdx * 3 + sIdx) % courts.length];
        const user = customerUsers[(dIdx + sIdx) % customerUsers.length];
        const slot = timeSlots[sIdx % timeSlots.length];

        // Past dates are completed, today is confirmed, future is confirmed
        let status: any = 'completed';
        if (date === '2026-09-21') status = 'confirmed';
        else if (date > '2026-09-21') status = 'confirmed';
        if (bookingIndex === 5) status = 'cancelled';

        const totalHours = 2;
        const totalPrice = court.pricePerHour * totalHours;
        const code = `BK-${date.replace(/-/g, '')}-${1000 + bookingIndex}`;

        const bk = await Booking.create({
          bookingCode: code,
          user: user._id,
          court: court._id,
          date,
          startTime: slot.start,
          endTime: slot.end,
          totalHours,
          pricePerHour: court.pricePerHour,
          totalPrice,
          status,
          paymentStatus: status === 'cancelled' ? 'refunded' : 'paid',
          paymentMethod: 'banking',
          notes: 'Đặt sân cho câu lạc bộ giao lưu cuối tuần',
          cancelReason: status === 'cancelled' ? 'Thành viên bận đột xuất' : '',
        });

        bookings.push(bk);
        bookingIndex++;
      }
    }

    console.log('[Seed] 6. Creating 30 Reviews for completed bookings...');
    const sampleComments = [
      'Mặt sân rất êm, ánh sáng đèn led tuyệt vời, phục vụ nhiệt tình chu đáo!',
      'Sân sạch sẽ, có phòng tắm nóng lạnh rất tiện sau khi thi đấu.',
      'Đặt sân qua website rất tiện lợi, check-in vào sân nhanh chóng.',
      'Sân bóng rổ mặt gỗ chuẩn thi đấu, vành rổ êm tay không đau khớp.',
      'Sân Pickleball mới toanh, bóng nảy rất đều, nhất định sẽ quay lại thường xuyên.',
      'Giá cả rất hợp lý so với chất lượng cơ sở vật chất ở trung tâm thành phố.',
      'Khu để xe máy và ô tô rộng rãi, nhân viên an ninh dắt xe cẩn thận.',
      'Trải nghiệm tuyệt vời, đặt lịch online không sợ trùng khung giờ!',
    ];

    for (let i = 0; i < bookings.length; i++) {
      const bk = bookings[i];
      if (bk.status === 'completed') {
        const rating = 4 + (i % 2); // 4 hoặc 5 sao
        const comment = sampleComments[i % sampleComments.length];

        await Review.create({
          user: bk.user,
          court: bk.court,
          booking: bk._id,
          rating,
          comment,
        });
      }
    }

    // Cập nhật lại ratingAvg và totalReviews cho tất cả các sân
    for (const c of courts) {
      const revs = await Review.find({ court: c._id });
      if (revs.length > 0) {
        const avg = revs.reduce((sum, r) => sum + r.rating, 0) / revs.length;
        await Court.findByIdAndUpdate(c._id, {
          ratingAvg: Math.round(avg * 10) / 10,
          totalReviews: revs.length,
        });
      }
    }

    console.log('[Seed] 7. Creating Work Schedules & Attendances for staff...');
    // Tạo lịch phân ca trong 7 ngày gần đây
    const scheduleDates = [
      '2026-09-19',
      '2026-09-20',
      '2026-09-21', // Hôm nay
      '2026-09-22',
      '2026-09-23',
    ];

    for (let eIdx = 0; eIdx < employees.length; eIdx++) {
      const emp = employees[eIdx];
      for (let sIdx = 0; sIdx < scheduleDates.length; sIdx++) {
        const date = scheduleDates[sIdx];
        const shift = shifts[(eIdx + sIdx) % shifts.length];
        const court = courts[(eIdx + sIdx) % courts.length];

        const sched = await WorkSchedule.create({
          employee: emp._id,
          shift: shift._id,
          court: court._id,
          date,
          status: date < '2026-09-21' ? 'completed' : 'scheduled',
          createdBy: adminUser._id,
        });

        // Tạo dữ liệu chấm công cho ngày hôm qua và hôm nay
        if (date <= '2026-09-21') {
          const isLate = (eIdx + sIdx) % 3 === 0;
          const checkInHour = isLate ? 8 : 7;
          const checkInMin = isLate ? 35 : 55;
          const checkInDate = new Date(`${date}T0${checkInHour}:${checkInMin}:00Z`);

          let checkOutDate: any = undefined;
          let workHours = 0;
          if (date < '2026-09-21') {
            checkOutDate = new Date(`${date}T17:05:00Z`);
            workHours = 8;
          }

          const att = await Attendance.create({
            employee: emp._id,
            workSchedule: sched._id,
            date,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            workHours,
            status: isLate ? 'late' : 'present',
            qrVerified: true,
          });

          await AttendanceLog.create({
            attendance: att._id,
            action: 'check_in',
            newValue: { checkIn: checkInDate, status: att.status },
            performedBy: emp.user || adminUser._id,
            reason: 'Chấm công tự động qua mã QR',
          });
        }
      }
    }

    console.log('[Seed] 8. Creating Leave Requests...');
    await LeaveRequest.create([
      {
        employee: employees[2]._id, // NV001
        startDate: '2026-09-25',
        endDate: '2026-09-26',
        type: 'annual_leave',
        reason: 'Xin nghỉ phép thường niên về quê thăm gia đình',
        status: 'approved',
        approvedBy: manager1._id,
        approvedAt: new Date('2026-09-20'),
        responseNote: 'Đã duyệt, chúc bạn có kỳ nghỉ vui vẻ.',
      },
      {
        employee: employees[3]._id, // NV002
        startDate: '2026-09-28',
        endDate: '2026-09-28',
        type: 'personal_leave',
        reason: 'Giải quyết việc gia đình cá nhân',
        status: 'pending',
      },
    ]);

    console.log('[Seed] 9. Creating Payroll Records...');
    for (const emp of employees) {
      const baseSalary = emp.salary;
      const totalWorkDays = 24;
      const totalWorkHours = 192;
      const allowance = 1000000;
      const overtimePay = 500000;
      const deduction = 150000;
      const totalSalary = Math.round((baseSalary / 26) * totalWorkDays) + allowance + overtimePay - deduction;

      await Payroll.create({
        employee: emp._id,
        month: 8,
        year: 2026,
        baseSalary,
        totalWorkDays,
        totalWorkHours,
        allowance,
        overtimePay,
        deduction,
        totalSalary,
        status: 'paid',
        notes: 'Bảng lương tháng 08/2026 đã chi trả đầy đủ',
      });
    }

    console.log('\n=============================================');
    console.log(' SEED DATABASE COMPLETED SUCCESSFULLY!');
    console.log('=============================================');
    console.log(' Tài khoản Demo (Mật khẩu: password123):');
    console.log('   - Admin:    admin@sportbooking.com');
    console.log('   - Manager:  manager@sportbooking.com');
    console.log('   - Staff:    staff@sportbooking.com');
    console.log('   - Customer: customer@sportbooking.com');
    console.log('=============================================\n');

    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error occurred while seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
