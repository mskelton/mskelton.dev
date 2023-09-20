const TMP_FILE = "/tmp/data.json"

declare global {
  interface Window {
    FS: any
    Module: any
    STDERR: string[]
    STDOUT: string[]
  }
}

export type JqResult = {
  isError: boolean
  stderr: string | null
  stdout: string
}

export function jq(json: string, query: string, options: string[] = []) {
  const { FS, Module, STDERR, STDOUT } = window
  if (!FS) return

  // Create file from object
  FS.writeFile(TMP_FILE, json)

  // Clear previous stdout/stderr before launching jq
  STDOUT.length = 0
  STDERR.length = 0

  // Run jq
  Module.callMain(["-M", ...options, query, TMP_FILE])

  // Re-open stdout/stderr after jq closes them
  FS.streams[1] = FS.open("/dev/stdout", "w")
  FS.streams[2] = FS.open("/dev/stderr", "w")

  return {
    isError: !!STDERR.length,
    stderr: STDERR.length ? `${STDERR[0]}\n${STDERR[1]}` : null,
    stdout: STDOUT.join("\n"),
  }
}
