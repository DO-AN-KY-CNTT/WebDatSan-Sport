import { Shift, IShift } from '../models/Shift';

export class ShiftService {
  static async getAllShifts(status?: string) {
    const filter: any = {};
    if (status) filter.status = status;
    return await Shift.find(filter).sort({ startTime: 1 });
  }

  static async getShiftById(id: string) {
    const shift = await Shift.findById(id);
    if (!shift) throw new Error('Không tìm thấy ca làm việc');
    return shift;
  }

  static async createShift(data: Partial<IShift>) {
    return await Shift.create(data);
  }

  static async updateShift(id: string, data: Partial<IShift>) {
    const shift = await Shift.findByIdAndUpdate(id, { $set: data }, { new: true });
    if (!shift) throw new Error('Không tìm thấy ca làm việc');
    return shift;
  }

  static async deleteShift(id: string) {
    const shift = await Shift.findByIdAndDelete(id);
    if (!shift) throw new Error('Không tìm thấy ca làm việc');
    return shift;
  }
}
