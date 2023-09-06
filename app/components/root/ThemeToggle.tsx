"use client"

import { MoonIcon, SunIcon } from "@heroicons/react/20/solid"
import HeaderIconButton from "./HeaderIconButton"

export function ThemeToggle() {
  function handleToggle() {
    const isDark = document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }

  return (
    <HeaderIconButton aria-label="Toggle dark mode" onClick={handleToggle}>
      <SunIcon className="dark:hidden" />
      <MoonIcon className="hidden dark:block" />
    </HeaderIconButton>
  )
}
