import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import noticeBadge from '../../assets/icons/notice-badge.svg';   // (!) 그림

interface ReportCardProps extends ComponentPropsWithoutRef<'section'> {
  title: string;     
  footer?: ReactNode;  
}

export default function ReportCard({ title, footer, children, className = '', ...rest }: ReportCardProps) {
  return (
    <section className={`flex flex-col gap-[var(--gap-xsmall)] ${className}`} {...rest}>

      <div className="flex flex-col gap-[var(--gap-2xlarge)] rounded-[var(--radius-small)]
        bg-bg-neutral-weak p-[var(--padding-2xlarge)]">

        <div className="flex items-center gap-[var(--gap-small)]">
          <span className="flex size-7 shrink-0 items-center justify-center">
            <img src={noticeBadge} alt="" className="size-[22px]" />
          </span>
          <h3 className="flex-1 type-heading-tertiary text-fg-neutral-primary">{title}</h3>
        </div>

        <div className="flex flex-col gap-[var(--gap-medium)]">{children}</div>
      </div>

      {footer}
    </section>
  );
}