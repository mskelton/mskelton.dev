import React from "react"
import DemoToolbarButton from "./DemoToolbarButton"

const props = {
  className: "transition-[d]",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.5",
} as const

export interface ExpandCodeButtonProps {
  isExpanded: boolean
  onToggleExpanded: () => void
}

export default function ExpandCodeButton({
  isExpanded,
  onToggleExpanded,
}: ExpandCodeButtonProps) {
  return (
    <DemoToolbarButton
      onClick={onToggleExpanded}
      title={isExpanded ? "Collapse code" : "Expand code"}
    >
      <svg
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
      >
        <path
          {...props}
          d={
            isExpanded
              ? "M15.75 5.25L12 9L8.25 5.25"
              : "M8.25 9L12 5.25L15.75 9"
          }
        />

        <path
          {...props}
          d={
            isExpanded
              ? "M15.75 18.75L12 15L8.25 18.75"
              : "M8.25 15L12 18.75L15.75 15"
          }
        />
      </svg>
    </DemoToolbarButton>
  )
}
