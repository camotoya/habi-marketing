'use client';

import { forwardRef } from 'react';
import { cn } from '@habi/api';

const VARIANT_STYLES = {
  primary:
    'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus-visible:ring-purple-600',
  outline:
    'border-2 border-purple-600 text-purple-600 bg-transparent hover:bg-purple-50 active:bg-purple-100 focus-visible:ring-purple-600',
  ghost:
    'text-purple-600 bg-transparent hover:bg-purple-50 active:bg-purple-100 focus-visible:ring-purple-600',
  destructive:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-600',
} as const;

const SIZE_STYLES = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-base rounded-xl',
  lg: 'px-7 py-3.5 text-lg rounded-xl',
} as const;

export type ButtonVariant = keyof typeof VARIANT_STYLES;
export type ButtonSize = keyof typeof SIZE_STYLES;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          VARIANT_STYLES[variant],
          SIZE_STYLES[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
