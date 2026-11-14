import type { ComponentPropsWithoutRef } from "react";
import InformationIconSvg from "./information-icon.svg?react";

type StatusIconProps = ComponentPropsWithoutRef<"svg">;

export function InformationIcon(props: StatusIconProps) {
  return <InformationIconSvg aria-hidden="true" {...props} />;
}

export function NoticeIcon({ className, ...props }: StatusIconProps) {
  return (
    <InformationIcon
      className={`origin-center rotate-180 ${className ?? ""}`}
      {...props}
    />
  );
}
