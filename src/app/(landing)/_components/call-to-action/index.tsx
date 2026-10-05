"use client"

import {
  AFFILIATE_PERCENT,
  BILLING_NOTE,
  PRICE,
} from "@/constants/pricing"
import { motion } from "framer-motion"
import { CtaButton, LandingButton } from "../landing-auth"

const STATS = [
  { val: PRICE, label: "All-inclusive, in USD" },
  { val: `${AFFILIATE_PERCENT}%`, label: "Affiliate commission" },
  { val: "Unlimited", label: "Channels per group" },
  { val: "Custom", label: "Domain support" },
]

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
})

const CallToAction = () => {
  return (
    <section className="relative flex flex-col items-center overflow-hidden px-4 pb-20 pt-36 text-center md:pt-44">
      {/* Eyebrow badge */}
      <motion.div
        {...rise(0)}
        className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-widest backdrop-blur-md"
        style={{
          borderColor: "rgba(201,168,76,0.35)",
          background: "rgba(9,9,11,0.4)",
          color: "#C9A84C",
          letterSpacing: "0.12em",
        }}
      >
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: "#C9A84C" }}
        />
        Community · Learning · Commerce
      </motion.div>

      {/* Headline */}
      <motion.h1
        {...rise(0.08)}
        className="relative z-10 font-serif leading-[1.08] tracking-tight"
        style={{
          fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
          fontFamily: "'Georgia', 'Times New Roman', serif",
          color: "#F7ECE9",
          maxWidth: "820px",
        }}
      >
        Build your community.
        <br />
        <span
          style={{
            background:
              "linear-gradient(90deg, #B8943A 0%, #E6C96B 45%, #B8943A 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Teach. Monetise. Scale.
        </span>
      </motion.h1>

      {/* Sub-headline */}
      <motion.p
        {...rise(0.16)}
        className="relative z-10 mt-6 max-w-xl text-base leading-relaxed md:text-lg"
        style={{ color: "#C9C4C1" }}
      >
        Ascendia gives creators and educators one platform to run groups,
        courses, and paid memberships, with Stripe payments, your own domain,
        and an affiliate program built in from day one.
      </motion.p>

      {/* CTAs */}
      <motion.div
        {...rise(0.24)}
        className="relative z-10 mt-10 flex flex-col gap-3 sm:flex-row"
      >
        <CtaButton size="md">Get started for {PRICE} →</CtaButton>
        <LandingButton href="#integrations" variant="ghost" size="md">
          See how it connects
        </LandingButton>
      </motion.div>
      <motion.p
        {...rise(0.3)}
        className="relative z-10 mt-4 max-w-sm text-xs"
        style={{ color: "#9B9594" }}
      >
        {BILLING_NOTE}
      </motion.p>

      {/* Facts strip */}
      <motion.div
        {...rise(0.38)}
        className="relative z-10 mt-14 flex flex-wrap justify-center gap-x-12 gap-y-4"
        style={{ color: "#B4B0AE" }}
      >
        {STATS.map(({ val, label }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <span
              className="text-lg font-semibold"
              style={{ color: "#C9A84C", fontFamily: "Georgia, serif" }}
            >
              {val}
            </span>
            <span className="text-xs">{label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

export default CallToAction
