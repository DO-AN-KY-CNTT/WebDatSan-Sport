import React from 'react';
import { Star } from 'lucide-react';
import type { Review } from '../../types';
import { formatDateVi } from '../../utils/formatters';

const fallbackAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';

type ReviewListProps = { reviews: Review[] };

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (!reviews.length) return <p className="py-8 text-center text-sm text-[var(--sb-ink-3)]">Chưa có đánh giá nào cho sân này.</p>;

  return <div className="divide-y divide-[var(--sb-line)]">{reviews.map((review) => <article key={review._id} className="py-5 first:pt-0 last:pb-0"><div className="flex items-start justify-between gap-4"><div className="flex min-w-0 items-center gap-3"><img src={review.user?.avatar || fallbackAvatar} alt={review.user?.fullName} className="h-9 w-9 rounded-full object-cover" /><div className="min-w-0"><p className="truncate text-sm font-bold text-[var(--sb-ink)]">{review.user?.fullName}</p><p className="text-xs text-[var(--sb-ink-3)]">{formatDateVi(review.createdAt)}</p></div></div><div className="flex shrink-0 items-center gap-0.5 text-[#b07a2d]">{Array.from({ length: review.rating }).map((_, index) => <Star key={index} aria-hidden="true" className="h-3.5 w-3.5 fill-current" />)}</div></div><p className="mt-3 text-sm leading-6 text-[var(--sb-ink-2)]">{review.comment}</p></article>)}</div>;
};
