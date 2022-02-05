import { ReactNode } from "react"

interface PageTitleProps {
  children?: ReactNode
}

export function PageTitle({ children }: PageTitleProps) {
  return (
    <h1 className="text text-3xl font-extrabold leading-9 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
      {children}
    </h1>
  )
}
