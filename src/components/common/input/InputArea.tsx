import { useEffect, useId, useImperativeHandle, useRef, useState } from "react";
import type { ChangeEvent, ComponentPropsWithRef } from "react";

type InputAreaProps = Omit<
  ComponentPropsWithRef<"textarea">,
  "children" | "defaultValue" | "value"
> & {
  defaultValue?: string;
  hasError?: boolean;
  value?: string;
};

const DEFAULT_MAX_LENGTH = 2000;

function getCharacterCount(value: string) {
  return value.replace(/\r\n?/g, "\n").length;
}

export default function InputArea({
  className = "",
  defaultValue,
  form,
  hasError = false,
  maxLength = DEFAULT_MAX_LENGTH,
  onChange,
  ref,
  value,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: InputAreaProps) {
  const countId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputLength, setInputLength] = useState(() =>
    getCharacterCount(defaultValue ?? ""),
  );
  const isControlled = value !== undefined;
  const characterCount = isControlled ? getCharacterCount(value) : inputLength;

  useImperativeHandle(ref, () => textareaRef.current!, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    const ownerForm = textarea?.form;
    if (!textarea || !ownerForm || isControlled) return;

    let frameId = 0;

    const handleReset = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        setInputLength(textarea.value.length);
      });
    };

    ownerForm.addEventListener("reset", handleReset);
    return () => {
      ownerForm.removeEventListener("reset", handleReset);
      cancelAnimationFrame(frameId);
    };
  }, [form, isControlled]);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    if (!isControlled) setInputLength(event.currentTarget.value.length);
    onChange?.(event);
  }

  return (
    <div
      className={
        "flex h-27 w-full min-w-0 flex-col gap-(--gap-small) rounded-(--radius-small) bg-bg-interactive-weak px-(--padding-xlarge) pt-(--padding-xlarge) pb-(--padding-large) focus-within:bg-bg-interactive-weak-focused " +
        className
      }
    >
      <textarea
        {...props}
        ref={textareaRef}
        form={form}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        onChange={handleChange}
        aria-describedby={
          ariaDescribedBy ? `${ariaDescribedBy} ${countId}` : countId
        }
        aria-invalid={hasError || ariaInvalid}
        className="type-input-medium min-h-0 w-full flex-1 resize-none bg-transparent text-fg-neutral-primary placeholder:text-fg-neutral-secondary placeholder:opacity-100 focus:outline-hidden"
      />
      <span
        id={countId}
        className="type-body-xsmall shrink-0 text-right text-fg-neutral-tertiary"
      >
        {characterCount}/{maxLength}
      </span>
    </div>
  );
}
