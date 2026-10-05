import { onAuthenticatedUser } from "@/actions/auth"
import React from "react"
import { LandingAuthProvider } from "./_components/landing-auth"
import { LandingBackground } from "./_components/landing-background"
import LandingPageNavbar from "./_components/navbar"

type Props = {
  children: React.ReactNode
}

const landingPageLayout = async ({ children }: Props) => {
  // Resolved once here; the navbar and every CTA on the page read from it.
  const user = await onAuthenticatedUser()
  const signedIn = user.status === 200 && !!user.id

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col">
      <LandingBackground />
      <LandingAuthProvider signedIn={signedIn}>
        <LandingPageNavbar
          user={
            signedIn
              ? { id: user.id!, image: user.image ?? "" }
              : undefined
          }
        />
        <div className="w-full">{children}</div>
      </LandingAuthProvider>
    </div>
  )
}

export default landingPageLayout
