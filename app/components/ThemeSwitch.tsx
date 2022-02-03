import { FiMoon, FiSun } from "react-icons/fi"
import { useFetcher, useLoaderData } from "remix"
import { Theme } from "~/utils/theme.server"
import { useTheme } from "./ThemeProvider"

export default function ThemeSwitch() {
  const { setTheme, theme } = useTheme()
  const data = useLoaderData<{ theme: Theme } | undefined>()
  const fetcher = useFetcher()

  const handleSubmit = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    fetcher.submit(
      { theme: newTheme },
      {
        action: "action/set-theme",
        method: "post",
      }
    )
  }

  return data?.theme ? (
    <button
      aria-label="Toggle Dark Mode"
      className="ml-1 mr-1 rounded p-1 sm:ml-4"
      onClick={handleSubmit}
      type="button"
    >
      {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  ) : null
}
