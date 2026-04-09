'use client';

import { cn } from '@habi/api';

const VARIANT_STYLES = {
  default: 'bg-white shadow-sm',
  outlined: 'bg-white border-2 border-gray-200',
  elevated: 'bg-white shadow-md',
} as const;

export type CardVariant = keyof typeof VARIANT_STYLES;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export default function Card({ variant = 'default', className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6',
        VARIANT_STYLES[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
