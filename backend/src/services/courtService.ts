import { Court, ICourt } from '../models/Court';
import { CourtStatus, CourtType } from '../types';

export interface CourtQueryParams {
  search?: string;
  type?: CourtType;
  status?: CourtStatus;
  district?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string | string[];
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}

export class CourtService {
  static async getAllCourts(query: CourtQueryParams) {
    const filter: any = {};

    if (query.status) {
      filter.status = query.status;
    }

    if (query.type) {
      filter.type = query.type;
    }

    if (query.district) {
      filter['location.district'] = new RegExp(query.district, 'i');
    }

    if (query.city) {
      filter['location.city'] = new RegExp(query.city, 'i');
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      filter.pricePerHour = {};
      if (query.minPrice !== undefined) filter.pricePerHour.$gte = Number(query.minPrice);
      if (query.maxPrice !== undefined) filter.pricePerHour.$lte = Number(query.maxPrice);
    }

    if (query.amenities) {
      const amenitiesList = Array.isArray(query.amenities)
        ? query.amenities
        : query.amenities.split(',');
      filter.amenities = { $all: amenitiesList };
    }

    if (query.search) {
      const searchRegex = new RegExp(query.search, 'i');
      filter.$or = [
        { name: searchRegex },
        { address: searchRegex },
        { description: searchRegex },
        { 'location.district': searchRegex },
      ];
    }

    let sort: any = { createdAt: -1 };
    if (query.sortBy === 'price_asc') sort = { pricePerHour: 1 };
    else if (query.sortBy === 'price_desc') sort = { pricePerHour: -1 };
    else if (query.sortBy === 'rating') sort = { ratingAvg: -1, totalReviews: -1 };
    else if (query.sortBy === 'newest') sort = { createdAt: -1 };

    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(query.limit) || 12));
    const skip = (page - 1) * limit;

    const [courts, total] = await Promise.all([
      Court.find(filter).sort(sort).skip(skip).limit(limit),
      Court.countDocuments(filter),
    ]);

    return {
      courts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getCourtById(id: string) {
    const court = await Court.findById(id);
    if (!court) {
      throw new Error('Không tìm thấy sân thể thao');
    }
    return court;
  }

  static async createCourt(data: Partial<ICourt>) {
    return await Court.create(data);
  }

  static async updateCourt(id: string, data: Partial<ICourt>) {
    const court = await Court.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
    if (!court) {
      throw new Error('Không tìm thấy sân thể thao');
    }
    return court;
  }

  static async updateStatus(id: string, status: CourtStatus) {
    const court = await Court.findByIdAndUpdate(id, { $set: { status } }, { new: true });
    if (!court) {
      throw new Error('Không tìm thấy sân thể thao');
    }
    return court;
  }

  static async deleteCourt(id: string) {
    const court = await Court.findByIdAndDelete(id);
    if (!court) {
      throw new Error('Không tìm thấy sân thể thao');
    }
    return court;
  }
}
