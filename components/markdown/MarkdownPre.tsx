"use client"

import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline"
import { clsx } from "clsx"
import React, { useRef, useState } from "react"

const iconStyle = "absolute size-4 inset-[50%] transform-[translate(-50%,-50%)]"

export interface MarkdownPreProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactElement<{ tabIndex?: number }>
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

  function handleCopy() {
    setCopied(true)

    // We don't want to copy code titles, so only get the text content of the
    // `<code>` element.
    const codeEl = preRef.current.querySelector("code")
    const text = (codeEl?.innerText ?? "").replaceAll("\u200b", "")
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <div
        className={clsx(
          "absolute z-10 flex gap-3 transition-opacity delay-100 group-hover:opacity-100",
          hasTitle
            ? "top-[10px] right-[10px]"
            : "top-[15px] right-[15px] opacity-0",
        )}
        data-testid="toolbar"
      >
        {hasFocus ? (
          <ToolbarButton
            aria-label={isExpanded ? "Collapse code" : "Expand code"}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ExpandPath d="M8.25 9L12 5.25L15.75 9" isExpanded={isExpanded} />
              <ExpandPath
                d="M8.25 15L12 18.75L15.75 15"
                isExpanded={isExpanded}
              />
            </svg>
          </ToolbarButton>
        ) : null}

        <ToolbarButton
          aria-label={copied ? "Copied" : "Copy code"}
          onClick={handleCopy}
        >
          <ClipboardIcon
            className={clsx(
              iconStyle,
              copied && "animate-[1s_linear_copy-hide_forwards]",
              "text-zinc-700 opacity-100 dark:text-zinc-300",
            )}
            onAnimationEnd={() => setCopied(false)}
          />

          <CheckIcon
            className={clsx(
              iconStyle,
              copied && "animate-[1s_.15s_linear_copy-show_forwards]",
              "text-green-600 opacity-0 dark:text-green-400",
            )}
          />
        </ToolbarButton>
      </div>

      <pre
        ref={preRef}
        className={clsx(
          !hasFocus ? undefined : isExpanded ? "expanded" : "collapsed",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    </>
  )
}

function ToolbarButton({
  "aria-label": label,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      aria-label={label}
      className="focusable relative flex size-8 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 transition-[background-color] hover:bg-zinc-200 focus-visible:opacity-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
      type="button"
      {...props}
    />
  )
}

function ExpandPath({ d, isExpanded }: { d: string; isExpanded: boolean }) {
  return (
    <path
      className={clsx(
        "origin-center transition-transform duration-500 transform-fill",
        isExpanded && "transform-[rotateX(180deg)]",
      )}
      d={d}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  )
}
