import clsx from "clsx"

export interface ToolContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export default function ToolContainer({
  className,
  ...props
}: ToolContainerProps) {
  return <div className={clsx("px-12", className)} {...props} />
}
