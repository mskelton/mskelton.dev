"use client"

import { Bars3Icon } from "@heroicons/react/20/solid"
import { MenuTrigger } from "react-aria-components"
import { NavMenu, NavMenuItem } from "../NavMenu"
import { Popover } from "../Popover"
import { HeaderIconButton } from "./HeaderIconButton"
import { navItems } from "./navItems"

export function MobileNavigation() {
  return (
    <MenuTrigger>
      <HeaderIconButton aria-label="Menu" className="lg:hidden">
        <Bars3Icon className="size-4" />
      </HeaderIconButton>

      <Popover placement="bottom right">
        <NavMenu items={navItems}>
          {(item) => (
            <NavMenuItem href={item.href} id={item.href}>
              {item.label}
            </NavMenuItem>
          )}
        </NavMenu>
      </Popover>
    </MenuTrigger>
  )
}
