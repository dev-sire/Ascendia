import { GlassModal } from "@/components/global/glass-modal"
import { JoinGroupPaymentForm } from "@/components/global/join-group"
import { StripeElements } from "@/components/global/stripe/elements"
import { Button } from "@/components/ui/button"
import { useActiveGroupSubscription, useJoinFree } from "@/hooks/payment"

type JoinButtonProps = {
    owner: boolean
    groupId: string
}

export const JoinButton = ({ owner, groupId }: JoinButtonProps) => {
    const { data } = useActiveGroupSubscription(groupId)
    const { onJoinFreeGroup } = useJoinFree(groupId)

    if (!owner) {
        if (data?.status === 200) {
            return (
                <GlassModal
                    trigger={
                        <Button className="w-full p-10" variant="ghost">
                            <p>Join ${data.subscription?.price}/Month</p>
                        </Button>
                    }
                    title="Join this group"
                    description="Pay now to join this community"
                >
                    <StripeElements>
                        <JoinGroupPaymentForm groupId={groupId} />
                    </StripeElements>
                </GlassModal>
            )
        }
        return (
            <Button
                onClick={onJoinFreeGroup}
                className="w-full p-10"
                variant="ghost"
            >
                Join now
            </Button>
        )
    }

    return (
        <Button disabled={owner} className="w-full p-10" variant="ghost">
            Owner
        </Button>
    )
}
