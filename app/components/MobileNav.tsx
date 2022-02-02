import { useState } from "react"
import headerNavLinks from "~/data/headerNavLinks"
import { Link } from "./Link"

export function MobileNav() {
  const [navShow, setNavShow] = useState(false)

  function onToggleNav() {
    setNavShow((status) => {
      document.body.style.overflow = status ? "auto" : "hidden"
      return !status
    })
  }

  return (
    <div className="sm:hidden">
      <button
        aria-label="Toggle Menu"
        className="ml-1 mr-1 h-8 w-8 rounded"
        onClick={onToggleNav}
        type="button"
      >
        <svg
          className="text"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {navShow ? (
            <path
              clipRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              fillRule="evenodd"
            />
          ) : (
            <path
              clipRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              fillRule="evenodd"
            />
          )}
        </svg>
      </button>

      <nav
        className={`fixed top-24 right-0 z-10 h-full w-full transform bg-gray-200 pt-8 opacity-95 duration-200 ease-in-out dark:bg-gray-800 ${
          navShow ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {headerNavLinks.map((link) => (
          <Link
            key={link.href}
            className="link-secondary block px-12 py-4 text-2xl font-bold"
            href={link.href}
            onClick={onToggleNav}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}
