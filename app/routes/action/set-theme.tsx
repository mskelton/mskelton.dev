import { ActionFunction, json, redirect } from "remix"
import { isTheme, themeCookie } from "~/utils/theme.server"

export const action: ActionFunction = async ({ request }) => {
  const requestText = await request.text()
  const form = new URLSearchParams(requestText)
  const theme = form.get("theme")

  if (!isTheme(theme)) {
    return json(
      { error: `theme value of ${theme} is not a valid theme.` },
      { status: 400 }
    )
  }

  return json(
    { success: true },
    { headers: { "Set-Cookie": await themeCookie.serialize(theme) } }
  )
}

export const loader = () => redirect("/", { status: 404 })
