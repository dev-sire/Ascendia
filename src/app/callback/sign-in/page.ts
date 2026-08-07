import { onSignInUser } from "@/actions/auth"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const CompleteSigIn = async () => {
    const user = await currentUser()

    const { sessionId } = auth()

    if (!user || !sessionId) return redirect("/sign-in")

    const authenticated = await onSignInUser(user.id)

    if (authenticated.status === 200) return redirect(`/group/create`)

    if (authenticated.status === 207)
        return redirect(
            `/group/${authenticated.groupId}/channel/${authenticated.channelId}`,
        )

    if (authenticated.status !== 200) {
        if (sessionId) {
            fetch(`/api/clerk/sessions/${sessionId}`, {
                method: "DELETE",
            })
        }

        redirect("/sign-in")
    }
}

export default CompleteSigIn
