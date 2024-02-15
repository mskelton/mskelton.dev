import { Menu, MenuItem, MenuItemProps, MenuProps } from "react-aria-components"
import { twMerge } from "tailwind-merge"

export interface NavMenuProps<T extends object> extends MenuProps<T> {}

export function NavMenu<T extends object>(props: NavMenuProps<T>) {
  return (
    <Menu
      className="mt-2 w-40 rounded-xl bg-white p-1 shadow-lg focus:outline-none dark:bg-zinc-800"
      selectionMode="single"
      {...props}
    />
  )
}

export interface NavMenuItemProps<T extends object> extends MenuItemProps<T> {}

export function NavMenuItem<T extends object>(props: NavMenuItemProps<T>) {
  return (
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
      {...props}
    />
  )
}
