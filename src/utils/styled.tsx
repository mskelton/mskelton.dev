/* eslint-disable react/display-name */
import { ElementType, forwardRef, FunctionComponent, Ref } from "react"
import { AllowableAny } from "./types"

function titleCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

interface StyledComponent<T> extends FunctionComponent<T> {
  attr(name: string, value: unknown): StyledComponent<T>
  use(className: string): StyledComponent<T>
}

const cx = (...classNames: (string | undefined)[]) =>
  classNames.filter((x) => x).join(" ")

interface Props {
  className?: string
}

function createdStyledComponent(
  Component: ElementType,
  displayName: string,
  outerProps: Record<string, unknown> = {},
  outerClassName?: string
) {
  const StyledComponent = forwardRef(
    ({ className, ...props }: Props, ref: Ref<HTMLElement>) => (
      <Component
        ref={ref}
        className={cx(outerClassName, className)}
        {...outerProps}
        {...props}
      />
    )
  )

  StyledComponent.displayName = displayName
  ;(StyledComponent as AllowableAny).use = (className: string) =>
    createdStyledComponent(
      Component,
      displayName,
      outerProps,
      cx(outerClassName, className)
    )
  ;(StyledComponent as AllowableAny).attr = (name: string, value: unknown) =>
    createdStyledComponent(
      Component,
      displayName,
      { ...outerProps, [name]: value },
      outerClassName
    )

  return StyledComponent
}

type Styled = {
  [key in keyof JSX.IntrinsicElements]: StyledComponent<
    JSX.IntrinsicElements[key]
  >
}

const styled = new Proxy({} as Styled, {
  get(_, property: string) {
    return createdStyledComponent(
      property as ElementType,
      `Styled${titleCase(property)}`
    )
  },
})

export default styled
