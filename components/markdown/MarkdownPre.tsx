"use client"

import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline"
import { clsx } from "clsx"
import React, { cloneElement, useRef, useState } from "react"

export interface MarkdownPreProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactElement
  hasFocus?: boolean
  hasHighlight?: boolean
  hasTitle?: boolean
}

export default function MarkdownPre({
  children,
  className,
  hasFocus,
  hasHighlight: _,
  hasTitle,
  ...props
}: MarkdownPreProps) {
  const preRef = useRef<HTMLPreElement>(null!)
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const Icon = copied ? CheckIcon : ClipboardIcon

  function handleCopy() {
    setCopied(true)

    // We don't want to copy code titles, so only get the text content of the
    // `<code>` element.
    const codeEl = preRef.current.querySelector("code")
    const text = (codeEl?.innerText ?? "").replaceAll("\u200b", "")
    navigator.clipboard.writeText(text)

    // Clear the copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {hasFocus ? (
        <button
          className="absolute right-0 top-3 rounded-md bg-zinc-900 px-2 text-xs text-white transition-colors focusable hover:bg-zinc-950 sm:right-6"
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
          "absolute z-10 flex size-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 transition-all delay-100 focusable hover:bg-zinc-800 focus-visible:opacity-100 group-hover:opacity-100",
          copied ? "text-green-400" : "text-zinc-300",
          hasTitle
            ? "right-[10px] top-[10px]"
            : "right-[15px] top-[15px] opacity-0",
        )}
        onClick={handleCopy}
        type="button"
      >
        <Icon className="size-4" />
      </button>
    </>
  )
}
