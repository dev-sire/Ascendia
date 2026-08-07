import { onSignUpUser } from "@/actions/auth"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const CompleteOAuthAfterCallback = async () => {
    const user = await currentUser()

    try {
        const complete = await onSignUpUser({
            firstname: user!.firstName as string,
            lastname: user!.lastName as string,
            image: user!.imageUrl,
            clerkId: user!.id,
        })

        if (complete.status == 200) {
            redirect(`/group/create`)
        } else {
            redirect("/sign-in")
        }
    } catch (error) {
        console.error("Error during sign-up process:", error)
        redirect("/sign-in")
    }
}

export default CompleteOAuthAfterCallback
