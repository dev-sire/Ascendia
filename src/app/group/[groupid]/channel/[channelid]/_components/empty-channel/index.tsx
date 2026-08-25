"use client"

import { useGroupInfo } from "@/hooks/groups"
import {
    BookOpen,
    MessageSquare,
    PenSquare,
    Sparkles,
    Users,
} from "lucide-react"

type EmptyChannelProps = {
  userid: string
}

export const EmptyChannel = ({ userid }: EmptyChannelProps) => {
  const { group, loading } = useGroupInfo()

  if (loading || !group) return null

  const isOwner = group.userId === userid

  if (isOwner) return <OwnerOnboarding groupName={group.name} />
  return <MemberWelcome groupName={group.name} />
}

// ── Owner view ────────────────────────────────────────────────────────────────

const steps = [
  {
    icon: PenSquare,
    label: "Write your first post",
    detail: "Introduce yourself, share what this group is about, or drop a resource. Use the text box above.",
  },
  {
    icon: BookOpen,
    label: "Create a course",
    detail: "Head to the Courses tab to package your knowledge into structured modules.",
  },
  {
    icon: Users,
    label: "Invite members",
    detail: "Share your group link so the right people can find you.",
  },
]

const OwnerOnboarding = ({ groupName }: { groupName: string }) => (
  <div className="flex flex-col gap-y-6 py-4">
    {/* Header */}
    <div className="flex flex-col gap-y-1.5">
      <div className="flex items-center gap-x-2">
        <Sparkles className="w-4 h-4 text-yellow-400" />
        <span className="text-xs font-medium text-yellow-400 uppercase tracking-widest">
          Getting started
        </span>
      </div>
      <h2 className="text-white font-semibold text-xl leading-snug">
        {groupName} is live. Now make it yours.
      </h2>
      <p className="text-themeTextGray text-sm leading-relaxed">
        Your channel is empty — here&apos;s how to bring it to life.
      </p>
    </div>

    {/* Step cards */}
    <div className="flex flex-col gap-y-3">
      {steps.map(({ icon: Icon, label, detail }, i) => (
        <div
          key={i}
          className="flex items-start gap-x-4 p-4 rounded-xl border border-[#28282D] bg-[#131315] hover:border-[#3a3a40] transition-colors duration-200"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#1e1e22] border border-[#28282D] shrink-0 mt-0.5">
            <Icon className="w-4 h-4 text-themeTextGray" />
          </div>
          <div className="flex flex-col gap-y-0.5">
            <span className="text-white text-sm font-medium">{label}</span>
            <span className="text-themeTextGray text-xs leading-relaxed">
              {detail}
            </span>
          </div>
          <span className="ml-auto text-[#3a3a40] text-xs font-mono shrink-0 mt-1">
            0{i + 1}
          </span>
        </div>
      ))}
    </div>

    {/* Tip */}
    <p className="text-[#3a3a40] text-xs text-center">
      Your members will see a welcome screen until the first post goes up.
    </p>
  </div>
)

// ── Member view ───────────────────────────────────────────────────────────────

const MemberWelcome = ({ groupName }: { groupName: string }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center gap-y-5">
    {/* Icon cluster */}
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full bg-[#1C1C1F] border border-[#28282D] flex items-center justify-center">
        <MessageSquare className="w-8 h-8 text-themeTextGray opacity-50" />
      </div>
      <span className="absolute -top-1 -right-1 text-base">✦</span>
      <span className="absolute -bottom-1 -left-1 text-xs text-themeTextGray opacity-40">
        ✦
      </span>
    </div>

    {/* Copy */}
    <div className="flex flex-col gap-y-2">
      <h2 className="text-white font-semibold text-lg">
        Welcome to {groupName}
      </h2>
      <p className="text-themeTextGray text-sm max-w-xs leading-relaxed">
        The conversation hasn&apos;t started yet. Once the instructor posts
        something, it&apos;ll show up right here.
      </p>
    </div>

    {/* Subtle pulse dot to signal "live" */}
    <div className="flex items-center gap-x-2 mt-1">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <span className="text-xs text-themeTextGray">Channel is active</span>
    </div>
  </div>
)