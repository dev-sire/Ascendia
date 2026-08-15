"use client"

import { GlassModal } from "@/components/global/glass-modal"
import { JoinGroupPaymentForm } from "@/components/global/join-group"
import { StripeElements } from "@/components/global/stripe/element"
import { Button } from "@/components/ui/button"
import { useActiveGroupSubscription, useJoinFree } from "@/hooks/payment"

type JoinButtonProps = {
  owner: boolean
  groupid: string
  userid?: string
  isMember: boolean
}

export const JoinButton = ({ owner, groupid, userid, isMember }: JoinButtonProps) => {
  const { data } = useActiveGroupSubscription(groupid)
  const { onJoinFreeGroup, isPending } = useJoinFree(groupid)

  if (owner) {
    return (
      <Button disabled className="w-full p-10" variant="ghost">
        Owner
      </Button>
    )
  }

  if (isMember) {
    return (
      <Button disabled className="w-full p-10" variant="ghost">
        Already a member
      </Button>
    )
  }

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
          <JoinGroupPaymentForm groupid={groupid} />
        </StripeElements>
      </GlassModal>
    )
  }

  return (
    <Button
      onClick={onJoinFreeGroup}
      disabled={isPending}
      className="w-full p-10"
      variant="ghost"
    >
      {isPending ? "Joining…" : "Join now"}
    </Button>
  )
}