import React from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

type LoadingStateProps = {
  label?: string;
  className?: string;
  compact?: boolean;
};

export const LoadingState: React.FC<LoadingStateProps> = ({ label = 'Đang tải dữ liệu...', className, compact = false }) => (
  <div className={clsx('flex items-center justify-center gap-3 text-sm text-[var(--sb-ink-3)]', compact ? 'py-8' : 'min-h-64', className)}>
    <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin text-[var(--sb-accent)]" />
    <span>{label}</span>
  </div>
);
