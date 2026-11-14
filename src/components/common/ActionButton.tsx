import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface ActionButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'neutral' | 'brandInverse' | 'neutralInverse';
  size?: 'medium' | 'large';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const SIZE_STYLE = {
  medium: 'py-[var(--padding-medium)] px-[var(--padding-large)] gap-[var(--gap-xsmall)] type-action-small-strong',
  large: 'py-[var(--padding-medium)] px-[var(--padding-xlarge)] gap-[var(--gap-xsmall)] type-action-medium-strong',
};

const VARIANT_STYLE = {
  neutral: 'bg-bg-interactive-subtle text-fg-neutral-primary active:bg-bg-interactive-subtle-pressed',
  brandInverse: 'bg-bg-interactive-inverse text-fg-brand-inverse active:bg-bg-interactive-inverse-pressed',
  neutralInverse: 'bg-bg-interactive-inverse text-fg-neutral-inverse active:bg-bg-interactive-inverse-pressed',
};

export default function ActionButton({
  variant = 'neutral',
  size = 'medium',
  leftIcon,
  rightIcon,
  fullWidth = false,
  type = 'button',
  className = '',
  children,
  ...rest
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-small)]
        transition-colors disabled:cursor-not-allowed disabled:opacity-40
        ${SIZE_STYLE[size]} ${VARIANT_STYLE[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {leftIcon && <span className="flex size-5 items-center justify-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex size-5 items-center justify-center">{rightIcon}</span>}
    </button>
  );
}