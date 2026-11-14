import type { ComponentPropsWithoutRef } from "react";
import ArrowLineSvg from "./arrow-line-icon.svg?react";

interface ArrowLineIconProps extends ComponentPropsWithoutRef<"svg"> {
  direction?: "left" | "right";
}

export default function ArrowLineIcon({
  direction = "right",
  className,
  ...props
}: ArrowLineIconProps) {
  return (
    <ArrowLineSvg
      aria-hidden="true"
      className={direction === "left" ? `origin-center -scale-x-100 ${className ?? ""}` : className}
      {...props}
    />
  );
}
