import * as crypto from "crypto"

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET as string

export function verifySignature(req: Request) {
  const signature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex")

  const trusted = Buffer.from(`sha256=${signature}`, "ascii")
  const untrusted = Buffer.from(
    req.headers.get("x-hub-signature-256") ?? "",
    "ascii",
  )

  try {
    return crypto.timingSafeEqual(trusted, untrusted)
  } catch (e) {
    return false
  }
}
