import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import { FiMoon, FiSun } from "react-icons/fi"

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  return (
    <button
      aria-label="Toggle Dark Mode"
      className="p-1 ml-1 mr-1 rounded sm:ml-4"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      type="button"
    >
      {mounted && resolvedTheme === "dark" ? (
        <FiSun size={18} />
      ) : (
        <FiMoon size={18} />
      )}
    </button>
  )
}
