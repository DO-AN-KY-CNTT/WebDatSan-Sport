import React from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

export type ButtonTone = 'ink' | 'accent' | 'quiet' | 'danger';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: ButtonTone;
  loading?: boolean;
  fullWidth?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ tone = 'ink', loading = false, fullWidth = false, className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        'sb-button',
        {
          'sb-button-ink': tone === 'ink',
          'sb-button-accent': tone === 'accent',
          'sb-button-quiet': tone === 'quiet',
          'sb-button-danger': tone === 'danger',
          'w-full': fullWidth,
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
);

Button.displayName = 'Button';
