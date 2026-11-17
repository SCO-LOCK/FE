import type { ComponentPropsWithoutRef } from 'react';
import ScoBadge from '../../assets/icons/sco-badge.svg?react';

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
    <span className={`flex w-full min-w-0 flex-col gap-(--gap-xsmall) text-left md:flex-row md:items-start md:gap-(--gap-medium) ${className}`} {...rest}>
      <span className="shrink-0 type-body-medium text-fg-neutral-secondary md:w-37.5">
        {title}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-(--gap-xsmall) wrap-anywhere break-keep">
        <span className="type-body-medium text-fg-neutral-primary">{content}</span>
        {message && (
          <span className="flex items-start gap-[var(--gap-xsmall)]">
            <ScoBadge aria-hidden="true" className="size-6 shrink-0" />
            <span className="min-w-0 type-body-medium text-fg-accent-positive">{message}</span>
          </span>
        )}
      </span>
    </span>
  );
}
