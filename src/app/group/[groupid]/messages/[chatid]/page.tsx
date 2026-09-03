import { onAuthenticatedUser } from "@/actions/auth"
import { onGetAllUserMessages, onGetUserFromMembership } from "@/actions/groups"
import { HuddlesForm } from "@/components/forms/huddles"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"
import { ChatWindow } from "../_components/chat"

const MemberChatPage = async ({
  params,
}: {
  params: Promise<{ chatid: string }>
}) => {
  const { chatid } = await params
  const query = new QueryClient()
  const member = await onGetUserFromMembership(chatid)

  await query.prefetchQuery({
    queryKey: ["user-messages"],
    queryFn: () => onGetAllUserMessages(chatid),
  })

  const user = await onAuthenticatedUser()
  const fullName = `${member?.member?.User?.firstname} ${member?.member?.User?.lastname}`
  const initial = member?.member?.User?.firstname?.[0]?.toUpperCase() ?? "?"

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="h-full flex flex-col">
        {/* ── Header ── */}
        <div className="flex items-center gap-x-3 px-5 py-4 border-b border-themeGray/40 bg-themeBlack/60 backdrop-blur-sm flex-shrink-0">
          <div className="relative">
            <Avatar className="w-10 h-10 ring-2 ring-themeGray/30">
              <AvatarImage src={member?.member?.User?.image!} alt={fullName} />
              <AvatarFallback className="bg-themeGray text-themeTextWhite text-sm font-medium">
                {initial}
              </AvatarFallback>
            </Avatar>
            {/* Static online indicator — you can wire this to Redux later */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-themeBlack" />
          </div>

          <div className="flex flex-col justify-center leading-tight">
            <h3 className="text-sm font-semibold text-themeTextWhite capitalize">
              {fullName}
            </h3>
            <p className="text-xs text-emerald-400 font-medium">Online</p>
          </div>
        </div>

        {/* ── Messages ── */}
        <ChatWindow userid={user.id!} recieverid={member?.member?.User?.id!} />

        {/* ── Input ── */}
        <div className="flex-shrink-0 px-4 pb-4">
          <HuddlesForm recieverid={member?.member?.User?.id!} userid={user.id!} />
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default MemberChatPage
