/**
 * AILoadingComponent — brand-critical loading state for all AI generation waits.
 * Shows a slow-moving gold shimmer line + rotating context-aware Arabic copy.
 * Per design spec §1.6: never use a generic spinner.
 *
 * Props:
 *   messages  — array of Arabic strings to cycle through (defaults to ar.json ai.loading)
 *   intervalMs — how fast to rotate messages (default 2800ms)
 */
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { useT } from '../../hooks/useT';

export default function AILoadingComponent({
  messages: customMessages,
  intervalMs = 2800,
  className,
}) {
  const t = useT();
  const messages = customMessages || t('ai.loading');
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      // fade out → change → fade in
      setVisible(false);
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 350);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [messages.length, intervalMs]);

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-6 py-12 px-6',
        className
      )}
      role="status"
      aria-live="polite"
      aria-label="جاري تحميل التصميم"
    >
      {/* Gold shimmer bar */}
      <div className="relative w-48 h-[3px] rounded-full overflow-hidden bg-secondary-alt">
        <div
          className="absolute inset-y-0 w-1/2 rounded-full gold-shimmer-bg"
          style={{
            animation: 'gold-shimmer 2s linear infinite',
          }}
        />
      </div>

      {/* Brand mark — pulsing gold dots */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse-gold"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>

      {/* Rotating Arabic copy */}
      <p
        className={cn(
          'text-body text-text-on-dark-muted text-center max-w-xs',
          'transition-opacity duration-300 ease',
          visible ? 'opacity-100' : 'opacity-0'
        )}
        aria-atomic="true"
      >
        {messages[idx]}
      </p>
    </div>
  );
}
