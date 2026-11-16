import type { ComponentPropsWithoutRef } from "react";
import CheckIcon from "./check-icon.svg?react";

export default function SuccessBadge(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z"
        className="fill-fg-accent-positive"
      />
      <CheckIcon className="text-fg-neutral-inverse" />
    </svg>
  );
}
