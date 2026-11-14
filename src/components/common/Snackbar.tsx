import type { ComponentPropsWithoutRef } from 'react';
import FailBadge from '../../assets/icons/fail-badge.svg?react';
import CloseIcon from '../../assets/icons/x-icon-inverse.svg?react';
import IconTextButton from './IconTextButton';

interface SnackbarProps extends ComponentPropsWithoutRef<'div'> {
  message: string;
  retryLabel?: string;
  onRetry?: () => void;
  onClose?: () => void;
}

export default function Snackbar({
  message,
  retryLabel = '다시 시도',
  onRetry,
  onClose,
  className = '',
  ...rest
}: SnackbarProps) {
  return (
    <div
      className={`flex w-full max-w-[448px] items-center gap-[var(--gap-small)]
        rounded-[var(--radius-small)] bg-bg-neutral-inverse
        py-[var(--padding-large)] px-[var(--padding-xlarge)] ${className}`}
      {...rest}
    >
      <FailBadge aria-hidden="true" className="shrink-0" />

      <p role="alert" className="flex-1 type-body-medium text-fg-neutral-inverse">{message}</p>

      {onRetry && (
        <div className="flex h-6 items-center">
          <IconTextButton
            size="medium"
            label={retryLabel}
            onClick={onRetry}
            className="text-fg-accent-inverse-negative!"
          />
        </div>
      )}

      {onClose && (
        <div className="flex h-6 items-center">
          <IconTextButton
            size="large"
            icon={<CloseIcon aria-hidden="true" />}
            aria-label="닫기"
            onClick={onClose}
          />
        </div>
      )}
    </div>
  );
}
