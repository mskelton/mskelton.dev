import React, { createContext, useContext, useMemo, useState } from "react"
import type { Theme } from "~/utils/theme.server"

interface ThemeContextValue {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
  theme: Theme
}

const ThemeContext = createContext<ThemeContextValue>({
  setTheme() {},
  theme: "dark",
})

interface ThemeProviderProps {
  children: React.ReactNode
  initialTheme: Theme
}

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const [theme, setTheme] = useState(initialTheme)
  const value = useMemo(() => ({ setTheme, theme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
