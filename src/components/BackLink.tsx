import { ReactNode } from "react"
import { FaChevronLeft } from "react-icons/fa"
import { Link } from "components/Link"

export interface BackLinkProps {
  children: ReactNode
  href: string
}

export function BackLink({ children, href }: BackLinkProps) {
  return (
    <Link className="inline-flex items-center mb-5" href={href}>
      <FaChevronLeft className="mr-1 text-sm" /> {children}
    </Link>
  )
}
