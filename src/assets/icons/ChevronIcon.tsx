import type { ComponentPropsWithoutRef } from "react";

interface ChevronIconProps extends ComponentPropsWithoutRef<"svg"> {
  direction?: "right" | "down";
}

export default function ChevronIcon({
  direction = "right",
  ...props
}: ChevronIconProps) {
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
        d="M9.5 18L16 11.5L9.5 5"
        stroke="currentColor"
        strokeWidth="2"
        // This pivot preserves the dropdown icon's offset in the Figma viewBox.
        transform={direction === "down" ? "rotate(90 12.25 10.75)" : undefined}
      />
    </svg>
  );
}
