import clsx from "clsx"

export interface EditorProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  as?: React.ElementType
}

export default function Editor({
  as: Component = "textarea",
  className,
  ...props
}: EditorProps) {
  return (
    <Component
      className={clsx(
        "resize-none rounded-lg px-4 py-3 font-mono text-sm outline-none dark:bg-zinc-950 dark:text-white",
        className,
      )}
      {...props}
    />
  )
}
