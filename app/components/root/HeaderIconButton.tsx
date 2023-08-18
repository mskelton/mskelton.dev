import clsx from "clsx"
import { Children, cloneElement, forwardRef } from "react"

export interface HeaderIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>
{
  as?: React.ElementType
  children: React.ReactElement | React.ReactElement[]
  href?: string
  target?: string
}

const HeaderIconButton = forwardRef<HTMLButtonElement, HeaderIconButtonProps>(
  function HeaderIconButton(
    { as: Component = "button", children, ...props },
    ref,
  ) {
    return (
      <Component
        ref={ref}
        className="group rounded-full p-2"
        type={props.href ? undefined : "button"}
        {...props}
      >
        {Children.map(children, (child) =>
          cloneElement(child, {
            className: clsx(
              "w-5 h-5 text-zinc-700 transition-colors group-hover:text-black dark:text-zinc-300 dark:group-hover:text-white",
              child.props.className,
            ),
          }))}
      </Component>
    )
  },
)

export default HeaderIconButton
