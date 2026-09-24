import React from 'react';
import clsx from 'clsx';

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const FormField: React.FC<FormFieldProps> = ({ label, htmlFor, hint, error, required, className, children }) => (
  <div className={clsx('space-y-1.5', className)}>
    <label htmlFor={htmlFor} className="sb-field-label">
      {label} {required && <span className="text-[var(--sb-danger)]">*</span>}
    </label>
    {children}
    {error ? <p className="text-xs text-[var(--sb-danger)]">{error}</p> : hint && <p className="text-xs text-[var(--sb-ink-3)]">{hint}</p>}
  </div>
);
