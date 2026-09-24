import React, { useEffect, useId } from 'react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';
import clsx from 'clsx';

type ModalShellProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  description?: string;
};

export const ModalShell: React.FC<ModalShellProps> = ({ open, title, onClose, children, footer, size = 'md', description }) => {
  const titleId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="sb-dialog-backdrop" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={clsx(
          'sb-dialog',
          size === 'sm' && 'max-w-sm',
          size === 'lg' && 'max-w-3xl'
        )}
      >
        <div className="sb-dialog-header">
          <div className="min-w-0">
            <h2 id={titleId} className="text-base font-bold text-[var(--sb-ink)]">{title}</h2>
            {description && <p className="mt-1 text-xs leading-5 text-[var(--sb-ink-3)]">{description}</p>}
          </div>
          <IconButton label="Đóng cửa sổ" onClick={onClose}>
            <X aria-hidden="true" className="h-4 w-4" />
          </IconButton>
        </div>
        <div className="sb-dialog-body">{children}</div>
        {footer && <div className="sb-dialog-footer">{footer}</div>}
      </div>
    </div>
  );
};
