"use client"

import { useAllSubscriptions } from "@/hooks/payment"
import { SubscriptionCard } from "../card"

type SubscriptionsProps = {
    groupId: string
}

export const Subscriptions = ({ groupId }: SubscriptionsProps) => {
    const { data, mutate } = useAllSubscriptions(groupId)

    return data?.status === 200 && data.subscriptions ? (
        data.subscriptions.map((subscription) => (
            <SubscriptionCard
                active={subscription.active}
                onClick={() => mutate({ id: subscription.id })}
                key={subscription.id}
                price={`${subscription.price}`}
                members={`${data.count}`}
            />
        ))
    ) : (
        <></>
    )
}
