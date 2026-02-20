import { onAuthenticatedUser } from '@/actions/auth'
import { currentUser } from '@clerk/nextjs/server'
import { QueryClient } from '@tanstack/react-query'

type Props = {}

const GroupChannelPage = async (props: Props) => {

    const client = new QueryClient()
    const user = await currentUser()
    const authUser = await onAuthenticatedUser()

    // WIP: Implement the missing server actions

    await client.prefetchQuery({
        queryKey: ["channel-info"],
        queryFn: () => onGetChannelInfo(params.channelid)
    })

    await client.prefetchQuery({
        queryKey: ["about-group-info"],
        queryFn: () => onGetGroupInfo(params.groupid)
    })

  return (
    <div>GroupChannelPage</div>
  )
}

export default GroupChannelPage;