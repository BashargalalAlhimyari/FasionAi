/**
 * EmptyState — centered empty screen with icon, headline, body, and CTA.
 * Per design spec §1.5.
 */
import { cn } from '../../lib/utils';
import Button from './Button';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        'gap-4 py-16 px-6',
        className
      )}
    >
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-secondary-alt flex items-center justify-center mb-2">
          <Icon
            size={32}
            className="text-accent-gold-muted"
            strokeWidth={1.5}
          />
        </div>
      )}
      <h3 className="text-heading-3 text-text-on-dark max-w-xs">{title}</h3>
      {description && (
        <p className="text-body text-text-on-dark-muted max-w-sm">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
