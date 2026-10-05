"use client"

import { SheetClose } from "@/components/ui/sheet"
import { GROUPLE_CONSTANTS } from "@/constants"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

type MenuProps = {
  orientation: "mobile" | "desktop"
  /** Extra content rendered under the mobile links (auth actions). */
  children?: React.ReactNode
}

const ITEMS = GROUPLE_CONSTANTS.landingPageMenu

/**
 * Scroll-spy: the active item is the last in-page section whose top has
 * passed the navbar. Above the first section it falls back to "/" (Home).
 */
const useActiveSection = () => {
  const [active, setActive] = useState("/")

  useEffect(() => {
    const ids = ITEMS.filter((i) => i.path.startsWith("#")).map((i) => i.path)
    let frame = 0

    const compute = () => {
      frame = 0
      let current = "/"
      for (const id of ids) {
        const el = document.querySelector(id)
        if (el && el.getBoundingClientRect().top <= 160) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return active
}

const Menu = ({ orientation, children }: MenuProps) => {
  const active = useActiveSection()
  const [hovered, setHovered] = useState<string | null>(null)

  if (orientation === "desktop") {
    return (
      <ul
        onMouseLeave={() => setHovered(null)}
        className="relative hidden items-center gap-1 lg:flex"
      >
        {ITEMS.map((item) => {
          const isActive = active === item.path
          return (
            <li key={item.id}>
              <Link
                href={item.path}
                onMouseEnter={() => setHovered(item.path)}
                onFocus={() => setHovered(item.path)}
                onBlur={() => setHovered(null)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative z-10 flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "text-[#F7ECE9]"
                    : "text-[#B4B0AE] hover:text-[#F7ECE9]",
                )}
              >
                {hovered === item.path && (
                  <motion.span
                    layoutId="landing-nav-hover"
                    className="absolute inset-0 -z-10 rounded-xl bg-white/[0.07]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="landing-nav-active"
                    className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className="mt-10 flex flex-col gap-1">
      {ITEMS.map((item) => {
        const isActive = active === item.path
        return (
          <SheetClose asChild key={item.id}>
            <Link
              href={item.path}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-base transition-colors",
                isActive
                  ? "bg-[rgba(201,168,76,0.1)] text-[#F7ECE9]"
                  : "text-[#B4B0AE] hover:bg-white/5 hover:text-[#F7ECE9]",
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          </SheetClose>
        )
      })}
      {children && (
        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
          {children}
        </div>
      )}
    </div>
  )
}

export default Menu
