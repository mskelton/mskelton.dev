"use client"

import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline"
import { clsx } from "clsx"
import React, { cloneElement, useRef, useState } from "react"

export interface MarkdownPreProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactElement
  hasFocus?: boolean
}

export default function MarkdownPre({
  children,
  className,
  hasFocus,
  ...props
}: MarkdownPreProps) {
  const preRef = useRef<HTMLPreElement>(null!)
  const [isExpanded, setIsExpanded] = useState(false)
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
      {hasFocus ? (
        <button
          className="focusable absolute right-0 top-3 rounded-md bg-zinc-900 px-2 text-xs text-white transition-colors hover:bg-zinc-950 sm:right-6"
          onClick={() => setIsExpanded(!isExpanded)}
          type="button"
        >
          {isExpanded ? "Collapse code" : "Expand code"}
        </button>
      ) : null}

      <pre
        ref={preRef}
        className={clsx(
          !hasFocus ? undefined : isExpanded ? "expanded" : "collapsed",
          className,
        )}
        {...props}
      >
        {cloneElement(children, {
          tabIndex: 0,
        })}
      </pre>

      <button
        aria-label={copied ? "Copied" : "Copy code"}
        className={clsx(
          "focusable absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 opacity-0 transition-all delay-100 hover:bg-zinc-700 focus-visible:opacity-100 group-hover:opacity-100 group-[.has-title]:top-16",
          copied ? "text-green-400" : "text-zinc-300",
        )}
        onClick={handleCopy}
        type="button"
      >
        <Icon className="s-6" />
      </button>
    </>
  )
}
