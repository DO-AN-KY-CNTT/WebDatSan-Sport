import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, User, Building2, Calendar } from 'lucide-react';
import { api } from '../../services/api';
import { Review, ApiResponse } from '../../types';
import { useToast } from '../../components/common/Toast';

export const AdminReviewsPage: React.FC = () => {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await api.get<ApiResponse<Review[]>>('/reviews');
        if (res.data.success) {
          setReviews(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Quản lý Đánh giá & Nhận xét Sân
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Xem phản hồi thực tế từ khách hàng sau khi hoàn tất các buổi đặt sân.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Đang tải danh sách đánh giá...</div>
        ) : reviews.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">Chưa có đánh giá nào.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {reviews.map((rev) => {
              const court = rev.court as any;
              return (
                <div key={rev._id} className="p-5 hover:bg-slate-50 transition-colors space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <img
                        src={
                          rev.user?.avatar ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
                        }
                        alt=""
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/20"
                      />
                      <div>
                        <div className="font-bold text-xs text-slate-900">
                          {rev.user?.fullName}
                        </div>
                        <div className="text-[10px] text-slate-400">{rev.user?.email}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {new Date(rev.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="text-[11px] font-bold text-brand-600 mb-1 flex items-center space-x-1">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{court?.name}</span>
                    </div>
                    <p className="leading-relaxed">{rev.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
