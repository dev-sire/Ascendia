"use client"

import { Loader } from "@/components/global/loader"
import { Button } from "@/components/ui/button"
import { useJoinGroup } from "@/hooks/payment"

import { CardElement } from "@stripe/react-stripe-js"

type JoinGroupPaymentFormProps = {
    groupId: string
}

export const JoinGroupPaymentForm = ({
    groupId,
}: JoinGroupPaymentFormProps) => {
    const { isPending, onPayToJoin } = useJoinGroup(groupId)
    return (
        <div className="flex flex-col gap-y-3">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#B4B0AE",
                            "::placeholder": {
                                color: "#B4B0AE",
                            },
                        },
                    },
                }}
                className="bg-themeBlack border-[1px] border-themeGray outline-none rounded-lg p-3"
            />
            <Button onClick={onPayToJoin}>
                <Loader loading={isPending}>Pay Now</Loader>
            </Button>
        </div>
    )
}
