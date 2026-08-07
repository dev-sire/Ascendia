import React from "react"
import Navbar from "./_components/navbar"

type Props = {
    children: React.ReactNode
}

const DiscoverLayout = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen bg-black pb-10">
            <Navbar />
            {children}
        </div>
    )
}

export default DiscoverLayout
