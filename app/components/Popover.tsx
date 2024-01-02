import {
  Popover as BasePopover,
  PopoverProps as BasePopoverProps,
} from "react-aria-components"
import { twMerge } from "tailwind-merge"

export interface PopoverProps extends BasePopoverProps {
  className?: string
}

export function Popover({ className, ...props }: PopoverProps) {
  return (
    <BasePopover
      className={({ isEntering, placement }) =>
        twMerge(
          isEntering && "animate-popover-enter",
          placement === "top" && "[--origin:translateY(8px)]",
          placement === "bottom" && "[--origin:translateY(-8px)]",
          placement === "left" && "[--origin:translateX(8px)]",
          placement === "right" && "[--origin:translateX(-8px)]",
          className,
        )
      }
      {...props}
    />
  )
}
