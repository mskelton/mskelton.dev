import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import v8 from "node:v8"
import { requireToken } from "api/utils/auth"

export async function GET(request: Request) {
  requireToken(request)

  const tempDir = os.tmpdir()
  const filepath = path.join(
    tempDir,
    `mskelton.dev-${new Date().toISOString()}.heapsnapshot`,
  )

  const snapshotPath = v8.writeHeapSnapshot(filepath)
  if (!snapshotPath) {
    throw new Response("No snapshot saved", { status: 500 })
  }

  const body = new ReadableStream({
    start(controller) {
      const stream = fs.createReadStream(snapshotPath)
      stream.on("data", (chunk) => controller.enqueue(chunk))
      stream.on("end", () => controller.close())
      stream.on("error", (err) => controller.error(err))
    },
  })

  return new Response(body, {
    headers: {
      "Content-Disposition": `attachment; filename="${path.basename(
        snapshotPath,
      )}"`,
      "Content-Length": (await fs.promises.stat(snapshotPath)).size.toString(),
      "Content-Type": "application/octet-stream",
    },
    status: 200,
  })
}
