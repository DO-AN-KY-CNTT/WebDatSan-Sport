import React from 'react';
import clsx from 'clsx';

type FilterBarProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  onReset?: () => void;
  resetLabel?: string;
};

export const FilterBar: React.FC<FilterBarProps> = ({ title, onReset, resetLabel = 'Đặt lại', className, children, ...props }) => (
  <section className={clsx('sb-surface p-4 sm:p-5', className)} {...props}>
    {(title || onReset) && (
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-[var(--sb-line)] pb-3">
        {title && <h2 className="text-sm font-bold text-[var(--sb-ink)]">{title}</h2>}
        {onReset && (
          <button type="button" onClick={onReset} className="text-xs font-bold text-[var(--sb-accent)] hover:underline">
            {resetLabel}
          </button>
        )}
      </div>
    )}
    <div className="space-y-4">{children}</div>
  </section>
);
