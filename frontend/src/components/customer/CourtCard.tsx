import React from 'react';
import { ArrowUpRight, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Court } from '../../types';
import { formatCourtType, formatVnd } from '../../utils/formatters';

type CourtCardProps = { court: Court; compact?: boolean };

const fallbackImage = 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1000';

export const CourtCard: React.FC<CourtCardProps> = ({ court, compact = false }) => (
  <article className="group overflow-hidden rounded-[var(--sb-radius-lg)] border border-[var(--sb-line)] bg-white shadow-[var(--sb-shadow-card)] transition-transform duration-300 hover:-translate-y-1">
    <Link to={`/courts/${court._id}`} className="block">
      <div className={`relative overflow-hidden bg-[#f1e9ea] ${compact ? 'h-44' : 'h-56'}`}>
        <img
          src={court.images?.[0] || fallbackImage}
          alt={court.name}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackImage;
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[var(--sb-ink)]">{formatCourtType(court.type)}</span>
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[var(--sb-ink)]/90 px-2.5 py-1 text-xs font-bold text-white"><Star aria-hidden="true" className="h-3.5 w-3.5 fill-current text-[#e5b464]" />{court.ratingAvg.toFixed(1)}</span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="line-clamp-1 text-lg font-bold tracking-[-0.02em] text-[var(--sb-ink)] group-hover:text-[var(--sb-accent)]">{court.name}</h2>
          <ArrowUpRight aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[var(--sb-ink-3)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--sb-accent)]" />
        </div>
        <p className="mt-2 flex items-center gap-1.5 truncate text-xs text-[var(--sb-ink-2)]"><MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[var(--sb-accent)]" />{court.address}</p>
        {!compact && <p className="mt-3 line-clamp-2 text-sm leading-5 text-[var(--sb-ink-3)]">{court.description}</p>}
        <div className="mt-5 flex items-end justify-between border-t border-[var(--sb-line)] pt-4">
          <div><p className="text-[11px] uppercase tracking-[0.08em] text-[var(--sb-ink-3)]">Từ mỗi giờ</p><p className="mt-1 text-base font-extrabold text-[var(--sb-ink)]">{formatVnd(court.pricePerHour)}</p></div>
          <span className="text-xs font-bold text-[var(--sb-accent)]">{court.totalReviews} đánh giá</span>
        </div>
      </div>
    </Link>
  </article>
);
