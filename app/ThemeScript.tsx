const js = `
const pref = localStorage.getItem("theme")

if (
  pref === "dark" ||
  (!pref && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark")
}
`

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: js }} />
}
