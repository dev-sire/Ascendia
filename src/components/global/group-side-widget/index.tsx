"use client"
import { JoinButton } from "@/app/(discover)/about/_components/join-button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useGroupInfo } from "@/hooks/groups"
import { cn, truncateString, ucare } from "@/lib/utils"

type Props = {
  light?: boolean
  groupid?: string
  userid?: string
  isMember?: boolean
}

const GroupSideWidget = ({ groupid, light, userid, isMember }: Props) => {
  const { group, loading } = useGroupInfo()

  if (loading || !group) {
    return (
      <Card
        className={cn(
          "border-themeGray lg:sticky lg:top-0 mt-10 lg:mt-0 rounded-xl overflow-hidden",
          light ? "border-themeGray bg-[#1A1A1D]" : "bg-themeBlack",
        )}
      >
        <div className="w-full aspect-video bg-themeGray animate-pulse" />
        <div className="flex flex-col p-5 gap-y-2">
          <div className="h-5 w-32 bg-themeGray rounded animate-pulse" />
          <div className="h-4 w-48 bg-themeGray rounded animate-pulse" />
        </div>
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        "border-themeGray lg:sticky lg:top-0 mt-10 lg:mt-0 rounded-xl overflow-hidden",
        light ? "border-themeGray bg-[#1A1A1D]" : "bg-themeBlack",
      )}
    >
      <img
        src={ucare(group.thumbnail)}
        alt="thumbnail"
        className="w-full aspect-video"
      />
      <div className="flex flex-col p-5 gap-y-2">
        <h2 className="font-bold text-lg">{group.name}</h2>
        <p className="text-sm text-themeTextGray">
          {group.description && truncateString(group.description)}
        </p>
      </div>
      <Separator orientation="horizontal" className="bg-themeGray" />
      {groupid && (
        <JoinButton
          groupid={groupid}
          userid={userid}
          owner={group.userId === userid ? true : false}
          isMember={isMember ?? false}
        />
      )}
    </Card>
  )
}

export default GroupSideWidget