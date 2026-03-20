import { onAuthenticatedUser } from '@/actions/auth'
import { onGetChannelInfo } from '@/actions/channels'
import { onGetGroupInfo } from '@/actions/groups'
import { currentUser } from '@clerk/nextjs/server'
import { QueryClient } from '@tanstack/react-query'

type Props = {
  params: Promise<{ channelid: string; groupid: string }>;
}

// WIP: Complete the Group Channel Page

const GroupChannelPage = async ({ params }: Props) => {

    const client = new QueryClient()
    const user = await currentUser()
    const authUser = await onAuthenticatedUser()
    const { channelid, groupid } = await params

    await client.prefetchQuery({
        queryKey: ["channel-info"],
        queryFn: () => onGetChannelInfo(channelid)
    })

    await client.prefetchQuery({
        queryKey: ["about-group-info"],
        queryFn: () => onGetGroupInfo(groupid)
    })

  return (
    <div>GroupChannelPage</div>
  )
}

export default GroupChannelPage;