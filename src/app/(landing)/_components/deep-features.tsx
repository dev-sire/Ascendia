"use client"

import Image from "next/image"
import Link from "next/link"
const GOLD = "#C9A84C"
const GOLD_DIM = "rgba(201,168,76,0.15)"
const DARK = "#09090B"
const GRAY = "#1C1C1F"
const GRAY2 = "#27272A"
const LIGHT = "#B4B0AE"
const CREAM = "#F7ECE9"

// ─── Group Feature Illustration ────────────────────────────────────────────
const GroupIllustration = () => (
  <svg
    viewBox="0 0 560 380"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {/* App chrome */}
    <rect width="560" height="380" rx="14" fill={GRAY} />
    <rect width="560" height="38" rx="0" fill="rgba(0,0,0,0.45)" />
    <rect x="0" y="0" width="560" height="38" rx="14" fill="rgba(0,0,0,0.45)" />
    <rect x="0" y="24" width="560" height="14" fill="rgba(0,0,0,0.45)" />
    {/* Traffic lights */}
    <circle cx="20" cy="19" r="5" fill="#FF5F57" />
    <circle cx="36" cy="19" r="5" fill="#FEBC2E" />
    <circle cx="52" cy="19" r="5" fill="#28C840" />
    {/* Tab bar */}
    <rect x="80" y="10" width="90" height="18" rx="5" fill={GOLD_DIM} />
    <text x="88" y="22" fontSize="9" fill={GOLD} fontFamily="sans-serif">Ascendia Groups</text>

    {/* Left sidebar — group icons */}
    <rect x="0" y="38" width="64" height="342" fill="rgba(0,0,0,0.3)" />
    {[GOLD, "#716768", "#716768", "#716768", "#716768"].map((c, i) => (
      <g key={i}>
        <rect
          x="12"
          y={54 + i * 52}
          width="40"
          height="40"
          rx="12"
          fill={i === 0 ? GOLD_DIM : "rgba(255,255,255,0.04)"}
          stroke={i === 0 ? GOLD : "rgba(255,255,255,0.06)"}
          strokeWidth="1"
        />
        <text x="32" y={78 + i * 52} fontSize="14" textAnchor="middle" fill={c} opacity={i === 0 ? 1 : 0.4}>
          {["✦", "◈", "⬡", "◉", "⊞"][i]}
        </text>
      </g>
    ))}
    {/* Add group button */}
    <g>
      <rect x="12" y="318" width="40" height="40" rx="12" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.2)" strokeWidth="1" strokeDasharray="3 2" />
      <text x="32" y="342" fontSize="16" textAnchor="middle" fill={GOLD} opacity="0.5">+</text>
    </g>

    {/* Channel sidebar */}
    <rect x="64" y="38" width="150" height="342" fill="rgba(0,0,0,0.18)" />
    {/* Group name header */}
    <g>
      <text x="78" y="62" fontSize="11" fill={CREAM} fontWeight="bold" fontFamily="sans-serif">Design Collective</text>
      <text x="78" y="76" fontSize="8" fill={LIGHT} opacity="0.5" fontFamily="sans-serif">247 members · public</text>
      <rect x="70" y="84" width="138" height="1" fill="rgba(201,168,76,0.1)" />
    </g>

    {/* Channel sections */}
    <text x="78" y="100" fontSize="7.5" fill={LIGHT} opacity="0.4" letterSpacing="1" fontFamily="sans-serif">CHANNELS</text>
    {[
      ["# general", true],
      ["# announcements", false],
      ["# resources", false],
      ["# feedback", false],
      ["# off-topic", false],
    ].map(([ch, active], i) => (
      <g key={ch as string}>
        <rect
          x="70"
          y={108 + i * 28}
          width="138"
          height="22"
          rx="5"
          fill={(active as boolean) ? GOLD_DIM : "transparent"}
        />
        <text
          x="82"
          y={123 + i * 28}
          fontSize="10"
          fill={(active as boolean) ? GOLD : LIGHT}
          opacity={(active as boolean) ? 1 : 0.55}
          fontFamily="monospace"
        >
          {ch as string}
        </text>
        {i === 0 && (
          <rect x="192" y="114" width="14" height="10" rx="5" fill={GOLD} opacity="0.8">
            <text x="196" y="122" fontSize="7" fill={DARK}>3</text>
          </rect>
        )}
      </g>
    ))}

    <text x="78" y="260" fontSize="7.5" fill={LIGHT} opacity="0.4" letterSpacing="1" fontFamily="sans-serif">COURSES</text>
    {["UI Fundamentals", "Advanced Motion"].map((c, i) => (
      <g key={c}>
        <rect x="70" y={270 + i * 28} width="138" height="22" rx="5" fill="transparent" />
        <text x="82" y={285 + i * 28} fontSize="10" fill={LIGHT} opacity="0.5" fontFamily="sans-serif">{c}</text>
      </g>
    ))}

    <text x="78" y="338" fontSize="7.5" fill={LIGHT} opacity="0.4" letterSpacing="1" fontFamily="sans-serif">MEMBERS</text>

    {/* Main content area */}
    <rect x="214" y="38" width="346" height="342" fill="rgba(0,0,0,0.08)" />

    <g>
      {/* Channel header */}
      <rect x="214" y="38" width="346" height="44" fill="rgba(0,0,0,0.25)" />
      <text x="226" y="57" fontSize="12" fill={CREAM} fontWeight="bold" fontFamily="sans-serif"># general</text>
      <text x="226" y="71" fontSize="9" fill={LIGHT} opacity="0.4" fontFamily="sans-serif">Community discussion · 247 members</text>
    </g>

    {/* Posts */}
    {[
      { name: "Sarah K.", time: "2h ago", msg: "Just finished the typography module, loved the kerning section!", likes: 12, avatar: GOLD },
      { name: "Omar B.", time: "1h ago", msg: "Anyone using Ascendia for design system docs? Game changer.", likes: 8, avatar: "#716768" },
      { name: "Priya M.", time: "34m ago", msg: "Shared new brand guidelines in #resources, check it out!", likes: 5, avatar: "#877874" },
    ].map(({ name, time, msg, likes, avatar }, i) => (
      <g key={name}>
        <circle cx="232" cy={112 + i * 84} r="16" fill={avatar} opacity="0.7" />
        <text x="232" y={116 + i * 84} fontSize="10" textAnchor="middle" fill={DARK} fontWeight="bold">{name[0]}</text>
        <text x="256" y={108 + i * 84} fontSize="10" fill={CREAM} fontWeight="bold" fontFamily="sans-serif">{name}</text>
        <text x="256" y={120 + i * 84} fontSize="8.5" fill={LIGHT} opacity="0.8" fontFamily="sans-serif">{msg}</text>
        <text x="352" y={108 + i * 84} fontSize="8" fill={LIGHT} opacity="0.35" fontFamily="sans-serif">{time}</text>
        <rect x="256" y={128 + i * 84} width="36" height="14" rx="7" fill="rgba(255,255,255,0.05)" />
        <text x="264" y={138 + i * 84} fontSize="8" fill={LIGHT} opacity="0.5" fontFamily="sans-serif">♥ {likes}</text>
        <rect x="296" y={128 + i * 84} width="36" height="14" rx="7" fill="rgba(255,255,255,0.05)" />
        <text x="303" y={138 + i * 84} fontSize="8" fill={LIGHT} opacity="0.5" fontFamily="sans-serif">↩ Reply</text>
        {i < 2 && <rect x="214" y={154 + i * 84} width="346" height="1" fill="rgba(255,255,255,0.03)" />}
      </g>
    ))}

    {/* Input bar */}
    <g>
      <rect x="222" y="338" width="330" height="32" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
      <text x="234" y="357" fontSize="9" fill={LIGHT} opacity="0.3" fontFamily="sans-serif">Share something with #general…</text>
      <rect x="530" y="344" width="16" height="20" rx="4" fill={GOLD} opacity="0.7" />
      <text x="534" y="357" fontSize="9" fill={DARK}>↑</text>
    </g>
  </svg>
)

// ─── Course Editor Illustration ─────────────────────────────────────────────
const CourseIllustration = () => (
  <svg
    viewBox="0 0 560 380"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <rect width="560" height="380" rx="14" fill={GRAY} />
    {/* Chrome */}
    <rect width="560" height="38" rx="14" fill="rgba(0,0,0,0.5)" />
    <rect y="24" width="560" height="14" fill="rgba(0,0,0,0.5)" />
    <circle cx="20" cy="19" r="5" fill="#FF5F57" />
    <circle cx="36" cy="19" r="5" fill="#FEBC2E" />
    <circle cx="52" cy="19" r="5" fill="#28C840" />
    <text x="80" y="22" fontSize="9" fill={LIGHT} opacity="0.4" fontFamily="sans-serif">Course Builder, UI Fundamentals</text>

    {/* Top toolbar */}
    <rect x="0" y="38" width="560" height="36" fill="rgba(0,0,0,0.35)" />
    {/* Toolbar buttons */}
    {[["B","bold"],["I","italic"],["U","underline"],["H1","h1"],["H2","h2"],["{ }","code"],["«»","quote"],["🔗","link"],["▶","video"],["⊞","table"]].map(([label, key], i) => (
      <g key={key}>
        <rect x={8 + i * 44} y="45" width="38" height="22" rx="4" fill={i < 3 ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.03)"} />
        <text x={27 + i * 44} y="59" fontSize={i === 3 || i === 4 ? "8" : "10"} textAnchor="middle" fill={i < 3 ? GOLD : LIGHT} opacity={i < 3 ? 1 : 0.5} fontFamily={i < 3 ? "sans-serif" : "monospace"} fontWeight={i < 3 ? "bold" : "normal"}>{label}</text>
      </g>
    ))}

    {/* Left — module tree */}
    <rect x="0" y="74" width="170" height="306" fill="rgba(0,0,0,0.25)" />
    <text x="14" y="94" fontSize="8" fill={LIGHT} opacity="0.4" letterSpacing="1" fontFamily="sans-serif">MODULES</text>

    {[
      { title: "1. Getting Started", active: false, lessons: 3 },
      { title: "2. Typography", active: true, lessons: 5 },
      { title: "3. Colour Theory", active: false, lessons: 4 },
      { title: "4. Layout & Grid", active: false, lessons: 6 },
      { title: "5. Components", active: false, lessons: 8 },
    ].map(({ title, active, lessons }, i) => (
      <g key={title}>
        <rect x="8" y={104 + i * 42} width="154" height="34" rx="6" fill={active ? GOLD_DIM : "transparent"} stroke={active ? "rgba(201,168,76,0.3)" : "transparent"} strokeWidth="1" />
        <text x="18" y={119 + i * 42} fontSize="9.5" fill={active ? GOLD : LIGHT} opacity={active ? 1 : 0.6} fontFamily="sans-serif" fontWeight={active ? "bold" : "normal"}>{title}</text>
        <text x="18" y={131 + i * 42} fontSize="8" fill={LIGHT} opacity="0.35" fontFamily="sans-serif">{lessons} lessons</text>
        {active && <rect x="8" y={104 + i * 42} width="3" height="34" rx="2" fill={GOLD} />}
      </g>
    ))}

    {/* Add module */}
    <g>
      <rect x="8" y="318" width="154" height="30" rx="6" fill="rgba(201,168,76,0.05)" stroke="rgba(201,168,76,0.2)" strokeWidth="1" strokeDasharray="3 2" />
      <text x="85" y="337" fontSize="9" textAnchor="middle" fill={GOLD} opacity="0.6" fontFamily="sans-serif">+ Add module</text>
    </g>

    {/* Right — editor canvas */}
    <rect x="170" y="74" width="390" height="306" fill="rgba(0,0,0,0.1)" />

    {/* Lesson title + underline */}
    <g>
      <text x="196" y="112" fontSize="20" fill={CREAM} fontFamily="Georgia, serif" fontWeight="bold">2.1: The Anatomy of Type</text>
      <rect x="196" y="120" width="300" height="1.5" fill={GOLD} opacity="0.25" />
    </g>

    {/* Intro paragraph lines */}
    <g>
      <rect x="196" y="132" width="348" height="8" rx="2" fill={LIGHT} opacity="0.15" />
      <rect x="196" y="146" width="310" height="8" rx="2" fill={LIGHT} opacity="0.12" />
      <rect x="196" y="160" width="330" height="8" rx="2" fill={LIGHT} opacity="0.1" />
    </g>

    {/* Callout block */}
    <g>
      <rect x="196" y="178" width="4" height="52" rx="2" fill={GOLD} opacity="0.7" />
      <rect x="206" y="178" width="338" height="52" rx="6" fill="rgba(201,168,76,0.06)" />
      <rect x="218" y="188" width="280" height="7" rx="2" fill={LIGHT} opacity="0.25" />
      <rect x="218" y="200" width="240" height="7" rx="2" fill={LIGHT} opacity="0.2" />
      <rect x="218" y="212" width="260" height="7" rx="2" fill={LIGHT} opacity="0.18" />
    </g>

    {/* Slash command hint */}
    <g>
      <rect x="196" y="244" width="200" height="28" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
      <text x="206" y="257" fontSize="10" fill={GOLD} opacity="0.7" fontFamily="monospace">/</text>
      <text x="218" y="257" fontSize="9" fill={LIGHT} opacity="0.5" fontFamily="sans-serif">Type a command or block…</text>
      <text x="376" y="257" fontSize="8" fill={LIGHT} opacity="0.3" fontFamily="sans-serif">⌘K</text>
    </g>

    {/* Slash command dropdown */}
    <g>
      <rect x="196" y="276" width="180" height="90" rx="8" fill={GRAY2} stroke="rgba(201,168,76,0.25)" strokeWidth="1" />
      {[["▶  Video embed", true], ["⊞  Image", false], ["{ }  Code block", false], ["«»  Quote", false]].map(([label, hot], i) => (
        <g key={label as string}>
          <rect x="200" y={282 + i * 20} width="172" height="18" rx="4" fill={(hot as boolean) ? GOLD_DIM : "transparent"} />
          <text x="210" y={294 + i * 20} fontSize="9" fill={(hot as boolean) ? GOLD : LIGHT} opacity={(hot as boolean) ? 1 : 0.55} fontFamily="sans-serif">{label as string}</text>
        </g>
      ))}
    </g>

    {/* Active cursor */}
    <rect x="196" y="244" width="2" height="20" rx="1" fill={GOLD} opacity="0.9">
      <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.2s" repeatCount="indefinite" />
    </rect>
  </svg>
)

// ─── Divider ─────────────────────────────────────────────────────────────────
const GoldRule = () => (
  <div
    className="w-full h-px"
    style={{
      background:
        "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.18) 50%, transparent 100%)",
    }}
  />
)

// ─── Section label ────────────────────────────────────────────────────────────
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p
    className="text-xs tracking-widest uppercase"
    style={{ color: GOLD, letterSpacing: "0.12em" }}
  >
    {children}
  </p>
)

// ─── Stat pill ───────────────────────────────────────────────────────────────
const StatPill = ({ value, label }: { value: string; label: string }) => (
  <div
    className="flex flex-col items-start gap-0.5 pl-4"
    style={{ borderLeft: "2px solid rgba(201,168,76,0.35)" }}
  >
    <span
      className="text-2xl font-bold"
      style={{ fontFamily: "Georgia, serif", color: GOLD }}
    >
      {value}
    </span>
    <span className="text-xs" style={{ color: LIGHT }}>
      {label}
    </span>
  </div>
)

// ─── Bullet ──────────────────────────────────────────────────────────────────
const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3 text-sm" style={{ color: LIGHT }}>
    <span
      className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
      style={{
        background: "rgba(201,168,76,0.1)",
        border: "1px solid rgba(201,168,76,0.3)",
      }}
    >
      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
        <path
          d="M1 3l2 2 4-4"
          stroke={GOLD}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
    {children}
  </li>
)

// ─── Groups Section ───────────────────────────────────────────────────────────
const GroupsSection = () => (
  <section className="w-full relative overflow-hidden py-24 px-6 md:px-10">
    {/* Ambient */}
    <div
      className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 65%)",
        filter: "blur(60px)",
      }}
    />

    <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Text side */}
      <div className="flex flex-col gap-6">
        <Eyebrow>Groups &amp; Channels</Eyebrow>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight"
          style={{ fontFamily: "Georgia, serif", color: CREAM }}
        >
          Your community.
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #B8943A, #E6C96B, #B8943A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Your rules.
          </span>
        </h2>
        <p className="text-base leading-relaxed max-w-md" style={{ color: LIGHT }}>
          Build a space that reflects your brand. Invite members, create channels
          for every topic, moderate with ease, and watch your audience compound
          over time, all without duct-taping Discord to a spreadsheet.
        </p>

        <ul className="flex flex-col gap-3">
          <Bullet>Unlimited channels per group, text, resource, and announcement types</Bullet>
          <Bullet>Role-based access so the right people see the right content</Bullet>
          <Bullet>Pinned posts, rich embeds, and threaded replies built in</Bullet>
          <Bullet>Members can DM each other directly, no third-party app required</Bullet>
        </ul>

        <div className="flex gap-8 mt-2">
          <StatPill value="∞" label="Channels per group" />
          <StatPill value="1-click" label="Member invites" />
          <StatPill value="Real-time" label="Activity feed" />
        </div>

        <div className="flex gap-3 mt-2">
          <Link href="/sign-in">
            <button
              className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #C9A84C, #9A7A2E)",
                color: DARK,
                boxShadow: "0 0 24px rgba(201,168,76,0.2)",
              }}
            >
              Create your group →
            </button>
          </Link>
          <Link href="/explore">
            <button
              className="px-6 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200"
              style={{
                borderColor: "rgba(201,168,76,0.25)",
                background: "rgba(201,168,76,0.05)",
                color: GOLD,
              }}
            >
              Explore groups
            </button>
          </Link>
        </div>
      </div>

      {/* Illustration side */}
      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{
          border: "1px solid rgba(201,168,76,0.15)",
          boxShadow:
            "0 0 0 1px rgba(201,168,76,0.05), 0 32px 80px rgba(0,0,0,0.5)",
          aspectRatio: "560/380",
        }}
      >
        <GroupIllustration />
      </div>
    </div>
  </section>
)

// ─── Course Section ───────────────────────────────────────────────────────────
const CourseSection = () => (
  <section className="w-full relative overflow-hidden py-24 px-6 md:px-10">
    {/* Ambient — right side */}
    <div
      className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 65%)",
        filter: "blur(60px)",
      }}
    />

    <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Illustration first on desktop */}
      <div
        className="w-full rounded-2xl overflow-hidden order-2 lg:order-1"
        style={{
          border: "1px solid rgba(201,168,76,0.15)",
          boxShadow:
            "0 0 0 1px rgba(201,168,76,0.05), 0 32px 80px rgba(0,0,0,0.5)",
          aspectRatio: "560/380",
        }}
      >
        <CourseIllustration />
      </div>

      {/* Text side */}
      <div className="flex flex-col gap-6 order-1 lg:order-2">
        <Eyebrow>Course Builder</Eyebrow>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight"
          style={{ fontFamily: "Georgia, serif", color: CREAM }}
        >
          An editor that
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #B8943A, #E6C96B, #B8943A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            thinks like you do.
          </span>
        </h2>
        <p className="text-base leading-relaxed max-w-md" style={{ color: LIGHT }}>
          Most course platforms give you a text box. Ascendia gives you a
          block-based editor with slash commands, drag-and-drop modules, rich
          media embeds, and code syntax highlighting, so your content looks
          as good as what you're teaching.
        </p>

        <ul className="flex flex-col gap-3">
          <Bullet>Slash-command palette: insert video, code, quote, table, or image instantly</Bullet>
          <Bullet>Drag modules into any order without losing student progress</Bullet>
          <Bullet>Syntax-highlighted code blocks with copy-to-clipboard built in</Bullet>
          <Bullet>Gate any course behind a Stripe payment, one toggle, done</Bullet>
        </ul>

        <div className="flex gap-8 mt-2">
          <StatPill value="Block" label="Based editing" />
          <StatPill value="Stripe" label="Course gating" />
          <StatPill value="Video" label="Native embeds" />
        </div>

        <div className="flex gap-3 mt-2">
          <Link href="/sign-in">
            <button
              className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #C9A84C, #9A7A2E)",
                color: DARK,
                boxShadow: "0 0 24px rgba(201,168,76,0.2)",
              }}
            >
              Build your first course →
            </button>
          </Link>
        </div>
      </div>
    </div>
  </section>
)

// ─── Final CTA Banner ─────────────────────────────────────────────────────────
const FinalCTA = () => (
  <section className="w-full px-6 md:px-10 py-20">
    <div
      className="max-w-4xl mx-auto rounded-3xl relative overflow-hidden flex flex-col items-center text-center px-8 py-16"
      style={{
        background:
          "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.03) 50%, rgba(201,168,76,0.08) 100%)",
        border: "1px solid rgba(201,168,76,0.2)",
        boxShadow: "0 0 80px rgba(201,168,76,0.06) inset",
      }}
    >
      {/* Corner ornaments */}
      <div
        className="absolute top-0 left-0 w-24 h-24 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(201,168,76,0.2) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom right, rgba(201,168,76,0.2) 0%, transparent 70%)",
        }}
      />

      <Eyebrow>Ready when you are</Eyebrow>
      <h2
        className="mt-4 text-3xl md:text-5xl font-semibold leading-tight max-w-2xl"
        style={{ fontFamily: "Georgia, serif", color: CREAM }}
      >
        Stop piecing tools together.
        <br />
        <span
          style={{
            background: "linear-gradient(90deg, #B8943A, #E6C96B, #B8943A)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Build something that lasts.
        </span>
      </h2>
      <p className="mt-5 text-base max-w-lg" style={{ color: LIGHT }}>
        One platform. Your domain. Your Stripe account. Your community.
        Everything from the first post to the first payment.
      </p>
      <Link href="/sign-in" className="mt-8">
        <button
          className="px-10 py-3.5 rounded-2xl text-base font-semibold transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #C9A84C 0%, #9A7A2E 100%)",
            color: DARK,
            boxShadow: "0 0 40px rgba(201,168,76,0.3)",
          }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 60px rgba(201,168,76,0.5)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 40px rgba(201,168,76,0.3)")}
        >
          Start for free! no credit card needed
        </button>
      </Link>
      <p className="mt-4 text-xs" style={{ color: "#716768" }}>
        14-day trial · Cancel anytime · Credit card required after trial
      </p>
    </div>
  </section>
)

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer
    className="w-full px-6 md:px-10 pt-16 pb-10"
    style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}
  >
    <div className="max-w-6xl mx-auto">
      {/* Top row */}
      <div className="flex flex-col md:flex-row justify-between gap-10 pb-12" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Brand */}
        <div className="flex flex-col gap-4 max-w-xs">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Ascendia Logo"
              width={28}
              height={28}
              className="rounded-lg flex-shrink-0 object-contain"
            />
            <span className="text-lg font-bold" style={{ fontFamily: "Georgia, serif", color: CREAM }}>
              Ascendia<span style={{ color: GOLD }}>.</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: LIGHT }}>
            The platform for creators who are serious about building a community,
            selling knowledge, and owning their audience.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {[
            {
              heading: "Product",
              links: [["Features", "#features"], ["Pricing", "#pricing"], ["Explore", "/explore"]],
            },
            {
              heading: "Account",
              links: [["Sign in", "/sign-in"], ["Sign up", "/sign-in"], ["Dashboard", "/sign-in"]],
            },
            {
              heading: "Legal",
              links: [["Privacy", "#"], ["Terms", "#"], ["Cookies", "#"]],
            },
          ].map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: GOLD, letterSpacing: "0.1em" }}>
                {heading}
              </p>
              {links.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm transition-colors duration-150 hover:text-amber-400"
                  style={{ color: LIGHT }}
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
        <p className="text-xs" style={{ color: "#716768" }}>
          © {new Date().getFullYear()} Ascendia. All rights reserved.
        </p>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "#4ade80" }}
          />
          <p className="text-xs" style={{ color: "#716768" }}>
            All systems operational
          </p>
        </div>
      </div>
    </div>
  </footer>
)

// ─── Export ───────────────────────────────────────────────────────────────────
export { CourseSection, FinalCTA, Footer, GoldRule, GroupsSection }

