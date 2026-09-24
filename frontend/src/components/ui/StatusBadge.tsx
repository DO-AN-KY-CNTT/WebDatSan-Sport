import React from 'react';
import clsx from 'clsx';

export type StatusTone = 'default' | 'success' | 'warning' | 'danger' | 'info';

type StatusBadgeProps = {
  children: React.ReactNode;
  tone?: StatusTone;
  className?: string;
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ children, tone = 'default', className }) => (
  <span
    className={clsx(
      'sb-status',
      tone === 'success' && 'sb-status-success',
      tone === 'warning' && 'sb-status-warning',
      tone === 'danger' && 'sb-status-danger',
      tone === 'info' && 'sb-status-info',
      className
    )}
  >
    {children}
  </span>
);
