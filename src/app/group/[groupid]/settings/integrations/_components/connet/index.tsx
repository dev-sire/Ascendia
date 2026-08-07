"use client"

import { Loader } from "@/components/global/loader"
import { Button } from "@/components/ui/button"
import { useStripeConnect } from "@/hooks/payment"

type StripeConnectProps = {
    connected: boolean
    groupId: string
}

export const StripeConnect = ({ connected, groupId }: StripeConnectProps) => {
    const { onStripeConnect, onStripeAccountPending } =
        useStripeConnect(groupId)
    return (
        <Button disabled={connected} onClick={onStripeConnect}>
            <Loader loading={onStripeAccountPending}>
                {connected ? "Connected" : "Connect to stripe"}
            </Loader>
        </Button>
    )
}
