import { NextResponse } from "next/server"

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { message: "Reindexing is not allowed in production." },
      { status: 400 },
    )
  }

  return NextResponse.json({ message: "ok" })
}
