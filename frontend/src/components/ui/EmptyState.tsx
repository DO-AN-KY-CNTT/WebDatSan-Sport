import React from 'react';
import { Inbox } from 'lucide-react';

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, action }) => (
  <div className="flex min-h-56 flex-col items-center justify-center px-6 py-12 text-center">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--sb-line)] bg-[#fffafa] text-[var(--sb-accent)]">
      <Inbox aria-hidden="true" className="h-5 w-5" />
    </div>
    <h2 className="text-base font-bold text-[var(--sb-ink)]">{title}</h2>
    {description && <p className="mt-2 max-w-md text-sm leading-6 text-[var(--sb-ink-3)]">{description}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);
