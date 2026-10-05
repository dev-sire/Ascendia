"use client"

import { ShaderBackground } from "@/components/ui/manu"
import { useEffect, useState } from "react"

/**
 * Full-page animated backdrop for the landing page.
 *
 * Layers (back → front):
 *  1. A static CSS gradient in the shader's palette. It is what you see
 *     before WebGL boots, when WebGL is unavailable, and when the visitor
 *     prefers reduced motion, so the page is never a black void.
 *  2. The WebGL mesh-drift shader (skipped for reduced motion).
 *  3. A dark scrim so body copy always keeps readable contrast, with a faint
 *     gold bloom at the top to tie the backdrop to the gold UI accents.
 */
export const LandingBackground = () => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setAnimate(!query.matches)
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 25% 15%, #1b6ca8 0%, transparent 55%), radial-gradient(circle at 80% 65%, #3aa8cf 0%, transparent 50%), #03141a",
      }}
    >
      {animate && <ShaderBackground className="h-full w-full" />}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,11,0.60) 0%, rgba(9,9,11,0.72) 50%, rgba(9,9,11,0.90) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,168,76,0.12), transparent 70%)",
        }}
      />
    </div>
  )
}
