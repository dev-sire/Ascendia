import { GroupSubscriptionForm } from "@/components/forms/subscription"
import { Subscriptions } from "./_components/subscriptions"

const SubscriptionPage = async ({
  params,
}: {
  params: Promise<{ groupid: string }>
}) => {
  const { groupid } = await params

  return (
    <div className="p-10 flex flex-col gap-y-10">
      <h2 className="font-bold text-3xl">Group Subscriptions</h2>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <GroupSubscriptionForm groupid={groupid} />
        <Subscriptions groupid={groupid} />
      </div>
    </div>
  )
}

export default SubscriptionPage