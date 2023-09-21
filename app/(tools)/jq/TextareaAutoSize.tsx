"use client"

import clsx from "clsx"
import { useCallback, useEffect, useRef } from "react"

export interface TextareaAutoSizeProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextareaAutoSize({
  className,
  ...props
}: TextareaAutoSizeProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const resize = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = "auto"
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
  }, [])

  useEffect(() => {
    resize()
  }, [resize])

  return (
    <textarea
      ref={textareaRef}
      className={clsx("resize-none", className)}
      onInput={resize}
      rows={1}
      {...props}
    />
  )
}
