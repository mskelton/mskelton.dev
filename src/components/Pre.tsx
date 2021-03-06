import React, { ReactNode, useRef, useState } from "react"
import { FiCheck, FiCopy } from "react-icons/fi"

interface PreProps {
  children?: ReactNode
}

export function Pre({ children }: PreProps) {
  const textInput = useRef<HTMLDivElement>(null!)
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    setCopied(true)
    navigator.clipboard.writeText(textInput.current.textContent ?? "")
    setTimeout(() => setCopied(false), 2000)
  }

  const buttonStyle = copied
    ? "text-green-400 focus:border-green-400 border-green-400"
    : "text-gray-300 border-gray-300"

  return (
    <div ref={textInput} className="group relative">
      <button
        aria-label="Copy code"
        className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded border-2 bg-gray-700 opacity-0 focus:outline-none group-hover:opacity-100 dark:bg-gray-800 ${buttonStyle}`}
        onClick={handleCopy}
        type="button"
      >
        {copied ? <FiCheck /> : <FiCopy />}
      </button>

      <pre>{children}</pre>
    </div>
  )
}
