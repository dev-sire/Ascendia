import { onAuthenticatedUser } from "@/actions/auth"
import BackdropGradient from "@/components/global/backdrop-gradient"
import { GroupListSlider } from "@/components/global/group-list-slider"
import Search from "@/components/global/search"
import Link from "next/link"
import React from "react"

type Props = {
  children: React.ReactNode
}

const ExploreLayout = async ({ children }: Props) => {
  const user = await onAuthenticatedUser()
  const isLoggedIn = user.status === 200

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col items-center mt-28 px-10 text-center">

        {/* Eyebrow label */}
        <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-themeTextGray/50 border border-themeGray/60 rounded-full px-4 py-1.5">
          Community
        </span>

        {/* Headline */}
        <h2 className="text-[72px] lg:text-[96px] font-bold leading-none tracking-tight bg-gradient-to-b from-white via-white/80 to-white/20 bg-clip-text text-transparent">
          Explore Groups
        </h2>

        {/* Subtext + CTA */}
        <p className="mt-4 text-themeTextGray/60 text-base">
          Discover communities that match your interests, or{" "}
          <Link
            href={isLoggedIn ? "/group/create" : "/sign-in"}
            className="text-themeTextWhite underline underline-offset-2 decoration-themeGray hover:decoration-white transition-colors"
          >
            create your own
          </Link>
        </p>

        <BackdropGradient
          className="w-5/12 md:w-6/12 xl:w-4/12 xl:h-2/6 h-3/6"
          container="items-center"
        >
          {/* Search bar */}
          <div className="mt-10 mb-4 w-full max-w-[560px]">
            <Search
              placeholder="Search for anything..."
              searchType="GROUPS"
              glass
              inputStyle="lg:w-full text-base"
              className="w-full"
            />
          </div>

          {/* Category filter slider */}
          <div className="w-full md:w-[800px]">
            <GroupListSlider overlay route />
          </div>
        </BackdropGradient>
      </div>

      {/* Grid of groups */}
      <div className="mt-6">
        {children}
      </div>
    </div>
  )
}

export default ExploreLayout
