"use client"

import React from "react"

// ──────────────────────────────────────────────────────────────
// Tiny inline SVG "window mocks" for each feature — deliberately
// sketched / schematic, not pixel-perfect screenshots.
// ──────────────────────────────────────────────────────────────

const GOLD = "#C9A84C"
const GOLD_DIM = "rgba(201,168,76,0.18)"
const DARK = "#09090B"
const GRAY = "#27272A"
const LIGHT = "#B4B0AE"

const MockDomain = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="320" height="180" rx="8" fill={GRAY} />
    <rect x="12" y="12" width="100" height="10" rx="3" fill={GOLD_DIM} />
    <rect x="12" y="30" width="296" height="1" fill="rgba(201,168,76,0.15)" />
    <rect x="12" y="46" width="80" height="7" rx="2" fill={LIGHT} opacity="0.3" />
    <rect x="12" y="62" width="296" height="34" rx="6" fill="rgba(255,255,255,0.04)" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1" />
    <text x="22" y="83" fontSize="11" fill={LIGHT} opacity="0.6" fontFamily="monospace">yourapp.com</text>
    <rect x="256" y="70" width="44" height="20" rx="4" fill={GOLD} opacity="0.85" />
    <text x="261" y="83" fontSize="9" fill={DARK} fontWeight="bold" fontFamily="sans-serif">Save</text>
    <rect x="12" y="108" width="180" height="7" rx="2" fill={LIGHT} opacity="0.15" />
    <rect x="12" y="122" width="120" height="7" rx="2" fill={LIGHT} opacity="0.1" />
    <circle cx="294" cy="116" r="8" fill="rgba(74,222,128,0.2)" stroke="rgba(74,222,128,0.6)" strokeWidth="1" />
    <circle cx="294" cy="116" r="3" fill="#4ade80" />
    <text x="272" y="120" fontSize="8" fill="#4ade80" opacity="0.8" fontFamily="sans-serif">live</text>
  </svg>
)

const MockStripe = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="320" height="180" rx="8" fill={GRAY} />
    {/* Stripe logo area */}
    <rect x="12" y="14" width="44" height="28" rx="6" fill="#635BFF" opacity="0.9" />
    <text x="19" y="32" fontSize="13" fill="white" fontWeight="bold" fontFamily="sans-serif">S</text>
    <rect x="64" y="18" width="70" height="8" rx="2" fill={LIGHT} opacity="0.4" />
    <rect x="64" y="30" width="50" height="6" rx="2" fill={LIGHT} opacity="0.2" />
    <rect x="12" y="52" width="296" height="1" fill="rgba(201,168,76,0.15)" />
    {/* connect button */}
    <rect x="12" y="64" width="296" height="40" rx="6" fill="rgba(99,91,255,0.08)" stroke="rgba(99,91,255,0.35)" strokeWidth="1" />
    <text x="50" y="88" fontSize="11" fill={LIGHT} opacity="0.7" fontFamily="sans-serif">Connect your Stripe account</text>
    <rect x="248" y="72" width="52" height="24" rx="5" fill="#635BFF" opacity="0.9" />
    <text x="254" y="87" fontSize="9" fill="white" fontWeight="bold" fontFamily="sans-serif">Connect</text>
    {/* revenue mini chart */}
    <rect x="12" y="116" width="296" height="52" rx="6" fill="rgba(255,255,255,0.03)" />
    <text x="22" y="130" fontSize="8" fill={LIGHT} opacity="0.5" fontFamily="sans-serif">Monthly Revenue</text>
    <text x="22" y="148" fontSize="16" fill={GOLD} fontFamily="Georgia, serif" fontWeight="bold">PKR 12,400</text>
    <polyline points="170,158 200,140 230,148 260,132 290,120" stroke={GOLD} strokeWidth="1.5" fill="none" opacity="0.7" />
  </svg>
)

const MockGroups = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="320" height="180" rx="8" fill={GRAY} />
    {/* Sidebar */}
    <rect width="72" height="180" rx="0" fill="rgba(0,0,0,0.3)" />
    {["#C9A84C","#716768","#716768","#716768"].map((c,i)=>(
      <circle key={i} cx="36" cy={28 + i*30} r="10" fill={c} opacity={i===0?0.9:0.35} />
    ))}
    {/* Channel list */}
    <text x="84" y="24" fontSize="9" fill={LIGHT} opacity="0.4" fontFamily="sans-serif" letterSpacing="1">CHANNELS</text>
    {["# general","# announcements","# resources","# off-topic"].map((ch, i) => (
      <g key={ch}>
        <rect x="80" y={30 + i * 28} width="160" height="20" rx="4" fill={i===0 ? GOLD_DIM : "transparent"} />
        <text x="88" y={43 + i * 28} fontSize="10" fill={i===0?GOLD:LIGHT} opacity={i===0?1:0.5} fontFamily="monospace">{ch}</text>
      </g>
    ))}
    {/* Members */}
    <rect x="260" y="12" width="48" height="156" rx="4" fill="rgba(255,255,255,0.02)" />
    <text x="264" y="24" fontSize="7" fill={LIGHT} opacity="0.4" fontFamily="sans-serif">MEMBERS</text>
    {[0,1,2,3,4].map(i=>(
      <circle key={i} cx="284" cy={36 + i*24} r="8" fill={GOLD_DIM} stroke={GOLD} strokeOpacity="0.3" strokeWidth="1" />
    ))}
  </svg>
)

const MockMessages = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="320" height="180" rx="8" fill={GRAY} />
    {/* Conversation list */}
    <rect width="110" height="180" fill="rgba(0,0,0,0.25)" />
    <text x="12" y="20" fontSize="8" fill={LIGHT} opacity="0.4" fontFamily="sans-serif" letterSpacing="1">MESSAGES</text>
    {[["Ali K.","Hey, when does..."],["Sara M.","Loved the course!"],["Omar B.","Can you share..."]].map(([name, preview], i)=>(
      <g key={name}>
        <rect x="8" y={28 + i*38} width="96" height="30" rx="5" fill={i===0?GOLD_DIM:"transparent"} />
        <circle cx="24" cy={43 + i*38} r="8" fill={i===0?GOLD:"#716768"} opacity="0.7" />
        <text x="36" y={40 + i*38} fontSize="9" fill={i===0?GOLD:LIGHT} fontWeight="bold" fontFamily="sans-serif">{name}</text>
        <text x="36" y={50 + i*38} fontSize="8" fill={LIGHT} opacity="0.4" fontFamily="sans-serif">{(preview as string).slice(0,14)}…</text>
      </g>
    ))}
    {/* Chat area */}
    <rect x="116" y="12" width="192" height="120" rx="0" fill="transparent" />
    {/* received */}
    <rect x="120" y="20" width="120" height="28" rx="10" fill="rgba(255,255,255,0.06)" />
    <text x="130" y="37" fontSize="9" fill={LIGHT} fontFamily="sans-serif">Hey! When does the</text>
    <rect x="120" y="52" width="80" height="20" rx="10" fill="rgba(255,255,255,0.06)" />
    <text x="130" y="65" fontSize="9" fill={LIGHT} fontFamily="sans-serif">next module drop?</text>
    {/* sent */}
    <rect x="196" y="84" width="112" height="28" rx="10" fill={GOLD_DIM} />
    <text x="204" y="101" fontSize="9" fill={GOLD} fontFamily="sans-serif">This Friday, stay</text>
    <rect x="222" y="116" width="86" height="18" rx="8" fill={GOLD_DIM} />
    <text x="230" y="128" fontSize="9" fill={GOLD} fontFamily="sans-serif">tuned! 🎉</text>
    {/* input */}
    <rect x="116" y="150" width="192" height="22" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(201,168,76,0.25)" strokeWidth="1" />
    <text x="126" y="164" fontSize="8" fill={LIGHT} opacity="0.3" fontFamily="sans-serif">Type a message…</text>
  </svg>
)

const MockCourse = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="320" height="180" rx="8" fill={GRAY} />
    {/* Editor toolbar */}
    <rect x="0" y="0" width="320" height="28" rx="0" fill="rgba(0,0,0,0.4)" />
    {["B","I","U","H1","H2","—","⇶","🔗","▶"].map((t,i)=>(
      <text key={t} x={12 + i * 32} y="18" fontSize="9" fill={i===0?GOLD:LIGHT} opacity={i===0?1:0.5} fontFamily="monospace" fontWeight={i===0?"bold":"normal"}>{t}</text>
    ))}
    {/* Content area */}
    <text x="16" y="52" fontSize="14" fill={LIGHT} fontFamily="Georgia, serif" fontWeight="bold">Module 1: Introduction</text>
    <rect x="16" y="60" width="200" height="1" fill={GOLD} opacity="0.3" />
    <rect x="16" y="68" width="288" height="7" rx="2" fill={LIGHT} opacity="0.15" />
    <rect x="16" y="80" width="240" height="7" rx="2" fill={LIGHT} opacity="0.12" />
    <rect x="16" y="92" width="260" height="7" rx="2" fill={LIGHT} opacity="0.1" />
    {/* Block quote */}
    <rect x="16" y="108" width="3" height="36" rx="2" fill={GOLD} opacity="0.7" />
    <rect x="26" y="112" width="220" height="6" rx="2" fill={LIGHT} opacity="0.2" />
    <rect x="26" y="124" width="180" height="6" rx="2" fill={LIGHT} opacity="0.15" />
    <rect x="26" y="136" width="200" height="6" rx="2" fill={LIGHT} opacity="0.12" />
    {/* Cursor blink */}
    <rect x="16" y="152" width="2" height="14" rx="1" fill={GOLD} opacity="0.8" />
  </svg>
)

const MockAffiliate = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="320" height="180" rx="8" fill={GRAY} />
    <text x="16" y="28" fontSize="13" fill={LIGHT} fontFamily="Georgia, serif" fontWeight="bold">Affiliate Dashboard</text>
    <rect x="16" y="36" width="288" height="1" fill="rgba(201,168,76,0.2)" />
    {/* Stats cards */}
    {[["Links Shared","147"],["Conversions","34"],["Earned","PKR 8,200"]].map(([label, val], i) => (
      <g key={label as string}>
        <rect x={16 + i * 100} y="48" width="90" height="50" rx="6" fill="rgba(255,255,255,0.03)" stroke={GOLD} strokeOpacity="0.2" strokeWidth="1" />
        <text x={26 + i * 100} y="66" fontSize="8" fill={LIGHT} opacity="0.5" fontFamily="sans-serif">{label}</text>
        <text x={26 + i * 100} y="86" fontSize="13" fill={GOLD} fontFamily="Georgia, serif" fontWeight="bold">{val as string}</text>
      </g>
    ))}
    {/* Link row */}
    <rect x="16" y="112" width="288" height="28" rx="6" fill="rgba(255,255,255,0.03)" />
    <text x="26" y="129" fontSize="9" fill={LIGHT} opacity="0.5" fontFamily="monospace">ascendia.app/ref/aman_k92</text>
    <rect x="262" y="118" width="34" height="16" rx="4" fill={GOLD_DIM} />
    <text x="269" y="129" fontSize="8" fill={GOLD} fontFamily="sans-serif">Copy</text>
    {/* payout */}
    <text x="16" y="160" fontSize="8" fill={LIGHT} opacity="0.35" fontFamily="sans-serif">Next payout · 3 days</text>
    <rect x="130" y="153" width="174" height="6" rx="3" fill="rgba(255,255,255,0.05)" />
    <rect x="130" y="153" width="98" height="6" rx="3" fill={GOLD} opacity="0.5" />
  </svg>
)

// ──────────────────────────────────────────────────────────────

type Feature = {
  id: number
  eyebrow: string
  title: string
  description: string
  mock: React.ReactNode
}

const FEATURES: Feature[] = [
  {
    id: 1,
    eyebrow: "Domain",
    title: "Your brand, your URL",
    description:
      "Point any custom domain to your Ascendia group. SSL is handled automatically, no DevOps required.",
    mock: <MockDomain />,
  },
  {
    id: 2,
    eyebrow: "Payments",
    title: "Stripe, wired in",
    description:
      "Connect your Stripe account and start charging for memberships, courses, or one-off products in minutes.",
    mock: <MockStripe />,
  },
  {
    id: 3,
    eyebrow: "Community",
    title: "Groups & channels",
    description:
      "Create unlimited channels inside your group. Organise discussions, resources, and announcements, all in one place.",
    mock: <MockGroups />,
  },
  {
    id: 4,
    eyebrow: "Messaging",
    title: "Direct & personal",
    description:
      "Real-time private messages between members. No third-party app needed, it lives right inside Ascendia.",
    mock: <MockMessages />,
  },
  {
    id: 5,
    eyebrow: "Courses",
    title: "State-of-the-art editor",
    description:
      "Slash commands, rich embeds, code blocks, video, and drag-and-drop modules. Build professional courses without touching a CMS.",
    mock: <MockCourse />,
  },
  {
    id: 6,
    eyebrow: "Affiliates",
    title: "Grow through referrals",
    description:
      "Issue trackable affiliate links, set commission rates, and let your community become your sales team.",
    mock: <MockAffiliate />,
  },
]

const FeatureCard = ({ feature }: { feature: Feature }) => (
  <div
    className="flex flex-col rounded-2xl overflow-hidden transition-all duration-300 group"
    style={{
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(201,168,76,0.12)",
    }}
    onMouseEnter={(e) => {
      ;(e.currentTarget as HTMLDivElement).style.border =
        "1px solid rgba(201,168,76,0.35)"
      ;(e.currentTarget as HTMLDivElement).style.background =
        "rgba(201,168,76,0.04)"
    }}
    onMouseLeave={(e) => {
      ;(e.currentTarget as HTMLDivElement).style.border =
        "1px solid rgba(201,168,76,0.12)"
      ;(e.currentTarget as HTMLDivElement).style.background =
        "rgba(255,255,255,0.025)"
    }}
  >
    {/* Mock window */}
    <div
      className="relative w-full overflow-hidden pt-8"
      style={{ background: "#27272A", height: "180px" }}
    >
      {/* Window chrome dots */}
      <div className="absolute top-3.5 left-4 flex gap-1.5 z-20">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
      </div>

      {/* Mock content wrapper */}
      <div className="w-full h-full">
        {feature.mock}
      </div>
    </div>

    {/* Text */}
    <div className="flex flex-col gap-2 p-5">
      <span
        className="text-xs font-medium tracking-widest uppercase"
        style={{ color: "#C9A84C", letterSpacing: "0.1em" }}
      >
        {feature.eyebrow}
      </span>
      <h3
        className="text-base font-semibold leading-snug"
        style={{ color: "#F7ECE9", fontFamily: "Georgia, serif" }}
      >
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "#B4B0AE" }}>
        {feature.description}
      </p>
    </div>
  </div>
)

const DashboardSnippet = () => {
  return (
    <section id="features" className="w-full px-4 md:px-10 pb-20">
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-14">
        <p
          className="text-xs tracking-widest uppercase mb-4"
          style={{ color: "#C9A84C", letterSpacing: "0.12em" }}
        >
          Everything you need
        </p>
        <h2
          className="text-3xl md:text-4xl font-semibold leading-tight max-w-lg"
          style={{ color: "#F7ECE9", fontFamily: "Georgia, serif" }}
        >
          One platform. Every tool your community requires.
        </h2>
        <p className="mt-4 text-sm max-w-md" style={{ color: "#B4B0AE" }}>
          No duct-taping six different apps together. Ascendia handles it all,
          so you can focus on what you actually teach.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  )
}

export default DashboardSnippet