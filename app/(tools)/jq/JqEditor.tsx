"use client"

import clsx from "clsx"
import { useEffect, useState } from "react"
import { jq, JqResult } from "./lib/jq"

export default function JqEditor() {
  const [json, setJson] = useState('{ "name": "John", "age": 30 }')
  const [query, setQuery] = useState(".name")
  const [result, setResult] = useState<JqResult>()

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
    <div>
      <textarea
        className="dark:bg-zinc-950 dark:text-white"
        onChange={(e) => setQuery(e.target.value)}
        style={{ height: "200px", width: "100%" }}
        value={query}
      />

      <textarea
        className="dark:bg-zinc-950 dark:text-white"
        onBlur={(e) => format(e.target.value)}
        onChange={(e) => setJson(e.target.value)}
        onPaste={(e) => {
          requestAnimationFrame(() => {
            format((e.target as HTMLTextAreaElement).value)
          })
        }}
        style={{ height: "200px", width: "100%" }}
        value={json}
      />

      <div className="text-white">
        {result ? (
          <pre className={clsx("", result.isError && "dark:text-red-500")}>
            {result.stdout || result.stderr}
          </pre>
        ) : null}
      </div>
    </div>
  )
}
