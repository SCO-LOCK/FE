import type { ComponentPropsWithoutRef } from 'react';

interface StepperItemProps extends ComponentPropsWithoutRef<'div'> {
  step: number;
  label: string;
  selected?: boolean;
}

export default function StepperItem({
  step,
  label,
  selected = false,
  className = '',
  ...rest
}: StepperItemProps) {
  return (
    <div
      aria-current={selected ? 'step' : undefined}
      className={`group inline-flex h-8 items-center gap-[var(--gap-small)] whitespace-nowrap
        rounded-[var(--radius-small)] bg-bg-interactive-transparent
        py-[var(--padding-xsmall)] px-[var(--padding-small)] ${className}`}
      {...rest}
    >
      <span className="flex size-6 items-center justify-center">
        <span
          className={`flex size-[22px] items-center justify-center rounded-[var(--radius-full)] type-body-small
            ${selected ? 'bg-bg-neutral-inverse text-fg-brand-inverse' : 'bg-bg-neutral-muted text-fg-neutral-secondary'}`}
        >
          {step}
        </span>
      </span>
      <span
        className={`type-body-medium transition-all duration-100 ease-out group-hover:type-body-large
          ${selected ? 'text-fg-neutral-primary' : 'text-fg-neutral-secondary'}`}
      >
        {label}
      </span>
    </div>
  );
}