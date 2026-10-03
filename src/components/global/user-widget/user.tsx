"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Logout, Settings } from "@/icons"
import { supabaseClient } from "@/lib/utils"
import { onOffline } from "@/redux/slices/online-member-slice"
import { AppDispatch } from "@/redux/store"
import { useClerk } from "@clerk/nextjs"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { DropDown } from "../drop-down"

type UserWidgetProps = {
  image: string
  groupid?: string
  userid?: string
  ownedGroups?: { id: string; name: string }[]
}

export const UserAvatar = ({
  image,
  groupid,
  userid,
  ownedGroups = [],
}: UserWidgetProps) => {
  const { signOut } = useClerk()
  const dispatch: AppDispatch = useDispatch()
  const untrackPresence = async () => {
    await supabaseClient.channel("tracking").untrack()
  }

  const onLogout = async () => {
    untrackPresence()
    dispatch(onOffline({ members: [{ id: userid! }] }))
    signOut({ redirectUrl: "/" })
  }

  return (
    <DropDown
      title="Account"
      trigger={
        <Avatar className="cursor-pointer">
          <AvatarImage src={image} alt="user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      }
    >
      {/* Settings — only owned groups */}
      {ownedGroups.length > 0 ? (
        <>
          <p className="text-xs text-themeTextGray px-3 pt-2 pb-1 font-semibold uppercase tracking-wide">
            Settings
          </p>
          {ownedGroups.map((g) => (
            <Link key={g.id} href={`/group/${g.id}/settings`}>
              <Button
                variant="ghost"
                className="flex gap-2 w-full justify-start hover:bg-themeGray items-center truncate"
              >
                <Settings />
                {g.name}
              </Button>
            </Link>
          ))}
          <Separator orientation="horizontal" className="my-1" />
        </>
      ) : groupid ? (
        // Fallback to known groupid if groups haven't loaded
        <Link href={`/group/${groupid}/settings`}>
          <Button
            variant="ghost"
            className="flex gap-x-3 px-2 justify-start w-full"
          >
            <Settings /> Settings
          </Button>
        </Link>
      ) : null}

      <Button
        onClick={onLogout}
        variant="ghost"
        className="flex gap-x-3 px-2 justify-start w-full"
      >
        <Logout />
        Logout
      </Button>
    </DropDown>
  )
}