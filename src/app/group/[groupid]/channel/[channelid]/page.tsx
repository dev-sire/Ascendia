import { onAuthenticatedUser } from "@/actions/auth"
import { onGetChannelInfo } from "@/actions/channel"
import { onGetGroupInfo } from "@/actions/groups"
import GroupSideWidget from "@/components/global/group-side-widget"
import { currentUser } from "@clerk/nextjs/server"
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query"
import Menu from "../../_components/group-navbar"
import { LeaderBoardCard } from "../../_components/leader-board"
import CreateNewPost from "./_components/create-post"
import { PostFeed } from "./_components/post-feed"

type Props = {
    params: {
        channelId: string
        groupId: string
    }
}

const GroupChannelPage = async ({ params }: Props) => {
    const client = new QueryClient()
    const user = await currentUser()
    const authUser = await onAuthenticatedUser()

    // Prefetch the channel info
    await client.prefetchQuery({
        queryKey: ["channel-info"],
        queryFn: () => onGetChannelInfo(params.channelId),
    })
    // Prefetch the group info
    await client.prefetchQuery({
        queryKey: ["about-group-info"],
        queryFn: () => onGetGroupInfo(params.groupId),
    })

    return (
        <HydrationBoundary state={dehydrate(client)}>
            <div className="grid lg:grid-cols-4 grid-cols-1 w-full flex-1 h-0 gap-x-5 px-5">
                <div className="col-span-1 lg:inline hidden py-5">
                    <LeaderBoardCard light />
                </div>
                <div className="lg:col-span-2 flex flex-col gap-y-5 py-5">
                    <Menu orientation="desktop" />
                    <CreateNewPost
                        userImage={user?.imageUrl!}
                        channelId={params.channelId}
                        username={user?.firstName!}
                    />

                    <PostFeed
                        channelId={params.channelId}
                        userid={authUser.id!}
                    />
                </div>
                <div className="col-span-1 hidden lg:inline relative py-5">
                    <GroupSideWidget light />
                </div>
            </div>
        </HydrationBoundary>
    )
}

export default GroupChannelPage
