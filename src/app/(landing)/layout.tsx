import React from "react"
import LandingPageNavbar from "./_components/navbar"

type Props = {
  children: React.ReactNode
}

const landingPageLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col relative w-full">
      <LandingPageNavbar />
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}

export default landingPageLayout