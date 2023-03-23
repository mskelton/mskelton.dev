import clsx from "clsx"
import { Children, cloneElement, forwardRef } from "react"

export interface HeaderIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType
  children: React.ReactElement | React.ReactElement[]
  href?: string
  target?: string
}

const HeaderIconButton = forwardRef<HTMLButtonElement, HeaderIconButtonProps>(
  function HeaderIconButton(
    { as: Component = "button", children, ...props },
    ref
  ) {
    return (
      <Component
        ref={ref}
        className="rounded-full p-2 text-zinc-800 transition-colors hover:text-indigo-600 dark:text-zinc-200 dark:hover:text-indigo-400"
        type={props.href ? undefined : "button"}
        {...props}
      >
        {Children.map(children, (child) =>
          cloneElement(child, {
            className: clsx("w-5 h-5", child.props.className),
          })
        )}
      </Component>
    )
  }
)

export default HeaderIconButton