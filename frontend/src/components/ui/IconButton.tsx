import React from 'react';
import clsx from 'clsx';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  tone?: 'default' | 'danger';
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, tone = 'default', className, children, ...props }, ref) => (
    <button
      ref={ref}
      type={props.type || 'button'}
      aria-label={label}
      title={label}
      className={clsx(
        'sb-icon-button',
        tone === 'danger' && 'text-[var(--sb-danger)] hover:border-[var(--sb-danger)]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

IconButton.displayName = 'IconButton';
