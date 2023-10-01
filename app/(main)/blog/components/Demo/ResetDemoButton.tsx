import { ArrowPathIcon } from "@heroicons/react/24/outline"
import React, { useState } from "react"
import DemoToolbarButton from "./DemoToolbarButton"

export interface ResetDemoButtonProps {
  onReset: () => void
}

export default function ResetDemoButton({ onReset }: ResetDemoButtonProps) {
  const [key, setKey] = useState<number>()

  function handleReset() {
    setKey((key ?? 0) ^ 1)
    onReset()
  }

  return (
    <DemoToolbarButton onClick={handleReset} title="Reset demo">
      <ArrowPathIcon
        key={key}
        className={key != null ? "animate-[halfspin_300ms_linear]" : undefined}
      />
    </DemoToolbarButton>
  )
}
