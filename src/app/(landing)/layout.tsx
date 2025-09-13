import React from "react";
import LandingPageNavbar from "./_components/navbar";

type Props = {}

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col container relative">
        <LandingPageNavbar>
            
        </LandingPageNavbar>
        {children}
    </div>
  )
}

export default LandingPageLayout;