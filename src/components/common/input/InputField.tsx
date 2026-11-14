import { useId } from "react";
import type { ComponentProps } from "react";
import ErrorMessage from "../ErrorMessage";
import Input from "./internal/Input";
import InputArea from "./internal/InputArea";

type SharedInputProp = "id" | "required" | "hasError";

type InputFieldProps = {
  id?: string;
  label?: string;
  required?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  className?: string;
} & (
  | {
      variant?: "input";
      inputProps?: Omit<ComponentProps<typeof Input>, SharedInputProp>;
    }
  | {
      variant: "textarea";
      inputProps?: Omit<ComponentProps<typeof InputArea>, SharedInputProp>;
    }
);

const DEFAULT_ARIA_LABELS = {
  input: "한 줄 입력",
  textarea: "여러 줄 입력",
};

export default function InputField(props: InputFieldProps) {
  const generatedId = useId();
  const {
    id = generatedId,
    label,
    required = false,
    hasError = false,
    errorMessage,
    className = "",
  } = props;
  const errorId = `${id}-error`;
  const descriptionId = props.inputProps?.["aria-describedby"];
  const describedBy = errorMessage
    ? [descriptionId, errorId].filter(Boolean).join(" ")
    : descriptionId;
  const hasVisibleLabel = Boolean(label?.trim());
  const hasAccessibleName =
    hasVisibleLabel ||
    Boolean(
      props.inputProps?.["aria-label"]?.trim() ||
        props.inputProps?.["aria-labelledby"]?.trim(),
    );
  const sharedInputProps = {
    ...(!hasAccessibleName && {
      "aria-label": DEFAULT_ARIA_LABELS[props.variant ?? "input"],
    }),
    id,
    required,
    hasError: hasError || Boolean(errorMessage),
    "aria-describedby": describedBy,
  };

  return (
    <div className={`flex min-w-0 flex-col gap-(--gap-small) ${className}`}>
      {hasVisibleLabel && (
        <label
          htmlFor={id}
          className="type-body-small-strong flex items-baseline gap-(--gap-xsmall) text-fg-neutral-primary"
        >
          {label}
          {required && (
            <span aria-hidden="true" className="text-fg-accent-notice">
              *
            </span>
          )}
        </label>
      )}
      {props.variant === "textarea" ? (
        <InputArea {...props.inputProps} {...sharedInputProps} />
      ) : (
        <Input {...props.inputProps} {...sharedInputProps} />
      )}
      {errorMessage && <ErrorMessage id={errorId} message={errorMessage} />}
    </div>
  );
}
