"use client"

import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/20/solid"
import { useEffect, useRef, useState } from "react"
import { useMenuTrigger } from "react-aria"
import { MenuTriggerProps, PressEvent } from "react-aria-components"
import {
  ButtonContext,
  MenuContext,
  OverlayTriggerStateContext,
  PopoverContext,
  Provider,
} from "react-aria-components"
import { useMenuTriggerState } from "react-stately"
import { themeEffect } from "../../lib/themeEffect"
import { NavMenu, NavMenuItem } from "../NavMenu"
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
    themeEffect()
  }

  function handlePress(e: PressEvent) {
    // Allow quick switching the theme when holding down cmd/ctrl
    if (e.metaKey || e.ctrlKey) {
      handleChange(themeEffect() === "dark" ? "light" : "dark")
      themeEffect()
    }
  }

  return (
    <ThemeMenuTrigger>
      <HeaderIconButton aria-label="Set website theme" onPress={handlePress}>
        <SunIcon className="dark:hidden" />
        <MoonIcon className="hidden dark:block" />
      </HeaderIconButton>

      <Popover disableExitAnimation placement="bottom right">
        <NavMenu
          items={items}
          onAction={(value) => handleChange(value as string)}
          selectedKeys={preference ? [preference] : undefined}
        >
          {(item) => (
            <NavMenuItem id={item.value}>
              <item.Icon
                aria-hidden="true"
                className="mr-3 size-5 text-current"
              />

              {item.label}
            </NavMenuItem>
          )}
        </NavMenu>
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
      {props.children}
    </Provider>
  )
}
