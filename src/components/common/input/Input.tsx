import type { ComponentPropsWithRef } from "react";

type InputProps = Omit<ComponentPropsWithRef<"input">, "children" | "type"> & {
  hasError?: boolean;
  type?: "text" | "email" | "password" | "search" | "tel" | "url" | "number";
};

export default function Input({
  hasError = false,
  type = "text",
  className = "",
  "aria-invalid": ariaInvalid,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      type={type}
      aria-invalid={hasError || ariaInvalid}
      className={
        "type-input-medium h-(--measurement-52) w-full min-w-0 truncate rounded-(--radius-small) bg-bg-interactive-weak p-(--padding-medium) text-fg-neutral-primary placeholder:text-fg-neutral-secondary placeholder:opacity-100 focus:bg-bg-interactive-weak-focused focus:outline-hidden aria-invalid:bg-bg-interactive-negative aria-invalid:focus:bg-bg-interactive-negative-focused " +
        className
      }
    />
  );
}
