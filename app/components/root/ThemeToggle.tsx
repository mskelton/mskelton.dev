"use client"

import HeaderIconButton from "./HeaderIconButton"
import { ThemeIcon } from "./ThemeIcon"

export function ThemeToggle() {
  function handleToggle() {
    document.documentElement.classList.toggle("light")
    const isDarkMode = document.documentElement.classList.toggle("dark")
    const value = isDarkMode ? "dark" : "light"

    document.cookie = `theme=${value}; SameSite=None; path=/; max-age=31536000; Secure`
  }

  return (
    <HeaderIconButton aria-label="Toggle dark mode" onClick={handleToggle}>
      <ThemeIcon />
    </HeaderIconButton>
  )
}
