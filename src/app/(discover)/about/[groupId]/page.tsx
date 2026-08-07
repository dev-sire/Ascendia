import { onAuthenticatedUser } from "@/actions/auth"
import { onGetGroupInfo } from "@/actions/groups"
import { onGetActiveSubscription } from "@/actions/payment"
import GroupSideWidget from "@/components/global/group-side-widget"
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query"
import AboutGroup from "../_components/about"

type Props = {
    params: {
        groupId: string
    }
}

const Page = async ({ params }: Props) => {
    const query = new QueryClient()

    await query.prefetchQuery({
        queryKey: ["about-group-info"],
        queryFn: () => onGetGroupInfo(params.groupId),
    })

    await query.prefetchQuery({
        queryKey: ["active-subscription"],
        queryFn: () => onGetActiveSubscription(params.groupId),
    })

    const userid = await onAuthenticatedUser()

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className="pt-36 pb-10 container grid grid-cols-1 lg:grid-cols-3 gap-x-10">
                <div className="col-span-1 lg:col-span-2">
                    <AboutGroup userid={userid.id!} groupId={params.groupId} />
                </div>
                <div className="col-span-1 relative">
                    <GroupSideWidget
                        userid={userid.id}
                        groupId={params.groupId}
                    />
                </div>
            </div>
        </HydrationBoundary>
    )
}

export default Page
