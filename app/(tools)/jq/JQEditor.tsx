"use client"

import { useEffect, useState } from "react"
import { jq } from "./lib/jq"

export default function JQEditor() {
  const [json, setJson] = useState('{ "name": "John", "age": 30 }')
  const [query, setQuery] = useState(".name")
  const [output, setOutput] = useState("")

  useEffect(() => {
    const onReady = () => {
      const res = jq(json, query)
      setOutput(res?.stdout ?? "")
    }

    document.addEventListener("jq-ready", onReady)
    return () => document.removeEventListener("jq-ready", onReady)
    // Only run this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const res = jq(json, query)
    setOutput(res?.stdout ?? "")
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
        onChange={(e) => setQuery(e.target.value)}
        style={{ height: "200px", width: "100%" }}
        value={query}
      />

      <textarea
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
        <pre>{output}</pre>
      </div>
    </div>
  )
}
