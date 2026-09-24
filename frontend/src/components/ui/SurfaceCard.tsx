import React from 'react';
import clsx from 'clsx';

type SurfaceCardProps = React.HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'section' | 'article' | 'aside';
  muted?: boolean;
};

export const SurfaceCard: React.FC<SurfaceCardProps> = ({ as = 'div', muted = false, className, children, ...props }) => {
  const Component = as;
  return (
    <Component
      className={clsx('sb-surface', muted && 'bg-[#fffafa]', className)}
      {...props}
    >
      {children}
    </Component>
  );
};
