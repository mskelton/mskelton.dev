"use client"

import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline"
import { clsx } from "clsx"
import React, { useRef, useState } from "react"

export function MarkdownPre(props: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null!)
  const [copied, setCopied] = useState(false)
  const Icon = copied ? ClipboardDocumentCheckIcon : ClipboardDocumentListIcon

  function handleCopy() {
    setCopied(true)

    // We don't want to copy code titles, so only get the text content of the
    // `<code>` element.
    const codeEl = preRef.current.querySelector("code")
    navigator.clipboard.writeText(codeEl?.textContent ?? "")

    // Clear the copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <pre ref={preRef} {...props} />

      <button
        aria-label={copied ? "Copied" : "Copy code"}
        className={clsx(
          "absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 opacity-0 transition-all delay-75 hover:bg-zinc-700 focus-visible:opacity-100 group-hover:opacity-100 group-[.has-title]:top-16",
          copied ? "text-green-400" : "text-gray-300"
        )}
        onClick={handleCopy}
        type="button"
      >
        <Icon className="h-6 w-6" />
      </button>
    </>
  )
}
