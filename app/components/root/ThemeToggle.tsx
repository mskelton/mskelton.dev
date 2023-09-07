"use client"

import { MoonIcon, SunIcon } from "@heroicons/react/20/solid"
import { useEffect } from "react"
import { themeEffect, toggleTheme } from "../../lib/themeEffect"
import HeaderIconButton from "./HeaderIconButton"

export function ThemeToggle() {
  // React to storage changes in other tabs
  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key === "theme") {
        themeEffect()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  })

  return (
    <HeaderIconButton aria-label="Toggle dark mode" onClick={toggleTheme}>
      <SunIcon className="dark:hidden" />
      <MoonIcon className="hidden dark:block" />
    </HeaderIconButton>
  )
}
