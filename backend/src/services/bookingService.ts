import mongoose from 'mongoose';
import { Booking, IBooking } from '../models/Booking';
import { Court } from '../models/Court';
import { BookingStatus, PaymentMethod, PaymentStatus } from '../types';

export const timeToMinutes = (timeStr: string): number => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

export class BookingService {
  /**
   * Kiểm tra trùng lịch booking tại Backend
   */
  static async checkConflict(
    courtId: string,
    date: string,
    startTime: string,
    endTime: string,
    excludeBookingId?: string
  ): Promise<{ hasConflict: boolean; conflictingBooking?: IBooking }> {
    const newStart = timeToMinutes(startTime);
    const newEnd = timeToMinutes(endTime);

    const query: any = {
      court: courtId,
      date,
      status: { $in: ['pending', 'confirmed', 'completed'] },
    };

    if (excludeBookingId) {
      query._id = { $ne: excludeBookingId };
    }

    const existingBookings = await Booking.find(query);

    for (const b of existingBookings) {
      const existStart = timeToMinutes(b.startTime);
      const existEnd = timeToMinutes(b.endTime);

      // Trùng lịch nếu: max(newStart, existStart) < min(newEnd, existEnd)
      if (Math.max(newStart, existStart) < Math.min(newEnd, existEnd)) {
        return { hasConflict: true, conflictingBooking: b };
      }
    }

    return { hasConflict: false };
  }

  /**
   * Tạo đơn đặt sân mới với bảo vệ chống trùng lịch tuyệt đối
   */
  static async createBooking(
    userId: string,
    data: {
      courtId: string;
      date: string;
      startTime: string;
      endTime: string;
      paymentMethod: PaymentMethod;
      notes?: string;
    }
  ) {
    const court = await Court.findById(data.courtId);
    if (!court) {
      throw new Error('Không tìm thấy sân thể thao');
    }

    if (court.status !== 'active') {
      throw new Error('Sân thể thao hiện không hoạt động hoặc đang trong quá trình bảo trì');
    }

    // Kiểm tra giờ hoạt động của sân
    const bookingStartMinutes = timeToMinutes(data.startTime);
    const bookingEndMinutes = timeToMinutes(data.endTime);
    const courtOpenMinutes = timeToMinutes(court.openingTime);
    const courtCloseMinutes = timeToMinutes(court.closingTime);

    if (bookingStartMinutes < courtOpenMinutes || bookingEndMinutes > courtCloseMinutes) {
      throw new Error(
        `Giờ đặt sân phải nằm trong khung giờ hoạt động của sân (${court.openingTime} - ${court.closingTime})`
      );
    }

    // Kiểm tra ngày không được ở trong quá khứ
    const todayStr = new Date().toISOString().split('T')[0];
    if (data.date < todayStr) {
      throw new Error('Không thể đặt sân vào ngày đã qua');
    }

    // Kiểm tra trùng lịch tại Backend
    const conflictCheck = await this.checkConflict(
      data.courtId,
      data.date,
      data.startTime,
      data.endTime
    );

    if (conflictCheck.hasConflict && conflictCheck.conflictingBooking) {
      const c = conflictCheck.conflictingBooking;
      throw new Error(
        `Khung giờ từ ${c.startTime} đến ${c.endTime} vào ngày ${c.date} đã có khách hàng đặt trước. Vui lòng chọn khung giờ khác!`
      );
    }

    // Tính toán thời lượng và tổng tiền
    const totalHours = (bookingEndMinutes - bookingStartMinutes) / 60;
    const totalPrice = Math.round(totalHours * court.pricePerHour);

    // Tạo mã booking ngẫu nhiên duy nhất
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const datePart = data.date.replace(/-/g, '');
    const bookingCode = `BK-${datePart}-${randomSuffix}`;

    const newBooking = await Booking.create({
      bookingCode,
      user: userId,
      court: data.courtId,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      totalHours,
      pricePerHour: court.pricePerHour,
      totalPrice,
      status: 'confirmed',
      paymentStatus: 'paid', // Mô phỏng thanh toán thành công
      paymentMethod: data.paymentMethod,
      notes: data.notes || '',
    });

    return await Booking.findById(newBooking._id)
      .populate('court', 'name type address location images pricePerHour')
      .populate('user', 'fullName email phone');
  }

  /**
   * Lấy danh sách các khung giờ đã được đặt của sân trong một ngày cụ thể
   */
  static async getCourtOccupiedSlots(courtId: string, date: string) {
    const bookings = await Booking.find({
      court: courtId,
      date,
      status: { $in: ['pending', 'confirmed', 'completed'] },
    }).select('startTime endTime status bookingCode');

    return bookings;
  }

  /**
   * Lấy danh sách booking của người dùng hiện tại
   */
  static async getMyBookings(
    userId: string,
    filterStatus?: string
  ) {
    const query: any = { user: userId };
    if (filterStatus && filterStatus !== 'all') {
      if (filterStatus === 'upcoming') {
        const todayStr = new Date().toISOString().split('T')[0];
        query.date = { $gte: todayStr };
        query.status = { $in: ['pending', 'confirmed'] };
      } else {
        query.status = filterStatus;
      }
    }

    return await Booking.find(query)
      .populate('court', 'name type address location images pricePerHour')
      .sort({ date: -1, startTime: -1 });
  }

  /**
   * Lấy toàn bộ bookings (dành cho Admin / Manager)
   */
  static async getAllBookings(params: {
    courtId?: string;
    date?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const filter: any = {};
    if (params.courtId) filter.court = params.courtId;
    if (params.date) filter.date = params.date;
    if (params.status) filter.status = params.status;

    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(params.limit) || 20));
    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      Booking.find(filter)
        .populate('court', 'name type address location')
        .populate('user', 'fullName email phone')
        .sort({ date: -1, startTime: -1 })
        .skip(skip)
        .limit(limit),
      Booking.countDocuments(filter),
    ]);

    return {
      bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getBookingById(bookingId: string) {
    const booking = await Booking.findById(bookingId)
      .populate('court')
      .populate('user', 'fullName email phone');
    if (!booking) {
      throw new Error('Không tìm thấy đơn đặt sân');
    }
    return booking;
  }

  /**
   * Hủy booking
   */
  static async cancelBooking(bookingId: string, userId: string, userRole: string, cancelReason: string) {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new Error('Không tìm thấy đơn đặt sân');
    }

    // Nếu là customer, chỉ được hủy booking của chính mình
    if (userRole === 'customer' && booking.user.toString() !== userId) {
      throw new Error('Bạn không có quyền hủy đơn đặt sân của người khác');
    }

    if (booking.status === 'cancelled') {
      throw new Error('Đơn đặt sân này đã được hủy trước đó');
    }

    if (booking.status === 'completed') {
      throw new Error('Không thể hủy đơn đặt sân đã hoàn thành');
    }

    booking.status = 'cancelled';
    booking.cancelReason = cancelReason;
    if (booking.paymentStatus === 'paid') {
      booking.paymentStatus = 'refunded';
    }

    await booking.save();
    return booking;
  }

  /**
   * Cập nhật trạng thái booking (Admin/Manager)
   */
  static async updateBookingStatus(
    bookingId: string,
    status?: BookingStatus,
    paymentStatus?: PaymentStatus
  ) {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new Error('Không tìm thấy đơn đặt sân');
    }

    if (status) booking.status = status;
    if (paymentStatus) booking.paymentStatus = paymentStatus;

    await booking.save();
    return booking;
  }
}
