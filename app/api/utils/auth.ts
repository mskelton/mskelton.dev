import { NextResponse } from "next/server"

export function requireToken(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "")

  if (
    process.env.NODE_ENV === "production" &&
    process.env.API_AUTH_TOKEN !== token
  ) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 })
  }
}
