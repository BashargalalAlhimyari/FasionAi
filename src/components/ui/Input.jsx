/**
 * Input — design-system text input.
 * Dark bg, 6px radius, 1px neutral border → gold on focus.
 * Min 48px height for touch targets.
 */
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Input = forwardRef(function Input(
  { label, error, hint, className, containerClassName, ...props },
  ref
) {
  return (
    <div className={cn('flex flex-col gap-1', containerClassName)}>
      {label && (
        <label className="text-caption text-text-on-dark-muted font-medium">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full min-h-[48px] px-4 py-3 rounded text-body text-text-on-dark',
          'bg-secondary border transition-all duration-150',
          error
            ? 'border-error focus:border-error focus:ring-1 focus:ring-error'
            : 'border-border-neutral focus:border-accent-gold focus:ring-1 focus:ring-accent-gold',
          'placeholder:text-text-on-dark-muted',
          'outline-none',
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-caption text-error flex items-center gap-1">
          {error}
        </span>
      )}
      {hint && !error && (
        <span className="text-caption text-text-on-dark-muted">{hint}</span>
      )}
    </div>
  );
});

export default Input;
