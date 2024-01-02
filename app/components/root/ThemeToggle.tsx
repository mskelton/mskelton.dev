"use client"

import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/20/solid"
import { useEffect, useRef, useState } from "react"
import { useMenuTrigger } from "react-aria"
import {
  Menu,
  MenuItem,
  MenuTriggerProps,
  PressEvent,
} from "react-aria-components"
import {
  ButtonContext,
  MenuContext,
  OverlayTriggerStateContext,
  PopoverContext,
  Provider,
} from "react-aria-components"
import { useMenuTriggerState } from "react-stately"
import { twMerge } from "tailwind-merge"
import { themeEffect } from "../../lib/themeEffect"
import { Popover } from "../Popover"
import { HeaderIconButton } from "./HeaderIconButton"

const items = [
  { Icon: ComputerDesktopIcon, label: "System", value: "system" },
  { Icon: MoonIcon, label: "Dark", value: "dark" },
  { Icon: SunIcon, label: "Light", value: "light" },
]

export function ThemeToggle() {
  const [preference, setPreference] = useState<string | null>(null)

  // React to storage changes in other tabs
  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key === "theme") {
        setPreference(event.newValue)
        themeEffect()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  useEffect(() => {
    // This has to happen in an effect otherwise it won't work during SSR
    // since there is no localStorage.
    setPreference(localStorage.getItem("theme"))

    // Refresh the theme when the user changes their system theme. If the user
    // set a preference, this will be ignored.
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)")
    matchMedia.addEventListener("change", themeEffect)
    return () => matchMedia.removeEventListener("change", themeEffect)
  }, [])

  function handleChange(value: string) {
    if (value === "system") {
      localStorage.removeItem("theme")
    } else {
      localStorage.setItem("theme", value)
    }

    setPreference(value)
  }

  function handlePress(e: PressEvent) {
    // Allow quick switching the theme when holding down cmd/ctrl
    if (e.metaKey || e.ctrlKey) {
      handleChange(themeEffect() === "dark" ? "light" : "dark")
      themeEffect()
    }
  }

  //           // Run the theme effect after the transition exists. This ensures
  //           // that we don't get any unwanted flashing when the menu closes.
  //           afterLeave={themeEffect}

  return (
    <ThemeMenuTrigger>
      <HeaderIconButton aria-label="Set website theme" onPress={handlePress}>
        <SunIcon className="dark:hidden" />
        <MoonIcon className="hidden dark:block" />
      </HeaderIconButton>

      <Popover placement="bottom right">
        <Menu
          className="mt-2 w-40 rounded-xl bg-white p-1 shadow-lg ring-1 ring-zinc-900 ring-opacity-5 focus:outline-none dark:bg-zinc-800"
          items={items}
          onAction={(value) => handleChange(value as string)}
          selectedKeys={preference ? [preference] : undefined}
          selectionMode="single"
        >
          {(item) => (
            <MenuItem
              className={({ isFocused, isSelected }) =>
                twMerge(
                  "group flex w-full cursor-default items-center rounded-lg px-4 py-2 text-xs font-medium outline-none",
                  isFocused
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
                    : "text-zinc-700 dark:text-zinc-300",
                  isSelected && "text-indigo-700 dark:text-indigo-300",
                )
              }
              id={item.value}
            >
              <item.Icon
                aria-hidden="true"
                className="mr-3 size-5 text-current"
              />

              {item.label}
            </MenuItem>
          )}
        </Menu>
      </Popover>
    </ThemeMenuTrigger>
  )
}

function ThemeMenuTrigger(props: MenuTriggerProps) {
  const state = useMenuTriggerState(props)
  const ref = useRef(null)
  const { menuProps, menuTriggerProps } = useMenuTrigger(props, state, ref)

  /** Allow events only if they are not theme toggle events (cmd/ctrl) */
  const allow = (e: Pick<KeyboardEvent, "ctrlKey" | "metaKey">) =>
    !e.ctrlKey && !e.metaKey

  return (
    <Provider
      values={[
        [
          ButtonContext,
          {
            ...menuTriggerProps,
            isPressed: state.isOpen,
            onKeyDown: (e) => allow(e) && menuTriggerProps.onKeyDown?.(e),
            onPress: (e) => allow(e) && menuTriggerProps.onPress?.(e),
            onPressStart: (e) => allow(e) && menuTriggerProps.onPressStart?.(e),
            ref,
          },
        ],
        [OverlayTriggerStateContext, state],
        [PopoverContext, { placement: "bottom start", triggerRef: ref }],
        [MenuContext, menuProps],
      ]}
    >
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </Provider>
  )
}
