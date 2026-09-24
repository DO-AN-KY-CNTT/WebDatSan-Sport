import React from 'react';
import { Activity } from 'lucide-react';
import clsx from 'clsx';

type BrandMarkProps = {
  compact?: boolean;
  inverse?: boolean;
  className?: string;
};

export const BrandMark: React.FC<BrandMarkProps> = ({ compact = false, inverse = false, className }) => (
  <span className={clsx('inline-flex items-center gap-2.5', className)}>
    <span
      className={clsx(
        'flex h-9 w-9 items-center justify-center rounded-full',
        inverse ? 'bg-[var(--sb-accent)] text-white' : 'bg-[var(--sb-ink)] text-[#fff7f8]'
      )}
    >
      <Activity aria-hidden="true" className="h-[18px] w-[18px]" />
    </span>
    {!compact && (
      <span className={clsx('text-[22px] font-extrabold tracking-[-0.04em]', inverse ? 'text-white' : 'text-[var(--sb-ink)]')}>
        Sport<span className="text-[var(--sb-accent)]">Booking</span>
      </span>
    )}
  </span>
);
