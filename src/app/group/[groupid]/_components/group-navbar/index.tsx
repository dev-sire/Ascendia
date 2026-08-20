"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GROUPLE_CONSTANTS } from "@/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

type MenuProps = {
  orientation: "mobile" | "desktop"
}

const Menu = ({ orientation }: MenuProps) => {
  const { groupid } = useParams<{ groupid: string }>()
  const pathname = usePathname()

  // base is /group/[groupid]/channel/[channelid] — we want just /group/[groupid]
  const groupBase = `/group/${groupid}`

  const isActive = (segment: string) => {
    const fullPath = `${groupBase}${segment}`
    if (segment === "") {
      // "Group" tab — active on channel pages but NOT on /courses or /messages
      return (
        pathname.startsWith(groupBase) &&
        !pathname.includes("/courses") &&
        !pathname.includes("/messages")
      )
    }
    return pathname.startsWith(fullPath)
  }

  switch (orientation) {
    case "desktop":
      return (
        <Card className="bg-themeGray border-themeGray bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-60 p-1 lg:flex md:rounded-xl flex items-center justify-center w-fit">
          <CardContent className="p-0 flex gap-2">
            {GROUPLE_CONSTANTS.groupPageMenu.map((menuItem) => {
              const href = `${groupBase}${menuItem.path}`
              const active = isActive(menuItem.path)
              return (
                <Link
                  href={href}
                  className={cn(
                    "rounded-xl flex gap-2 py-2 px-4 items-center",
                    active ? "bg-[#09090B] border-[#27272A]" : "",
                  )}
                  key={menuItem.id}
                >
                  {active && menuItem.icon}
                  {menuItem.label}
                </Link>
              )
            })}
          </CardContent>
        </Card>
      )

    case "mobile":
      return (
        <div className="flex flex-col mt-10">
          {GROUPLE_CONSTANTS.groupPageMenu.map((menuItem) => {
            const href = `${groupBase}${menuItem.path}`
            const active = isActive(menuItem.path)
            return (
              <Link
                href={href}
                className={cn(
                  "rounded-xl flex gap-2 py-2 px-4 items-center",
                  active ? "bg-themeGray border-[#27272A]" : "",
                )}
                key={menuItem.id}
              >
                {menuItem.icon}
                {menuItem.label}
              </Link>
            )
          })}
        </div>
      )

    default:
      return <></>
  }
}

export default Menu