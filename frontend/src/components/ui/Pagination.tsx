import React from 'react';
import clsx from 'clsx';

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Phân trang" className="flex flex-wrap items-center justify-center gap-2 pt-2">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          aria-current={item === page ? 'page' : undefined}
          className={clsx(
            'flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-colors',
            item === page
              ? 'bg-[var(--sb-ink)] text-white'
              : 'border border-[var(--sb-line-strong)] bg-white text-[var(--sb-ink-2)] hover:border-[var(--sb-ink)] hover:text-[var(--sb-ink)]'
          )}
        >
          {item}
        </button>
      ))}
    </nav>
  );
};
