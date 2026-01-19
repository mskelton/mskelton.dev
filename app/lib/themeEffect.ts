export type Theme = 'dark' | 'light'

export const themeEffect = function (): Theme {
  const pref = localStorage.getItem('theme')
  const d = document.documentElement
  let result: Theme

  if (
    pref === 'dark' ||
    (!pref && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    d.classList.add('pause-transitions')
    d.classList.add('dark', 'scheme-dark')
    result = 'dark'
  } else {
    d.classList.add('pause-transitions')
    d.classList.remove('dark', 'scheme-dark')
    result = 'light'
  }

  requestAnimationFrame(() => {
    d.classList.remove('pause-transitions')
  })

  return result
}
