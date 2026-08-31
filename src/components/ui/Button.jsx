/**
 * Button — design-system primary/secondary/ghost button.
 *
 * Variants:
 *   primary  — solid accent-gold bg, dark text (default)
 *   secondary — transparent bg, gold border + gold text
 *   ghost    — no border, muted gold text
 *   danger   — error-tinted, for destructive actions
 *
 * Sizes:
 *   md (default) — 48px min-height
 *   sm           — 36px min-height
 *   lg           — 56px min-height
 */
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold text-[15px] ' +
  'rounded transition-all duration-150 ease select-none ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'disabled:opacity-40 disabled:pointer-events-none';

const variants = {
  primary:
    'bg-accent-gold text-primary border border-border-gold ' +
    'hover:bg-accent-gold-hover active:scale-[0.97] active:opacity-90',
  secondary:
    'bg-transparent text-accent-gold border border-accent-gold ' +
    'hover:bg-[rgba(156,122,46,0.08)] active:scale-[0.97]',
  ghost:
    'bg-transparent text-accent-gold-muted border-transparent ' +
    'hover:text-accent-gold hover:bg-[rgba(156,122,46,0.06)]',
  danger:
    'bg-transparent text-error border border-error ' +
    'hover:bg-[rgba(140,59,59,0.10)] active:scale-[0.97]',
};

const sizes = {
  sm: 'min-h-[36px] px-4 py-1.5',
  md: 'min-h-[48px] px-6 py-3',
  lg: 'min-h-[56px] px-8 py-4',
};

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    className,
    children,
    loading = false,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-accent-gold border-t-transparent animate-spin" />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
});

export default Button;
