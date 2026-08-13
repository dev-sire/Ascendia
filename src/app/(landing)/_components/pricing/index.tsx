import Link from "next/link"

const FEATURES = [
  "1 Group with unlimited channels",
  "Custom domain (bring your own)",
  "Stripe payments integration",
  "Course builder with rich editor",
  "Real-time direct messages",
  "Affiliate link tracking",
  "24/7 support",
]

export const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="w-full flex flex-col items-center px-4 pb-28"
    >
      {/* Ambient glow */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.09) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center text-center mb-12">
        <p
          className="text-xs tracking-widest uppercase mb-4"
          style={{ color: "#C9A84C", letterSpacing: "0.12em" }}
        >
          Pricing
        </p>
        <h2
          className="text-3xl md:text-4xl font-semibold leading-tight"
          style={{ color: "#F7ECE9", fontFamily: "Georgia, serif" }}
        >
          Simple, honest pricing.
        </h2>
        <p className="mt-3 text-sm max-w-sm" style={{ color: "#B4B0AE" }}>
          One plan. Everything included. No per-feature paywalls.
        </p>
      </div>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(201,168,76,0.3)",
          boxShadow: "0 0 60px rgba(201,168,76,0.08)",
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
          {/* Plan name */}
          <p
            className="text-xs tracking-widest uppercase mb-2"
            style={{ color: "#C9A84C", letterSpacing: "0.12em" }}
          >
            Creator Plan
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-1 mb-1">
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
              PKR 999
            </span>
            <span style={{ color: "#716768" }}>/month</span>
          </div>
          <p className="text-sm mb-8" style={{ color: "#716768" }}>
            Cancel anytime. No hidden fees.
          </p>

          {/* Feature list */}
          <ul className="flex flex-col gap-3 mb-8">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm" style={{ color: "#B4B0AE" }}>
                <span
                  className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(201,168,76,0.12)",
                    border: "1px solid rgba(201,168,76,0.35)",
                  }}
                >
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3l2 2 4-4" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link href="/sign-in" className="block w-full">
            <button
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #C9A84C 0%, #9A7A2E 100%)",
                color: "#09090B",
                boxShadow: "0 0 20px rgba(201,168,76,0.2)",
              }}
            >
              Get started today →
            </button>
          </Link>
        </div>
      </div>

      {/* Footnote */}
      <p className="relative z-10 mt-6 text-xs" style={{ color: "#716768" }}>
        First 14 days free. Credit card required after trial.
      </p>
    </section>
  )
}