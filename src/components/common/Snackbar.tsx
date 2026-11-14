import type { ComponentPropsWithoutRef } from 'react';
import xIcon from '../../assets/icons/x-icon.svg';
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
      role="alert"
      className={`flex w-full max-w-[448px] items-center gap-[var(--gap-small)]
        rounded-[var(--radius-small)] bg-bg-neutral-inverse
        py-[var(--padding-large)] px-[var(--padding-xlarge)] ${className}`}
      {...rest}
    >
      <span className="flex size-6 shrink-0 items-center justify-center">
        <span className="flex size-[22px] items-center justify-center rounded-[var(--radius-full)] bg-[var(--palette-red-400)] p-1">
          <img src={xIcon} alt="" className="size-full" />
        </span>
      </span>

      <p className="flex-1 type-body-medium text-fg-neutral-inverse">{message}</p>

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
            icon={<img src={xIcon} alt="" className="size-full" />}
            aria-label="닫기"
            onClick={onClose}
          />
        </div>
      )}
    </div>
  );
}