'use client'

import clsx from 'clsx'
import { Children, cloneElement, forwardRef } from 'react'
import { Button, ButtonProps } from 'react-aria-components'

export interface HeaderIconButtonProps extends ButtonProps {
  as?: React.ElementType
  children:
    | React.ReactElement<{ className?: string }>
    | React.ReactElement<{ className?: string }>[]
  href?: string
  target?: string
}

export const HeaderIconButton = forwardRef<
  HTMLButtonElement,
  HeaderIconButtonProps
>(function HeaderIconButton(
  { as: Component = Button, children, className, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={clsx('group focusable rounded-full p-2', className)}
      type={props.href ? undefined : 'button'}
      {...props}
    >
      {Children.map(children, (child) =>
        cloneElement(child, {
          className: clsx(
            'size-5 text-zinc-700 transition-colors group-hover:text-black dark:text-zinc-300 dark:group-hover:text-white',
            child.props.className,
          ),
        }),
      )}
    </Component>
  )
})
