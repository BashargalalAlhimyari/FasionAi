/**
 * ProgressBar — 7-step wizard progress bar.
 * Thin 3px gold line on dark track. Animated width (400ms ease).
 * Shows step count as caption below the bar.
 */
import { cn } from '../../lib/utils';
import { useT } from '../../hooks/useT';

export default function ProgressBar({
  current,
  total,
  stepLabel,
  className,
}) {
  const t = useT();
  const percent = Math.round((current / total) * 100);

  return (
    <div className={cn('w-full', className)}>
      {/* Track */}
      <div className="w-full h-[3px] bg-secondary-alt rounded-full overflow-hidden">
        <div
          className="h-full gold-shimmer-bg rounded-full transition-[width] duration-[400ms] ease"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={total}
        />
      </div>

      {/* Step label */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-caption text-text-on-dark-muted">
          {t('designWizard.step', { current, total })}
        </span>
        {stepLabel && (
          <span className="text-caption text-accent-gold font-medium">
            {stepLabel}
          </span>
        )}
      </div>
    </div>
  );
}
