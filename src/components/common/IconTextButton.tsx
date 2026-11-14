import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface IconTextButtonProps extends ComponentPropsWithoutRef<'button'> {
  size?: 'medium' | 'large';
  icon?: ReactNode;
  label?: string;
}

const SIZE_STYLE = {
  medium: 'h-10 min-w-10 px-[var(--padding-small)]',
  large: 'h-11 min-w-11 px-[var(--padding-small)]',
};

export default function IconTextButton({
  size = 'medium',
  icon,
  label,
  type = 'button',
  className = '',
  ...rest
}: IconTextButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-[var(--gap-xsmall)] whitespace-nowrap
        rounded-[var(--radius-small)] transition type-action-xlarge-strong text-fg-neutral-primary
        bg-bg-interactive-transparent hover:bg-bg-interactive-transparent-hover
        active:scale-95 active:bg-bg-interactive-transparent-pressed
        ${SIZE_STYLE[size]} ${className}`}
      {...rest}
    >
      {icon && <span className="flex size-6 items-center justify-center">{icon}</span>}
      {label}
    </button>
  );
}