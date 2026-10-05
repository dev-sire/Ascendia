"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

/**
 * Floating glass navigation bar. Client-side only for the scroll state:
 * it starts translucent over the hero and firms up once the page scrolls so
 * links stay legible over any section.
 */
export const NavShell = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:px-6 md:pt-4">
      <nav
        aria-label="Main"
        className={cn(
          "pointer-events-auto relative flex w-full max-w-6xl items-center justify-between gap-3 rounded-2xl border px-3 py-2 backdrop-blur-xl transition-all duration-300 md:px-4",
          scrolled
            ? "border-[rgba(201,168,76,0.28)] bg-[rgba(9,9,11,0.80)] shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
            : "border-[rgba(201,168,76,0.14)] bg-[rgba(9,9,11,0.45)]",
        )}
      >
        {/* Gold hairline along the top edge */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(230,201,107,0.55)] to-transparent"
        />
        {children}
      </nav>
    </header>
  )
}
