import { useId } from "react";
import type { ComponentProps } from "react";
import ErrorMessage from "../ErrorMessage";
import Input from "./Input";
import InputArea from "./InputArea";

type SharedInputProp = "id" | "required" | "hasError";

type FieldProps = {
  id?: string;
  label?: string;
  required?: boolean;
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

export default function Field(props: FieldProps) {
  const generatedId = useId();
  const {
    id = generatedId,
    label,
    required = false,
    errorMessage,
    className = "",
  } = props;
  const hasError = Boolean(errorMessage);
  const errorId = `${id}-error`;
  const descriptionId = props.inputProps?.["aria-describedby"];
  const describedBy = errorMessage
    ? [descriptionId, errorId].filter(Boolean).join(" ")
    : descriptionId;
  const sharedInputProps = {
    id,
    required,
    hasError,
    "aria-describedby": describedBy,
  };

  return (
    <div className={`flex min-w-0 flex-col gap-(--gap-small) ${className}`}>
      {label && (
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
