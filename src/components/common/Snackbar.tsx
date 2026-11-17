import type { ComponentPropsWithoutRef } from 'react';
import FailBadge from '../../assets/icons/fail-badge.svg?react';
import SuccessBadge from '../../assets/icons/SuccessBadge';
import CloseIcon from '../../assets/icons/x-icon.svg?react';
import IconTextButton from './IconTextButton';

interface SnackbarProps extends ComponentPropsWithoutRef<'div'> {
  message: string;
  variant?: 'success' | 'error';
  retryLabel?: string;
  onRetry?: () => void;
  onClose?: () => void;
}

export default function Snackbar({
  message,
  variant = 'error',
  retryLabel = '다시 시도',
  onRetry,
  onClose,
  className = '',
  ...rest
}: SnackbarProps) {
  return (
    <div
      className={`flex ${variant === 'success' ? 'w-fit' : 'w-full'} max-w-[min(448px,calc(100vw-2rem))] items-center gap-[var(--gap-small)]
        rounded-[var(--radius-small)] bg-bg-neutral-inverse
        py-[var(--padding-large)] px-[var(--padding-xlarge)] ${className}`}
      {...rest}
    >
      {variant === 'success' ? (
        <SuccessBadge aria-hidden="true" className="shrink-0" />
      ) : (
        <FailBadge aria-hidden="true" className="shrink-0" />
      )}

      <p
        role={variant === 'success' ? 'status' : 'alert'}
        className="min-w-0 flex-1 wrap-break-word type-body-medium text-fg-neutral-inverse"
      >
        {message}
      </p>

      {variant === 'error' && onRetry && (
        <div className="flex h-6 shrink-0 items-center">
          <IconTextButton
            size="medium"
            label={retryLabel}
            onClick={onRetry}
            className="text-fg-accent-inverse-negative!"
          />
        </div>
      )}

      {onClose && (
        <div className="flex h-6 shrink-0 items-center">
          <IconTextButton
            size="large"
            icon={<CloseIcon aria-hidden="true" className="text-fg-neutral-inverse" />}
            aria-label="닫기"
            onClick={onClose}
          />
        </div>
      )}
    </div>
  );
}
