/* eslint-disable react/display-name */
import { ElementType, forwardRef, FunctionComponent, Ref } from "react"
import { AllowableAny } from "./types"

function titleCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

interface StyledComponent<T> extends FunctionComponent<T> {
  use(className: string): StyledComponent<T>
}

const cx = (...classNames: (string | undefined)[]) =>
  classNames.filter((x) => x).join(" ")

function createdStyledComponent(
  Component: ElementType,
  displayName: string,
  outerClassName?: string
) {
  const StyledComponent = forwardRef(
    (props: { className?: string }, ref: Ref<HTMLElement>) => (
      <Component
        {...props}
        ref={ref}
        className={cx(outerClassName, props.className)}
      />
    )
  )

  StyledComponent.displayName = displayName
  ;(StyledComponent as AllowableAny).use = (className: string) =>
    createdStyledComponent(
      Component,
      displayName,
      cx(outerClassName, className)
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
