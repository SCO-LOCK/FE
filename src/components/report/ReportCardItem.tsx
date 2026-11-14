import type { ComponentPropsWithoutRef } from 'react';
import scoBadge from '../../assets/icons/sco-badge.svg';

interface ReportCardItemProps extends ComponentPropsWithoutRef<'span'> {
  title: string;
  content: string;
  message?: string;
}

export default function ReportCardItem({
  title,
  content,
  message,
  className = '',
  ...rest
}: ReportCardItemProps) {
  return (
    <span className={`flex w-full items-start gap-[var(--gap-medium)] text-left ${className}`} {...rest}>
      <span className="w-[150px] shrink-0 type-body-medium text-fg-neutral-secondary">{title}</span>
      <span className="flex flex-1 flex-col gap-[var(--gap-xsmall)]">
        <span className="type-body-medium text-fg-neutral-primary">{content}</span>
        {message && (
          <span className="flex items-start gap-[var(--gap-xsmall)]">
            <img src={scoBadge} alt="" className="size-6 shrink-0" />
            <span className="type-body-medium text-fg-accent-positive">{message}</span>
          </span>
        )}
      </span>
    </span>
  );
}