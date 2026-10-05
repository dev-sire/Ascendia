"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { createContext, forwardRef, useContext } from "react"

/**
 * Lets any landing section know whether the visitor is signed in, without
 * every section re-fetching the user. The (landing) layout resolves auth once
 * on the server and provides it here.
 */
const LandingAuthContext = createContext<{ signedIn: boolean }>({
  signedIn: false,
})

export const LandingAuthProvider = ({
  signedIn,
  children,
}: {
  signedIn: boolean
  children: React.ReactNode
}) => (
  <LandingAuthContext.Provider value={{ signedIn }}>
    {children}
  </LandingAuthContext.Provider>
)

export const useLandingAuth = () => useContext(LandingAuthContext)

// ─── Buttons ────────────────────────────────────────────────────────────────

type Variant = "gold" | "ghost"
type Size = "sm" | "md" | "lg"

const BASE =
  "inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C96B]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"

const VARIANTS: Record<Variant, string> = {
  gold: "text-[#09090B] bg-[linear-gradient(135deg,#C9A84C_0%,#9A7A2E_100%)] shadow-[0_0_24px_rgba(201,168,76,0.25)] hover:shadow-[0_0_38px_rgba(201,168,76,0.5)] hover:brightness-110",
  ghost:
    "font-medium text-[#C9A84C] border border-[rgba(201,168,76,0.3)] bg-[rgba(9,9,11,0.35)] backdrop-blur-md hover:bg-[rgba(201,168,76,0.1)] hover:border-[rgba(201,168,76,0.5)]",
}

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-7 py-3 text-sm rounded-xl",
  lg: "px-10 py-3.5 text-base rounded-2xl",
}

type ButtonLinkProps = Omit<
  React.ComponentPropsWithoutRef<typeof Link>,
  "href" | "className"
> & {
  href: string
  variant?: Variant
  size?: Size
  className?: string
}

/**
 * A link styled as a landing-page button. Forwards its ref and extra props so
 * it composes with Radix `asChild` triggers (e.g. closing the mobile sheet).
 */
export const LandingButton = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    { href, children, variant = "gold", size = "md", className, ...rest },
    ref,
  ) => (
    <Link
      ref={ref}
      href={href}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...rest}
    >
      {children}
    </Link>
  ),
)
LandingButton.displayName = "LandingButton"

/**
 * The primary "buy" CTA. Visitors go to sign-up; signed-in visitors go
 * straight to group creation (where the plan is purchased).
 */
export const CtaButton = (props: Omit<ButtonLinkProps, "href">) => {
  const { signedIn } = useLandingAuth()
  return (
    <LandingButton {...props} href={signedIn ? "/group/create" : "/sign-up"} />
  )
}
