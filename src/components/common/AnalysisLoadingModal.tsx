import { useId, useLayoutEffect, useRef, type ReactNode } from "react";
import CloseIcon from "../../assets/icons/x-icon.svg?react";
import IconTextButton from "./IconTextButton";

interface AnalysisLoadingModalProps {
  isPending: boolean;
  currentStep?: string | null;
  cancelLabel?: string;
  animation?: ReactNode;
  onCancel?: () => void;
}

export default function AnalysisLoadingModal({
  isPending,
  cancelLabel = "분석 취소",
  animation,
  onCancel,
}: AnalysisLoadingModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();

    return () => dialog.close();
  }, [isPending]);

  if (!isPending) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        onCancel?.();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-144
        overflow-y-auto overscroll-contain rounded-[var(--radius-small)] bg-bg-neutral-default
        px-[var(--padding-2xlarge)] py-[var(--padding-3xlarge)] text-center
        focus:outline-none backdrop:bg-bg-neutral-scrim md:px-13"
    >
      <div className="flex min-h-79 flex-col items-center justify-center gap-[var(--gap-3xlarge)]">
        <div className="flex w-full flex-col gap-[var(--gap-small)] wrap-break-word">
          <h2
            id={titleId}
            className="type-heading-secondary text-fg-neutral-primary"
          >
            클라이언트 요청 사항을 분석하고 있어요
          </h2>
          <p
            id={descriptionId}
            className="type-body-medium text-fg-neutral-secondary"
          >
            현재 제작 기준과 비교해 제작 전 다시 확인해야 할 내용을 찾고 있어요.
          </p>
        </div>
        <div aria-hidden="true" className="h-25 w-full max-w-70 shrink-0">
          {animation}
        </div>
      </div>
      <IconTextButton
        aria-label={cancelLabel}
        className="absolute top-2 right-2 disabled:pointer-events-none"
        icon={<CloseIcon aria-hidden="true" />}
        disabled={!onCancel}
        onClick={onCancel}
      />
    </dialog>
  );
}
