"use client"

import { MoonIcon, SunIcon } from "@heroicons/react/20/solid"
import HeaderIconButton from "./HeaderIconButton"

export function ModeToggle() {
  function disableTransitionsTemporarily() {
    document.documentElement.classList.add("[&_*]:!transition-none")

    window.setTimeout(() => {
      document.documentElement.classList.remove("[&_*]:!transition-none")
    }, 0)
  }

  function toggleMode() {
    disableTransitionsTemporarily()

    const isDarkMode = document.documentElement.classList.toggle("dark")
    const value = isDarkMode ? "dark" : "light"

    document.cookie = `theme=${value}; SameSite=None; path=/; max-age=31536000; Secure`
  }

  return (
    <HeaderIconButton aria-label="Toggle dark mode" onClick={toggleMode}>
      <SunIcon className="dark:hidden" />
      <MoonIcon className="hidden dark:block" />
    </HeaderIconButton>
  )
}
