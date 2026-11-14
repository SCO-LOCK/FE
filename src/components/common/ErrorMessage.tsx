import noticeIcon from "../../assets/icons/notice.svg";

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
      <span className="grid size-(--measurement-24) shrink-0 place-items-center">
        <img src={noticeIcon} alt="" className="rotate-180" />
      </span>
      <span className="wrap-anywhere">{message}</span>
    </p>
  );
}
