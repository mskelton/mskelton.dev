import { cloneElement, ReactElement, ReactNode } from "react"

export function CardFooterItem({ children, icon }: CardFooterItemProps) {
  return (
    <p className="flex items-center text-gray-400">
      {cloneElement(icon, { className: "h-4 w-4 mr-2 text-gray-500" })}{" "}
      {children}
    </p>
  )
}

export interface CardFooterItemProps {
  children: ReactNode
  icon: ReactElement
}
