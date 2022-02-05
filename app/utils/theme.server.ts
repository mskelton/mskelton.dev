import { createCookie } from "remix"

export type Theme = "dark" | "light"

export const themeCookie = createCookie("theme", {
  httpOnly: true,
  maxAge: 2.628e9,
  path: "/",
  sameSite: "lax",
})

export async function getTheme(request: Request) {
  const header = request.headers.get("Cookie")
  return (await themeCookie.parse(header)) ?? "dark"
}

export function isTheme(theme: string | null): theme is Theme {
  return theme === "dark" || theme === "light"
}
