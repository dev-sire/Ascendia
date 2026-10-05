import {
  AFFILIATE_PAYOUT,
  BILLING_NOTE,
  BILLING_SHORT,
  PLAN,
  PRICE,
} from "@/constants/pricing"
import { CtaButton } from "../landing-auth"

const FEATURES = [
  "Your own group with unlimited channels",
  "Course builder with a rich block editor",
  "Loom and YouTube embeds in your lessons",
  "Stripe payments: charge members in USD",
  "Custom domain support",
  "Real-time direct messages",
  `Affiliate link: earn ${AFFILIATE_PAYOUT} per referral`,
]

const STEPS = [
  { n: "1", title: "Create your account", body: "Sign up in under a minute." },
  {
    n: "2",
    title: `Pay ${PRICE} once`,
    body: "Your group is created the moment payment clears.",
  },
  {
    n: "3",
    title: "Open for business",
    body: "Connect Stripe, add your domain, and invite members.",
  },
]

const Check = () => (
  <span
    className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
    style={{
      background: "rgba(201,168,76,0.12)",
      border: "1px solid rgba(201,168,76,0.35)",
    }}
  >
    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden>
      <path
        d="M1 3l2 2 4-4"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
)

export const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="relative flex w-full scroll-mt-28 flex-col items-center px-4 pb-28 pt-20"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 mb-12 flex flex-col items-center text-center">
        <p
          className="mb-4 text-xs uppercase tracking-widest"
          style={{ color: "#C9A84C", letterSpacing: "0.12em" }}
        >
          Pricing
        </p>
        <h2
          className="text-3xl font-semibold leading-tight md:text-4xl"
          style={{ color: "#F7ECE9", fontFamily: "Georgia, serif" }}
        >
          One plan. Everything included.
        </h2>
        <p className="mt-3 max-w-sm text-sm" style={{ color: "#B4B0AE" }}>
          No tiers and no per-feature paywalls. Pay once and run your whole
          community.
        </p>
      </div>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl backdrop-blur-xl"
        style={{
          background: "rgba(9,9,11,0.65)",
          border: "1px solid rgba(201,168,76,0.3)",
          boxShadow: "0 0 60px rgba(201,168,76,0.10)",
        }}
      >
        {/* Gold top bar */}
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, #9A7A2E 0%, #E6C96B 50%, #9A7A2E 100%)",
          }}
        />

        <div className="p-8">
          <p
            className="mb-2 text-xs uppercase tracking-widest"
            style={{ color: "#C9A84C", letterSpacing: "0.12em" }}
          >
            {PLAN.name}
          </p>

          {/* Price */}
          <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
            <span
              className="text-5xl font-bold"
              style={{
                fontFamily: "Georgia, serif",
                background:
                  "linear-gradient(135deg, #B8943A 0%, #E6C96B 60%, #B8943A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {PRICE}
            </span>
            <span className="text-sm" style={{ color: "#9B9594" }}>
              {BILLING_SHORT}
            </span>
          </div>
          <p className="mb-8 text-sm" style={{ color: "#9B9594" }}>
            Everything below is included, with no hidden fees.
          </p>

          {/* Feature list */}
          <ul className="mb-8 flex flex-col gap-3">
            {FEATURES.map((f) => (
              <li
                key={f}
                className="flex items-center gap-3 text-sm"
                style={{ color: "#C9C4C1" }}
              >
                <Check />
                {f}
              </li>
            ))}
          </ul>

          {PLAN.billing === "once" && (
            <p
              className="mb-6 rounded-xl px-4 py-3 text-xs leading-relaxed"
              style={{
                background: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "#E3D6A8",
              }}
            >
              Refer three creators and your plan has paid for itself.
            </p>
          )}

          <CtaButton size="md" className="w-full">
            Create your group · {PRICE} →
          </CtaButton>
        </div>
      </div>

      {/* Footnote */}
      <p
        className="relative z-10 mt-6 max-w-xs text-center text-xs"
        style={{ color: "#9B9594" }}
      >
        {BILLING_NOTE} Members join free or paid, at a USD price you choose.
      </p>

      {/* What happens next */}
      <ol className="relative z-10 mt-14 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        {STEPS.map((step) => (
          <li
            key={step.n}
            className="flex flex-col gap-1.5 rounded-2xl p-5 backdrop-blur-md"
            style={{
              background: "rgba(9,9,11,0.5)",
              border: "1px solid rgba(201,168,76,0.14)",
            }}
          >
            <span
              className="text-xs font-semibold"
              style={{ color: "#C9A84C", fontFamily: "Georgia, serif" }}
            >
              Step {step.n}
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: "#F7ECE9" }}
            >
              {step.title}
            </span>
            <span className="text-xs leading-relaxed" style={{ color: "#B4B0AE" }}>
              {step.body}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
