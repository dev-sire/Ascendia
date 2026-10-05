"use client"

import { AnimatedBeam } from "@/components/ui/animated-beam"
import { AFFILIATE_PAYOUT } from "@/constants/pricing"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Globe, Share2, Sparkles } from "lucide-react"
import Image from "next/image"
import { createRef, forwardRef, useMemo, useRef } from "react"

// ─── Brand marks ─────────────────────────────────────────────────────────────

const YouTubeMark = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden>
    <path
      fill="#FF0000"
      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
    />
  </svg>
)

// Loom's asterisk mark, drawn as four crossing rounded strokes.
const LoomMark = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden fill="none">
    <g stroke="#625DF5" strokeWidth="2.6" strokeLinecap="round">
      <path d="M12 2.5v19" />
      <path d="M2.5 12h19" />
      <path d="M5.3 5.3l13.4 13.4" />
      <path d="M18.7 5.3L5.3 18.7" />
    </g>
  </svg>
)

const StripeMark = () => (
  <Image
    src="/stripe.png"
    alt=""
    width={534}
    height={218}
    className="h-auto w-full"
  />
)

// ─── Node ────────────────────────────────────────────────────────────────────

type NodeProps = {
  children: React.ReactNode
  label: string
  className?: string
}

const Node = forwardRef<HTMLDivElement, NodeProps>(
  ({ children, label, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative z-10 flex size-12 items-center justify-center rounded-full border border-[rgba(201,168,76,0.3)] bg-[rgba(9,9,11,0.92)] p-3 shadow-[0_0_28px_-10px_rgba(0,0,0,0.9)] md:size-14",
        className,
      )}
    >
      {children}
      <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium tracking-wide text-[#B4B0AE] md:text-xs">
        {label}
      </span>
    </div>
  ),
)
Node.displayName = "Node"

// ─── Data ────────────────────────────────────────────────────────────────────

const gold = "h-full w-full text-[#E6C96B]"

type Service = {
  id: string
  label: string
  side: "left" | "right"
  icon: React.ReactNode
  /** Where the beam lands on the centre node, to fan the lines out. */
  endYOffset: number
  duration: number
  delay: number
  title: string
  description: string
}

const SERVICES: Service[] = [
  {
    id: "loom",
    label: "Loom",
    side: "left",
    icon: <LoomMark />,
    endYOffset: -14,
    duration: 4.4,
    delay: 0,
    title: "Loom",
    description:
      "Record a walkthrough and drop it straight into a course lesson or your group page.",
  },
  {
    id: "youtube",
    label: "YouTube",
    side: "left",
    icon: <YouTubeMark />,
    endYOffset: 0,
    duration: 5.0,
    delay: 0.6,
    title: "YouTube",
    description:
      "Embed videos in your lessons and your group's public gallery, with no uploads to manage.",
  },
  {
    id: "stripe",
    label: "Stripe",
    side: "left",
    icon: <StripeMark />,
    endYOffset: 14,
    duration: 4.7,
    delay: 1.2,
    title: "Stripe",
    description:
      "Connect your account, set a membership price in USD, and charge members to join.",
  },
  {
    id: "domains",
    label: "Domains",
    side: "right",
    icon: <Globe className={gold} strokeWidth={1.75} />,
    endYOffset: -14,
    duration: 4.6,
    delay: 0.3,
    title: "Domains",
    description:
      "Serve your community from your own domain, with the DNS records laid out for you.",
  },
  {
    id: "ai",
    label: "AI",
    side: "right",
    icon: <Sparkles className={gold} strokeWidth={1.75} />,
    endYOffset: 0,
    duration: 5.2,
    delay: 0.9,
    title: "AI",
    description:
      "AI assistance woven into how you create and run your community.",
  },
  {
    id: "affiliates",
    label: "Affiliates",
    side: "right",
    icon: <Share2 className={gold} strokeWidth={1.75} />,
    endYOffset: 14,
    duration: 4.8,
    delay: 1.5,
    title: "Affiliates",
    description: `Share your link and earn ${AFFILIATE_PAYOUT} for every creator who launches a group through it.`,
  },
]

// ─── Section ─────────────────────────────────────────────────────────────────

const ConnectedServices = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useMemo(
    () => SERVICES.map(() => createRef<HTMLDivElement>()),
    [],
  )

  const left = SERVICES.filter((s) => s.side === "left")
  const right = SERVICES.filter((s) => s.side === "right")

  const renderColumn = (items: Service[]) => (
    <div className="flex flex-col gap-12 md:gap-14">
      {items.map((s) => (
        <Node key={s.id} ref={nodeRefs[SERVICES.indexOf(s)]} label={s.label}>
          {s.icon}
        </Node>
      ))}
    </div>
  )

  return (
    <section
      id="integrations"
      className="relative w-full scroll-mt-28 px-4 pb-24 md:px-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-6xl"
      >
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <p
            className="mb-4 text-xs uppercase tracking-widest"
            style={{ color: "#C9A84C", letterSpacing: "0.12em" }}
          >
            Integrations
          </p>
          <h2
            className="max-w-xl text-3xl font-semibold leading-tight md:text-4xl"
            style={{ color: "#F7ECE9", fontFamily: "Georgia, serif" }}
          >
            Everything connects.{" "}
            <span className="text-[#C9A84C]">Nothing to stitch together.</span>
          </h2>
          <p className="mt-4 max-w-md text-sm" style={{ color: "#B4B0AE" }}>
            Video, payments, your domain, AI and referrals plug straight into
            your community, so you launch in an afternoon instead of wiring up
            six different tools.
          </p>
        </div>

        {/* Beam diagram */}
        <div
          ref={containerRef}
          aria-hidden
          className="relative mx-auto flex w-full max-w-xl items-center justify-between px-2 pb-8 pt-4 md:px-6"
        >
          {renderColumn(left)}

          <div
            ref={centerRef}
            className="relative z-10 flex size-20 items-center justify-center rounded-full border border-[rgba(201,168,76,0.5)] bg-[rgba(9,9,11,0.95)] shadow-[0_0_60px_rgba(201,168,76,0.35)] md:size-24"
          >
            <Image
              src="/logo.png"
              alt=""
              width={48}
              height={48}
              className="h-11 w-11 rounded-xl object-contain md:h-12 md:w-12"
            />
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold tracking-wide text-[#F7ECE9]">
              Ascendia
            </span>
          </div>

          {renderColumn(right)}

          {SERVICES.map((s, i) => (
            <AnimatedBeam
              key={s.id}
              containerRef={containerRef}
              fromRef={nodeRefs[i]}
              toRef={centerRef}
              endYOffset={s.endYOffset}
              duration={s.duration}
              delay={s.delay}
              reverse={s.side === "right"}
              pathColor="#F7ECE9"
              pathOpacity={0.14}
              gradientStartColor="#5AD2F4"
              gradientStopColor="#E6C96B"
            />
          ))}
        </div>

        {/* What each connection does */}
        <ul className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: (i % 3) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-[rgba(9,9,11,0.55)] p-5 backdrop-blur-md transition-colors duration-300 hover:border-[rgba(201,168,76,0.35)]"
            >
              <h3
                className="text-base font-semibold"
                style={{ color: "#F7ECE9", fontFamily: "Georgia, serif" }}
              >
                {s.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "#B4B0AE" }}
              >
                {s.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}

export default ConnectedServices
