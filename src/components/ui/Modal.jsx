/**
 * Modal — design-system dialog.
 * Desktop: centered overlay with backdrop blur.
 * Mobile: bottom-sheet (slides up from bottom).
 * Uses @radix-ui/react-dialog for accessible focus-trapping.
 */
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  // If true, renders as a bottom sheet on all viewports (for action sheets)
  bottomSheet = false,
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm',
            'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out'
          )}
        />

        {/* Panel */}
        <Dialog.Content
          className={cn(
            'fixed z-50 outline-none',
            'bg-secondary border border-[rgba(255,255,255,0.08)] shadow-modal',
            // Desktop: centered
            !bottomSheet &&
              'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' +
              'w-full max-w-lg rounded-lg p-6 ' +
              'data-[state=open]:animate-fade-in',
            // Mobile bottom-sheet (overrides desktop at sm breakpoint when bottomSheet=true)
            bottomSheet &&
              'bottom-0 left-0 right-0 rounded-t-lg p-6 ' +
              'data-[state=open]:animate-slide-up ' +
              'sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 ' +
              'sm:bottom-auto sm:rounded-lg sm:max-w-lg',
            className
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              {title && (
                <Dialog.Title className="text-heading-3 text-text-on-dark">
                  {title}
                </Dialog.Title>
              )}
              {description && (
                <Dialog.Description className="text-body text-text-on-dark-muted mt-1">
                  {description}
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close asChild>
              <button
                className="text-text-on-dark-muted hover:text-text-on-dark transition-colors p-1 rounded"
                aria-label="إغلاق"
              >
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          {/* Content */}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** Re-export Dialog.Trigger for convenience */
export const ModalTrigger = Dialog.Trigger;
export const ModalClose = Dialog.Close;
