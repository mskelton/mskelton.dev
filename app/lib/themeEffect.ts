export const themeEffect = function () {
  const pref = localStorage.getItem("theme")
  const d = document.documentElement
  let result: string

  if (
    pref === "dark" ||
    (!pref && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    d.classList.add("dark")
    result = "dark"
  } else {
    d.classList.remove("dark")
    result = "light"
  }

  d.style.colorScheme = result
  requestAnimationFrame(() => {
    d.classList.remove("pause-transitions")
  })

  return result
}

export function toggleTheme() {
  const current = themeEffect()
  localStorage.setItem("theme", current === "dark" ? "light" : "dark")
  themeEffect()
}
