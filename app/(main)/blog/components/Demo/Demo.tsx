"use client"

import clsx from "clsx"
import { useRef, useState } from "react"
import DemoToolbar from "./DemoToolbar"

export interface DemoProps {
  center?: boolean
  children: string
  component: React.ReactNode
  name: string
  raw: string
}

export default function Demo({
  center = false,
  children: source,
  component,
  name,
  raw,
}: DemoProps) {
  const focusRef = useRef<HTMLButtonElement>(null)
  const [reset, setReset] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="relative rounded-xl border border-zinc-200 transition-colors dark:border-zinc-700/80">
      <button
        ref={focusRef}
        aria-label="A generic container that is programmatically focused to test keyboard navigation"
        className="absolute left-1 top-1 z-10 rounded-full bg-transparent s-7 focus:animate-heartbeat focus:bg-zinc-500/50"
        tabIndex={-1}
        type="button"
      />

      <div
        key={reset}
        className={clsx(
          "not-prose w-full p-4",
          center && "flex justify-center",
        )}
      >
        {component}
      </div>

      <DemoToolbar
        onFocusReset={() => focusRef.current?.focus({ preventScroll: true })}
        onReset={() => setReset(reset ^ 1)}
        onToggleExpanded={() => setIsExpanded(!isExpanded)}
        path={name}
        raw={raw}
      />

      {isExpanded && <div>{source}</div>}
    </div>
  )
}
