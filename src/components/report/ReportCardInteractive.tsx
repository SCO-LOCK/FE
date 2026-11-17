import type { ComponentPropsWithoutRef } from "react";
import CopyIcon from "../../assets/icons/copy-icon.svg?react";
import ReportCardItem from "./ReportCardItem";

interface ReportCardInteractiveProps extends ComponentPropsWithoutRef<"button"> {
  title: string;
  content: string;
}

export default function ReportCardInteractive({
  title,
  content,
  type = "button",
  className = "",
  ...rest
}: ReportCardInteractiveProps) {
  return (
    <button
      type={type}
      className={`cursor-pointer group w-full transition-all duration-100
        hover:p-[var(--padding-xsmall)] active:p-[var(--padding-xsmall)] ${className}`}
      {...rest}
    >
      <span
        className="flex items-center gap-[var(--gap-small)] rounded-[var(--radius-small)]
        bg-bg-interactive-weak py-[var(--padding-xlarge)] pr-[var(--padding-xlarge)] pl-[var(--padding-2xlarge)]
        transition-all duration-100
        group-hover:gap-[var(--gap-xsmall)] group-hover:py-[var(--padding-large)]
        group-active:gap-[var(--gap-xsmall)] group-active:py-[var(--padding-large)]
        group-active:bg-bg-interactive-weak-pressed"
      >
        <ReportCardItem title={title} content={content} />
        <CopyIcon
          aria-hidden="true"
          className="size-6 shrink-0 text-fg-neutral-secondary"
        />
        <span className="sr-only">복사하기</span>
      </span>
    </button>
  );
}
