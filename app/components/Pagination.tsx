import { PaginationLink } from "./PaginationLink"

export interface PaginationProps {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        <PaginationLink
          disabled={currentPage === 1}
          href={currentPage === 2 ? "/blog" : `/blog/page/${currentPage - 1}`}
          rel="previous"
        >
          Previous
        </PaginationLink>

        <span>
          {currentPage} of {totalPages}
        </span>

        <PaginationLink
          disabled={currentPage === totalPages}
          href={`/blog/page/${currentPage + 1}`}
          rel="next"
        >
          Next
        </PaginationLink>
      </nav>
    </div>
  )
}
