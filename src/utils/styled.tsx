import { ComponentPropsWithoutRef, ElementType, FunctionComponent } from "react"

function titleCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

type CreatedStyled = {
  [key in keyof JSX.IntrinsicElements]: (
    className: string
  ) => FunctionComponent<ComponentPropsWithoutRef<key>>
}

export const styled = new Proxy({} as CreatedStyled, {
  get(_, property: string) {
    const Component = property as ElementType

    return (className: string) => {
      const StyledComponent = (props: { className?: string }) => (
        <Component
          {...props}
          className={[className, props.className].filter((x) => x).join(" ")}
        />
      )

      StyledComponent.displayName = `Styled${titleCase(property)}`
      return StyledComponent
    }
  },
})
