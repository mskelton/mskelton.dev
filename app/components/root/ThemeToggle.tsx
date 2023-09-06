"use client"

import { MoonIcon, SunIcon } from "@heroicons/react/20/solid"
import { toggleTheme } from "../../lib/themeEffect"
import HeaderIconButton from "./HeaderIconButton"

export function ThemeToggle() {
  return (
    <HeaderIconButton aria-label="Toggle dark mode" onClick={toggleTheme}>
      <SunIcon className="dark:hidden" />
      <MoonIcon className="hidden dark:block" />
    </HeaderIconButton>
  )
}
