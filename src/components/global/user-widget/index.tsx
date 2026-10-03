import { onGetUserGroups } from "@/actions/groups"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Message } from "@/icons"
import { Group } from "lucide-react"
import Link from "next/link"
import { DropDown } from "../drop-down"
import Notification from "./notification"
import { UserAvatar } from "./user"

type Props = {
  image: string
  groupid?: string
  userid?: string
}

type GroupsResult = Awaited<ReturnType<typeof onGetUserGroups>>

// Messages picker: owned + joined groups
function MessagesDropdown({ groups }: { groups: GroupsResult | null }) {
  const owned = groups?.groups ?? []
  const memberships = groups?.members ?? []

  return (
    <DropDown
      title="Open Messages"
      trigger={
        <button className="hover:opacity-70 transition-opacity">
          <Message />
        </button>
      }
    >
      {owned.length === 0 && memberships.length === 0 && (
        <p className="text-sm text-themeTextGray px-3 py-2">No groups yet</p>
      )}
      {owned.length > 0 && (
        <>
          <p className="text-xs text-themeTextGray px-3 pt-2 pb-1 font-semibold uppercase tracking-wide">
            Owned
          </p>
          {owned.map((g) => (
            <Link key={g.id} href={`/group/${g.id}/messages`}>
              <Button
                variant="ghost"
                className="flex gap-2 w-full justify-start hover:bg-themeGray items-center truncate"
              >
                <Group size={15} />
                {g.name}
              </Button>
            </Link>
          ))}
        </>
      )}
      {memberships.length > 0 && (
        <>
          <Separator orientation="horizontal" className="my-1" />
          <p className="text-xs text-themeTextGray px-3 pt-1 pb-1 font-semibold uppercase tracking-wide">
            Joined
          </p>
          {memberships.map((m) => (
            <Link key={m.Group?.id} href={`/group/${m.Group?.id}/messages`}>
              <Button
                variant="ghost"
                className="flex gap-2 w-full justify-start hover:bg-themeGray items-center truncate"
              >
                <Group size={15} />
                {m.Group?.name}
              </Button>
            </Link>
          ))}
        </>
      )}
    </DropDown>
  )
}

const UserWidget = async ({ image, groupid, userid }: Props) => {
  // Single server-side fetch shared by both dropdowns
  const groups = userid ? await onGetUserGroups(userid) : null
  const ownedGroups = (groups?.groups ?? []).map((g) => ({
    id: g.id,
    name: g.name,
  }))

  return (
    <div className="gap-5 items-center hidden md:flex">
      <Notification />
      {userid ? (
        <MessagesDropdown groups={groups} />
      ) : (
        <Link href="/sign-in">
          <Message />
        </Link>
      )}
      <UserAvatar
        userid={userid}
        image={image}
        groupid={groupid}
        ownedGroups={ownedGroups}
      />
    </div>
  )
}

export default UserWidget