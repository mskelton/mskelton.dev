export const themeEffect = function () {
  const pref = localStorage.getItem("theme")

  if (
    pref === "dark" ||
    (!pref && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark")
    return "dark"
  } else {
    document.documentElement.classList.remove("dark")
    return "light"
  }
}

export function toggleTheme() {
  const current = themeEffect()
  localStorage.setItem("theme", current === "dark" ? "light" : "dark")
  themeEffect()
}
