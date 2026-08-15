"use client"
import Link from "next/link"

const CallToAction = () => {
  return (
    <section className="relative flex flex-col items-center text-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Ambient glow behind headline */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.13) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Eyebrow badge */}
      <div
        className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-medium border"
        style={{
          borderColor: "rgba(201,168,76,0.35)",
          background: "rgba(201,168,76,0.07)",
          color: "#C9A84C",
          letterSpacing: "0.12em",
        }}
      >
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ background: "#C9A84C" }}
        />
        Community · Learning · Commerce
      </div>

      {/* Headline */}
      <h1
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
      </h1>

      {/* Sub-headline */}
      <p
        className="relative z-10 mt-6 text-base md:text-lg leading-relaxed max-w-xl"
        style={{ color: "#B4B0AE" }}
      >
        Ascendia gives creators and educators a single platform to run groups,
        channels, courses, and memberships, with Stripe payments and custom
        domains built in from day one.
      </p>

      {/* CTAs */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-3 mt-10">
        <Link href="/sign-in">
          <button
            className="px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background:
                "linear-gradient(135deg, #C9A84C 0%, #9A7A2E 100%)",
              color: "#09090B",
              boxShadow: "0 0 24px rgba(201,168,76,0.25)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 36px rgba(201,168,76,0.45)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 24px rgba(201,168,76,0.25)")
            }
          >
            Start for free →
          </button>
        </Link>
        <a href="#features">
          <button
            className="px-7 py-3 rounded-xl text-sm font-medium transition-all duration-200 border"
            style={{
              borderColor: "rgba(201,168,76,0.3)",
              background: "rgba(201,168,76,0.06)",
              color: "#C9A84C",
            }}
          >
            See features
          </button>
        </a>
      </div>

      {/* Stats strip */}
      <div
        className="relative z-10 mt-16 flex flex-wrap justify-center gap-x-12 gap-y-4"
        style={{ color: "#B4B0AE" }}
      >
        {[
          { val: "Custom", label: "Domain Support" },
          { val: "Stripe", label: "Payments Built In" },
          { val: "Rich", label: "Course Editor" },
          { val: "Real-time", label: "Messaging" },
        ].map(({ val, label }) => (
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
      </div>
    </section>
  )
}

export default CallToAction