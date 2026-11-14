import NoticeIcon from "../../assets/icons/notice-icon.svg?react";

interface ErrorMessageProps {
  message: string;
  id?: string;
  className?: string;
}

export default function ErrorMessage({
  message,
  id,
  className = "",
}: ErrorMessageProps) {
  return (
    <p
      id={id}
      className={`type-body-small flex min-w-0 items-center text-fg-accent-negative ${className}`}
    >
      <NoticeIcon aria-hidden="true" className="shrink-0" />
      <span className="wrap-anywhere">{message}</span>
    </p>
  );
}
