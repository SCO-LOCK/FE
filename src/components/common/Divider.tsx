const DIVIDER_TYPE_CLASSES = {
  horizontal: "h-(--border-weight-thin) w-full",
};

type DividerType = keyof typeof DIVIDER_TYPE_CLASSES;

interface DividerProps {
  type?: DividerType;
  className?: string;
}

export default function Divider({
  type = "horizontal",
  className = "",
}: DividerProps) {
  return (
    <hr className={`shrink-0 border-0 bg-border-neutral-subtle ${DIVIDER_TYPE_CLASSES[type]} ${className}`} />
  );
}
