"use client"

import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline"
import React, { useState } from "react"
import DemoToolbarButton from "./DemoToolbarButton"

export interface CopyCodeButtonProps {
  raw: string
}

export default function CopyCodeButton({ raw }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false)
  const Icon = copied ? ClipboardDocumentCheckIcon : ClipboardDocumentListIcon

  function handleCopy() {
    setCopied(true)
    navigator.clipboard.writeText(raw)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DemoToolbarButton
      onClick={handleCopy}
      title={copied ? "Copied" : "Copy the source"}
    >
      <Icon className={copied ? "text-green-400" : undefined} />
    </DemoToolbarButton>
  )
}
