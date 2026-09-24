import React from 'react';
import { EmptyState } from './EmptyState';
import { LoadingState } from './LoadingState';

type DataTableShellProps = {
  loading: boolean;
  empty: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  children: React.ReactNode;
};

export const DataTableShell: React.FC<DataTableShellProps> = ({
  loading,
  empty,
  emptyTitle = 'Không có dữ liệu phù hợp',
  emptyDescription,
  children,
}) => (
  <div className="sb-table-wrap">
    {loading ? <LoadingState compact /> : empty ? <EmptyState title={emptyTitle} description={emptyDescription} /> : children}
  </div>
);
