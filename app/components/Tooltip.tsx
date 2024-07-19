import React from "react"
import {
  Tooltip as AriaTooltip,
  TooltipProps as AriaTooltipProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"
import { OverlayArrow } from "./OverlayArrow"

export interface TooltipProps
  extends Omit<AriaTooltipProps, "children" | "className"> {
  children: React.ReactNode
  className?: string
}

const styles = tv({
  base: "group bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-sm font-medium rounded-lg shadow-sm px-3 py-1.5 max-w-xs [overflow-wrap:anywhere]",
  variants: {
    isEntering: {
      true: "animate-[tooltip-slide_200ms]",
    },
    isExiting: {
      true: "animate-[tooltip-slide_200ms_reverse_ease-in]",
    },
    placement: {
      bottom: "mt-3 [--origin:translateY(-2px)]",
      center: "",
      left: "mr-3 [--origin:translateX(2px)]",
      right: "ml-3 [--origin:translateX(-2px)]",
      top: "mb-3 [--origin:translateY(2px)]",
    },
  },
})

export function Tooltip({ children, className, ...props }: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
      className={(props) => styles({ ...props, className })}
    >
      <OverlayArrow />
      {children}
    </AriaTooltip>
  )
}
