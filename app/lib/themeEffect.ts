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

  requestAnimationFrame(() => {
    d.classList.remove("pause-transitions")
  })

  return result
}
