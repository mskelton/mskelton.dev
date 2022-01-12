import Link from "components/Link"

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages
  const prevURL =
    currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`

  return (
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            Previous
          </button>
        )}

        {prevPage && (
          <Link href={prevURL} rel="previous">
            Previous
          </Link>
        )}

        <span>
          {currentPage} of {totalPages}
        </span>

        {!nextPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            Next
          </button>
        )}

        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}
