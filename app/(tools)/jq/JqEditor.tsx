"use client"

import clsx from "clsx"
import { useEffect, useState } from "react"
import Editor from "./Editor"
import { jq, JqResult } from "./lib/jq"
import { TextareaAutoSize } from "./TextareaAutoSize"

export default function JqEditor() {
  const [json, setJson] = useState(
    JSON.stringify({ age: 30, name: "John Doe" }, null, 2),
  )
  const [query, setQuery] = useState(".name")
  const [result, setResult] = useState<JqResult>()
  console.log(result)

  useEffect(() => {
    const onReady = () => {
      setResult(jq(json, query))
    }

    document.addEventListener("jq-ready", onReady)
    return () => document.removeEventListener("jq-ready", onReady)
    // Only run this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setResult(jq(json, query))
  }, [json, query])

  function format(value: string) {
    try {
      const obj = JSON.parse(value)
      setJson(JSON.stringify(obj, null, 2))
    } catch {
      setJson(value)
    }
  }

  return (
    <div className="grid flex-1 grid-cols-2 grid-rows-[auto_1fr] gap-4">
      <Editor
        as={TextareaAutoSize}
        className="col-span-2"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />

      <Editor
        className="h-full min-h-[400px] w-full"
        onBlur={(e) => format(e.target.value)}
        onChange={(e) => setJson(e.target.value)}
        onPaste={(e) => {
          requestAnimationFrame(() => {
            format((e.target as HTMLTextAreaElement).value)
          })
        }}
        value={json}
      />

      {result ? (
        <pre
          className={clsx(
            "overflow-x-auto rounded-lg bg-zinc-100 px-4 py-3 font-mono text-sm dark:bg-zinc-950",
            result.isError ? "dark:text-red-500" : "dark:text-white",
          )}
        >
          {result.stdout || result.stderr}
        </pre>
      ) : null}
    </div>
  )
}
