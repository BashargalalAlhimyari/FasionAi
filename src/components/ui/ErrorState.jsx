/**
 * ErrorState — inline error with burgundy accent, message, and retry.
 * Per design spec §1.5. Never shows raw technical error strings.
 */
import { AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from './Button';

export default function ErrorState({
  title,
  message,
  retryLabel,
  onRetry,
  className,
  // 'block' = full page centered, 'inline' = compact card-style
  variant = 'block',
}) {
  if (variant === 'inline') {
    return (
      <div
        className={cn(
          'flex items-start gap-3 p-4 rounded border border-error/30 bg-error/10',
          className
        )}
        role="alert"
      >
        <AlertCircle size={18} className="text-error shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1 flex-1">
          {title && <p className="text-body font-medium text-error">{title}</p>}
          {message && (
            <p className="text-caption text-text-on-dark-muted">{message}</p>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-caption text-accent-gold underline text-start mt-1 hover:text-accent-gold-hover"
            >
              {retryLabel || 'إعادة المحاولة'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Block variant — centered on page
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center gap-4 py-16 px-6',
        className
      )}
      role="alert"
    >
      <div className="w-16 h-16 rounded-full bg-error/10 border border-error/20 flex items-center justify-center mb-2">
        <AlertCircle size={32} className="text-error" strokeWidth={1.5} />
      </div>
      {title && <h3 className="text-heading-3 text-text-on-dark">{title}</h3>}
      {message && (
        <p className="text-body text-text-on-dark-muted max-w-sm">{message}</p>
      )}
      {onRetry && (
        <Button onClick={onRetry} className="mt-2">
          {retryLabel || 'إعادة المحاولة'}
        </Button>
      )}
    </div>
  );
}
