"use client"

import {
  FloatingOverlay,
  FloatingPortal,
  useFloating,
} from "@floating-ui/react"
import { Listbox, Transition } from "@headlessui/react"
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/20/solid"
import { Fragment, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { themeEffect } from "../../lib/themeEffect"
import HeaderIconButton from "./HeaderIconButton"

const options = [
  { Icon: ComputerDesktopIcon, label: "System", value: null },
  { Icon: MoonIcon, label: "Dark", value: "dark" },
  { Icon: SunIcon, label: "Light", value: "light" },
]

export function ThemeToggle() {
  const [preference, setPreference] = useState<string | null>(null)
  const { refs, strategy, x, y } = useFloating({
    middleware: [],
    placement: "bottom-end",
    strategy: "fixed",
  })

  // React to storage changes in other tabs
  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key === "theme") {
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
    if (value === null) {
      localStorage.removeItem("theme")
    } else {
      localStorage.setItem("theme", value)
    }

    setPreference(value)
  }

  return (
    <Listbox onChange={handleChange} value={preference}>
      {({ open }) => (
        <>
          <Listbox.Button
            ref={refs.setReference}
            aria-label="Set website theme"
            as={HeaderIconButton}
          >
            <SunIcon className="dark:hidden" />
            <MoonIcon className="hidden dark:block" />
          </Listbox.Button>

          <FloatingPortal>
            <Transition
              // Run the theme effect after the transition exists. This ensures
              // that we don't get any unwanted flashing when the menu closes.
              afterLeave={themeEffect}
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-0 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              show={open}
            >
              <Listbox.Options
                ref={refs.setFloating}
                className="z-[60] mt-2 w-40 rounded-xl bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-zinc-900 ring-opacity-5 focus:outline-none"
                static
                style={{
                  left: x ?? 0,
                  position: strategy,
                  top: y ?? 0,
                }}
              >
                <div className="p-1">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.label}
                      className={({ active, selected }) =>
                        twMerge(
                          "group flex items-center px-4 py-2 text-xs font-medium w-full rounded-lg",
                          active
                            ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
                            : "text-zinc-700 dark:text-zinc-300",
                          selected && "text-indigo-700 dark:text-indigo-300",
                        )
                      }
                      value={option.value}
                    >
                      <option.Icon
                        aria-hidden="true"
                        className="mr-3 h-5 w-5 text-current"
                      />

                      {option.label}
                    </Listbox.Option>
                  ))}
                </div>
              </Listbox.Options>
            </Transition>
          </FloatingPortal>

          {/* Lock scrolling to prevent the header overlapping when the toggle is open */}
          {open ? <FloatingOverlay lockScroll /> : null}
        </>
      )}
    </Listbox>
  )
}
