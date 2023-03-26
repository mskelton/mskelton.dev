"use client"

import { MoonIcon, SunIcon } from "@heroicons/react/20/solid"
import HeaderIconButton from "./HeaderIconButton"

export function ThemeToggle() {
  function handleToggle() {
    document.documentElement.classList.toggle("light")
    const isDarkMode = document.documentElement.classList.toggle("dark")
    const value = isDarkMode ? "dark" : "light"

    document.cookie = `theme=${value}; SameSite=None; path=/; max-age=31536000; Secure`
  }

  return (
    <HeaderIconButton aria-label="Toggle dark mode" onClick={handleToggle}>
      {/* <div className="theme-toggle h-[var(--size)] w-[var(--size)] rounded-full transition-all" /> */}

      <SunIcon className="dark:hidden" />
      <MoonIcon className="hidden dark:block" />
    </HeaderIconButton>
  )
}
