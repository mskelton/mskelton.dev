"use client"

import { clsx } from "clsx"
import React, { useRef, useState } from "react"

export function MarkdownPre(props: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null!)
  const [copied, setCopied] = useState(false)

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
    <div className="group relative">
      <pre ref={preRef} {...props} />

      <button
        aria-label="Copy code"
        className={clsx(
          "absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 opacity-0 transition-all hover:bg-zinc-700 focus-visible:opacity-100 group-hover:opacity-100 peer-[.has-title]:top-16",
          copied ? "text-green-400" : "text-gray-300"
        )}
        onClick={handleCopy}
        type="button"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.5 12.75l6 6 9-13.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
