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
}: IconTextButtonProps)
 {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-[var(--gap-xsmall)] whitespace-nowrap
        rounded-[var(--radius-small)] transition
        text-[length:var(--font-size-large)] font-semibold leading-[1.4]
        tracking-[var(--typography-letter-spacing-default)] text-[color:var(--fg-neutral-primary)]
        bg-[var(--bg-interactive-transparent)]
        hover:bg-[var(--bg-interactive-transparent-hover)]
        active:scale-95 active:bg-[var(--bg-interactive-transparent-pressed)]
        ${SIZE_STYLE[size]} ${className}`}
      {...rest}
    >
      {icon && <span className="flex size-6 items-center justify-center">{icon}</span>}
      {label}
    </button>
  );
}