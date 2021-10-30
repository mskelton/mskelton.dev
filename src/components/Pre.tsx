import { useRef, useState } from "react"

export default function Pre(props) {
  const textInput = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  export default function onEnter() {
    setHovered(true)
  }
  export default function onExit() {
    setHovered(false)
    setCopied(false)
  }
  export default function onCopy() {
    setCopied(true)
    navigator.clipboard.writeText(textInput.current.textContent)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div
      ref={textInput}
      className="relative"
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
    >
      {hovered && (
        <button
          aria-label="Copy code"
          className={`absolute right-2 top-2 w-8 h-8 p-1 rounded border-2 bg-gray-700 dark:bg-gray-800 ${
            copied
              ? "focus:outline-none focus:border-green-400 border-green-400"
              : "border-gray-300"
          }`}
          onClick={onCopy}
          type="button"
        >
          <svg
            className={copied ? "text-green-400" : "text-gray-300"}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {copied ? (
              <>
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </>
            ) : (
              <>
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </>
            )}
          </svg>
        </button>
      )}

      <pre>{props.children}</pre>
    </div>
  )
}
