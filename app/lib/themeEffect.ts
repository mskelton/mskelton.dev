export const themeEffect = function () {
  let result: string
  const pref = localStorage.getItem("theme")

  if (
    pref === "dark" ||
    (!pref && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark")
    result = "dark"
  } else {
    document.documentElement.classList.remove("dark")
    result = "light"
  }

  // requestAnimationFrame(() => {
  //   document.documentElement.classList.remove("pause-transitions")
  // })

  return result
}

export function toggleTheme() {
  const current = themeEffect()
  localStorage.setItem("theme", current === "dark" ? "light" : "dark")
  themeEffect()
}
