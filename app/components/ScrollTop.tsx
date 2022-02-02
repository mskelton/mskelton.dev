import React, { useEffect, useState } from "react"
import { FiArrowUp } from "react-icons/fi"

export default function ScrollTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    function handleWindowScroll() {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener("scroll", handleWindowScroll)
    return () => window.removeEventListener("scroll", handleWindowScroll)
  }, [])

  function handleScrollTop() {
    window.scrollTo({ behavior: "smooth", top: 0 })
  }

  return (
    <div className="fixed right-8 bottom-8 hidden flex-col gap-3 md:flex">
      <button
        aria-label="Scroll To Top"
        className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        onClick={handleScrollTop}
        style={{ opacity: show ? 1 : 0 }}
        type="button"
      >
        <FiArrowUp size={20} />
      </button>
    </div>
  )
}
