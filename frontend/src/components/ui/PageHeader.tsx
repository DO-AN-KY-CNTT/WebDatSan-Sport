import React from 'react';
import clsx from 'clsx';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, description, action, className }) => (
  <header className={clsx('sb-page-header', className)}>
    <div className="min-w-0">
      {eyebrow && <p className="sb-kicker mb-2">{eyebrow}</p>}
      <h1 className="sb-title">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--sb-ink-2)]">{description}</p>}
    </div>
    {action && <div className="flex shrink-0 flex-wrap items-center gap-2">{action}</div>}
  </header>
);
