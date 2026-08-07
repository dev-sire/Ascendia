import { AuthenticateWithRedirectCallback } from "@clerk/nextjs"
import React from "react"

type Props = {}

const CallbackPage = (props: Props) => {
    return <AuthenticateWithRedirectCallback />
}

export default CallbackPage
