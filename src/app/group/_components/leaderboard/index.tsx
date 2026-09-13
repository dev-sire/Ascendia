"use client"

import { Card } from "@/components/ui/card"
import { useGroupLeaderboard } from "@/hooks/groups"
import { cn, ucare } from "@/lib/utils"
import Image from "next/image"

type LeaderBoardCardProps = {
  groupid: string
  light?: boolean
}

const RANK_COLORS: Record<number, string> = {
  1: "text-yellow-400",
  2: "text-slate-300",
  3: "text-amber-600",
}

export const LeaderBoardCard = ({ groupid, light }: LeaderBoardCardProps) => {
  const { leaderboard } = useGroupLeaderboard(groupid)

  return (
    <Card
      className={cn(
        "border-themeGray lg:sticky lg:top-0 mt-10 lg:mt-0 rounded-xl p-5 overflow-hidden",
        light ? "border-themeGray bg-[#1A1A1D]" : "bg-themeBlack",
      )}
    >
      <h2 className="text-themeTextWhite text-xl font-bold">
        Leaderboard
      </h2>
      <p className="text-themeTextGray text-sm mb-4">
        See who's leading in course progress.
      </p>

      {leaderboard.length === 0 ? (
        <p className="text-themeTextGray text-sm text-center py-6">
          No progress recorded yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-y-3">
          {leaderboard.map((entry) => (
            <li
              key={entry.userId}
              className="flex items-center gap-x-3"
            >
              <span
                className={cn(
                  "text-sm font-bold w-5 text-center shrink-0",
                  RANK_COLORS[entry.rank] ?? "text-themeTextGray",
                )}
              >
                {entry.rank}
              </span>

              {entry.image ? (
                <Image
                  src={entry.image.startsWith("https://") ? entry.image : ucare(entry.image)}
                  alt={entry.firstname}
                  width={28}
                  height={28}
                  className="rounded-full object-cover shrink-0"
                  unoptimized 
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-themeGray shrink-0 flex items-center justify-center text-xs text-themeTextGray">
                  {entry.firstname[0]}
                </div>
              )}

              <span className="text-themeTextWhite text-sm truncate">
                {entry.firstname} {entry.lastname}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}