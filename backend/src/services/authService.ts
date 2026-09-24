import { User, IUser } from '../models/User';
import { signToken } from '../utils/jwt';

export class AuthService {
  static async registerCustomer(data: {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    avatar?: string;
  }) {
    const existingUser = await User.findOne({ email: data.email.toLowerCase() });
    if (existingUser) {
      throw new Error('Email này đã được đăng ký tài khoản');
    }

    const newUser = await User.create({
      ...data,
      email: data.email.toLowerCase(),
      role: 'customer',
      isActive: true,
    });

    const token = signToken({
      userId: newUser._id.toString(),
      role: newUser.role,
      email: newUser.email,
    });

    const userObj = newUser.toObject();
    delete userObj.password;

    return { user: userObj, token };
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      throw new Error('Email hoặc mật khẩu không chính xác');
    }

    if (!user.isActive) {
      throw new Error('Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên.');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Email hoặc mật khẩu không chính xác');
    }

    const token = signToken({
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    });

    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, token };
  }

  static async getCurrentUser(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Không tìm thấy người dùng');
    }
    return user;
  }

  static async updateProfile(userId: string, data: { fullName?: string; phone?: string; avatar?: string }) {
    const user = await User.findByIdAndUpdate(userId, { $set: data }, { new: true });
    if (!user) {
      throw new Error('Không tìm thấy người dùng');
    }
    return user;
  }

  static async changePassword(userId: string, oldPass: string, newPass: string) {
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new Error('Không tìm thấy người dùng');
    }

    const isMatch = await user.comparePassword(oldPass);
    if (!isMatch) {
      throw new Error('Mật khẩu hiện tại không đúng');
    }

    user.password = newPass;
    user.mustChangePassword = false;
    await user.save();

    return { message: 'Đổi mật khẩu thành công' };
  }
}
