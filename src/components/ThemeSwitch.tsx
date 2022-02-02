import React from "react"
import { FiMoon, FiSun } from "react-icons/fi"
import { useFetcher } from "remix"

export default function ThemeSwitch() {
  // const data = useLoaderData()
  const data = {}
  const fetcher = useFetcher()
  const theme = fetcher.submission?.formData.get("theme") ?? data.theme

  const handleSubmit = () => {
    fetcher.submit(
      { theme: theme === "dark" ? "light" : "dark" },
      {
        action: "action/set-theme",
        method: "post",
      }
    )
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      className="ml-1 mr-1 rounded p-1 sm:ml-4"
      onClick={handleSubmit}
      type="button"
    >
      {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  )
}
