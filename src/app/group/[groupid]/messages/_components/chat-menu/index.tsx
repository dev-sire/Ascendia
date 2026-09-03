"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGroupChat } from "@/hooks/groups"
import { useAppSelector } from "@/redux/store"
import { User } from "lucide-react"
import Link from "next/link"

type GroupChatMenuProps = {
  groupid: string
}

export const GroupChatMenu = ({ groupid }: GroupChatMenuProps) => {
  const { members } = useAppSelector((state) => state.onlineTrackingReducer)
  const { data } = useGroupChat(groupid)
  // Build the base path directly from groupid — never from usePathname()
  // which would append chatid on top of an existing chatid segment.
  const basePath = `/group/${groupid}/messages`

  return (
    <div className="flex flex-col gap-y-1 p-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-themeTextGray px-2 py-3">
        Members
      </p>
      {data?.status === 200 &&
        data.members?.map((member: any) => {
          const isOnline = members.some((m) => m.id === member.userId)
          const fullName = `${member.User?.firstname} ${member.User?.lastname}`

          return (
            <Link
              href={`${basePath}/${member.id}`}
              key={member.id}
              className="flex items-center gap-x-3 px-3 py-2.5 rounded-xl hover:bg-themeGray transition-colors duration-150 group"
            >
              {/* Avatar with online dot */}
              <div className="relative flex-shrink-0">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={member.User?.image!} alt={fullName} />
                  <AvatarFallback className="bg-themeGray text-themeTextGray text-sm">
                    <User size={14} />
                  </AvatarFallback>
                </Avatar>
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-themeBlack" />
                )}
              </div>

              {/* Name + status */}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-themeTextWhite truncate leading-tight">
                  {fullName}
                </span>
                <span className="text-xs text-themeTextGray truncate leading-tight mt-0.5">
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </Link>
          )
        })}
    </div>
  )
}
