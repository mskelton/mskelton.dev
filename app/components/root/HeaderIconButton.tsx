import clsx from "clsx"
import { Children, cloneElement, forwardRef } from "react"
import { Button, ButtonProps } from "react-aria-components"

export interface HeaderIconButtonProps extends ButtonProps {
  as?: React.ElementType
  children: React.ReactElement | React.ReactElement[]
  href?: string
  target?: string
}

export const HeaderIconButton = forwardRef<
  HTMLButtonElement,
  HeaderIconButtonProps
>(function HeaderIconButton(
  { as: Component = Button, children, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      className="group rounded-full p-2 focusable"
      type={props.href ? undefined : "button"}
      {...props}
    >
      {Children.map(children, (child) =>
        cloneElement(child, {
          className: clsx(
            "size-5 text-zinc-700 transition-colors group-hover:text-black dark:text-zinc-300 dark:group-hover:text-white",
            child.props.className,
          ),
        }),
      )}
    </Component>
  )
})

export default HeaderIconButton
