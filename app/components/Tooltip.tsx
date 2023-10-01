"use client"

import {
  autoUpdate,
  flip,
  FloatingDelayGroup,
  FloatingPortal,
  offset,
  shift,
  useDelayGroup,
  useDelayGroupContext,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useId,
  useInteractions,
  useMergeRefs,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react"
import type { Placement } from "@floating-ui/react"
import React, {
  cloneElement,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react"

export interface TooltipGroupProps {
  children: React.ReactNode
}

export function TooltipGroup({ children }: TooltipGroupProps) {
  return (
    <FloatingDelayGroup delay={{ close: 0, open: 500 }}>
      {children}
    </FloatingDelayGroup>
  )
}

interface UseTooltipProps {
  initialOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
  placement?: Placement
}

export function useTooltip({
  initialOpen = false,
  onOpenChange: setControlledOpen,
  open: controlledOpen,
  placement = "top",
}: UseTooltipProps = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const { delay } = useDelayGroupContext()

  const data = useFloating({
    middleware: [offset(5), flip(), shift()],
    onOpenChange: setOpen,
    open,
    placement,
    whileElementsMounted: autoUpdate,
  })

  const context = data.context

  const hover = useHover(context, {
    delay,
    enabled: controlledOpen == null,
    move: false,
    restMs: delay ? undefined : 250,
  })
  const focus = useFocus(context, { enabled: controlledOpen == null })
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: "tooltip" })
  const interactions = useInteractions([hover, focus, dismiss, role])

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data],
  )
}

type TooltipContextValue = ReturnType<typeof useTooltip> | null

const TooltipContext = createContext<TooltipContextValue>(null)

export const useTooltipState = () => {
  const context = useContext(TooltipContext)

  if (context == null) {
    throw new Error("Tooltip components must be wrapped in <Tooltip />")
  }

  return context
}

export interface TooltipProps extends UseTooltipProps {
  children: React.ReactNode
}

export function Tooltip({ children, ...options }: TooltipProps) {
  const tooltip = useTooltip(options)

  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  )
}

export interface TooltipTriggerProps {
  children: React.ReactElement
}

export function TooltipTrigger({ children }: TooltipTriggerProps) {
  const state = useTooltipState()

  const childrenRef = (children as any).ref
  const ref = useMergeRefs([state.refs.setReference, childrenRef])

  return cloneElement(
    children,
    state.getReferenceProps({ ref, ...children.props }),
  )
}

export interface TooltipContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function TooltipContent({
  children,
  style,
  ...props
}: TooltipContentProps) {
  const state = useTooltipState()
  const id = useId()
  const { currentId, isInstantPhase } = useDelayGroupContext()
  useDelayGroup(state.context, { id })

  const duration = 250
  const instantDuration = 0
  const { isMounted, styles } = useTransitionStyles(state.context, {
    duration: isInstantPhase
      ? {
          // `id` is this component's `id`
          // `currentId` is the current group's `id`
          close: currentId === id ? duration : instantDuration,
          open: instantDuration,
        }
      : duration,
    initial: {
      opacity: 0,
      transform: "scale(0.8)",
    },
  })

  return isMounted ? (
    <FloatingPortal>
      <div
        ref={state.refs.setFloating}
        style={{ ...state.floatingStyles, ...style }}
        {...state.getFloatingProps(props)}
      >
        <div
          className="z-10 rounded-lg bg-gray-900 px-2 py-1 text-xs text-white shadow-lg dark:bg-zinc-300 dark:text-zinc-900"
          style={styles}
        >
          {children}
        </div>
      </div>
    </FloatingPortal>
  ) : null
}
