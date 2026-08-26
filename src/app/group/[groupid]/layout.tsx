import { onAuthenticatedUser } from "@/actions/auth"
import {
  onGetAllGroupMembers,
  onGetGroupChannels,
  onGetGroupInfo,
  onGetGroupSubscriptions,
  onGetUserGroups,
} from "@/actions/groups"
import SideBar from "@/components/global/sidebar"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { redirect } from "next/navigation"
import MobileNav from "../_components/mobile-nav"
import { Navbar } from "../_components/navbar"

type Props = {
  children: React.ReactNode
  params: Promise<{ groupid: string }>
}

const GroupLayout = async ({ children, params }: Props) => {
  const { groupid } = await params
  const query = new QueryClient()
  const user = await onAuthenticatedUser()

  if (!user.id) redirect("/sign-in")

  // All keys are scoped with their ID so navigating between groups never
  // serves one group's data under another group's layout.
  await Promise.all([
    query.prefetchQuery({
      queryKey: ["group-info", groupid],
      queryFn: () => onGetGroupInfo(groupid),
    }),
    query.prefetchQuery({
      queryKey: ["user-groups"],
      queryFn: () => onGetUserGroups(user.id as string),
    }),
    query.prefetchQuery({
      queryKey: ["group-channels", groupid],
      queryFn: () => onGetGroupChannels(groupid),
    }),
    query.prefetchQuery({
      queryKey: ["group-subscriptions", groupid],
      queryFn: () => onGetGroupSubscriptions(groupid),
    }),
    query.prefetchQuery({
      queryKey: ["member-chats", groupid],
      queryFn: () => onGetAllGroupMembers(groupid),
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen md:pt-5">
        <SideBar groupid={groupid} userid={user.id} />
        <div className="md:ml-[300px] flex flex-col flex-1 bg-[#101011] md:rounded-tl-xl overflow-y-auto border-l-[1px] boreder-t-[1px] border-[#28282D]">
          <Navbar groupid={groupid} userid={user.id} />
          {children}
          <MobileNav groupid={groupid} />
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default GroupLayout
