/**
 * Card — design-system surface card.
 * Uses CSS var --color-bg-card so it auto-adapts to dark/light mode.
 */
import { cn } from '../../lib/utils';

export default function Card({ children, className, elevated = false, ...props }) {
  return (
    <div
      className={cn(
        'rounded border shadow-card transition-colors duration-150',
        elevated
          ? 'bg-secondary-alt'
          : 'bg-secondary',
        'border-[rgba(255,255,255,0.08)]',
        'p-5 md:p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
