import { Skeleton } from "@/components/ui/skeleton"

const GroupLayoutLoading = () => {
  return (
    <div className="flex h-screen md:pt-5">
      {/* Sidebar skeleton */}
      <div className="hidden md:flex flex-col fixed w-[300px] h-full bg-[#101011] border-r border-[#28282D] px-4 py-6 gap-y-6">
        {/* Group header */}
        <div className="flex items-center gap-x-3">
          <Skeleton className="w-10 h-10 rounded-full bg-[#28282D]" />
          <div className="flex flex-col gap-y-1.5 flex-1">
            <Skeleton className="h-3.5 w-32 bg-[#28282D]" />
            <Skeleton className="h-3 w-20 bg-[#28282D]" />
          </div>
        </div>

        {/* Channel list */}
        <div className="flex flex-col gap-y-1 mt-2">
          <Skeleton className="h-3 w-20 bg-[#28282D] mb-3" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-x-3 px-3 py-2 rounded-lg"
            >
              <Skeleton className="w-5 h-5 rounded bg-[#28282D]" />
              <Skeleton
                className="h-3 bg-[#28282D]"
                style={{ width: `${60 + (i % 3) * 20}px` }}
              />
            </div>
          ))}
        </div>

        {/* User groups at bottom */}
        <div className="mt-auto flex flex-col gap-y-2">
          <Skeleton className="h-3 w-16 bg-[#28282D] mb-2" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-x-2 px-2 py-1.5">
              <Skeleton className="w-8 h-8 rounded-full bg-[#28282D]" />
              <Skeleton className="h-3 w-24 bg-[#28282D]" />
            </div>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="md:ml-[300px] flex flex-col flex-1 bg-[#101011] md:rounded-tl-xl overflow-y-auto border-l border-t border-[#28282D]">
        {/* Navbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#28282D]">
          <Skeleton className="h-5 w-36 bg-[#28282D]" />
          <div className="flex items-center gap-x-3">
            <Skeleton className="w-8 h-8 rounded-full bg-[#28282D]" />
            <Skeleton className="w-8 h-8 rounded-full bg-[#28282D]" />
          </div>
        </div>

        {/* Channel content skeleton */}
        <ChannelSkeleton />
      </div>
    </div>
  )
}

export const ChannelSkeleton = () => (
  <div className="grid lg:grid-cols-4 grid-cols-1 w-full flex-1 gap-x-5 px-5">
    {/* Leaderboard col */}
    <div className="col-span-1 hidden lg:flex flex-col gap-y-4 py-5">
      <Skeleton className="h-5 w-28 bg-[#28282D]" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-x-3">
          <Skeleton className="w-8 h-8 rounded-full bg-[#28282D]" />
          <div className="flex flex-col gap-y-1.5 flex-1">
            <Skeleton className="h-3 w-24 bg-[#28282D]" />
            <Skeleton className="h-2.5 w-16 bg-[#28282D]" />
          </div>
        </div>
      ))}
    </div>

    {/* Post feed col */}
    <div className="lg:col-span-2 flex flex-col gap-y-5 py-5">
      {/* Create post box */}
      <div className="border border-[#28282D] rounded-xl p-4 flex items-center gap-x-3">
        <Skeleton className="w-9 h-9 rounded-full bg-[#28282D]" />
        <Skeleton className="h-9 flex-1 rounded-lg bg-[#28282D]" />
      </div>

      {/* Post cards */}
      {Array.from({ length: 3 }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>

    {/* Side widget col */}
    <div className="col-span-1 hidden lg:flex flex-col gap-y-4 py-5">
      <Skeleton className="h-32 w-full rounded-xl bg-[#28282D]" />
      <Skeleton className="h-5 w-36 bg-[#28282D]" />
      <Skeleton className="h-4 w-full bg-[#28282D]" />
      <Skeleton className="h-4 w-4/5 bg-[#28282D]" />
      <Skeleton className="h-9 w-full rounded-lg bg-[#28282D] mt-2" />
    </div>
  </div>
)

export const PostCardSkeleton = () => (
  <div className="border border-[#28282D] bg-[#1A1A1D] rounded-2xl overflow-hidden p-4 flex flex-col gap-y-4">
    {/* Author row */}
    <div className="flex items-center gap-x-3">
      <Skeleton className="w-9 h-9 rounded-full bg-[#28282D]" />
      <div className="flex flex-col gap-y-1.5">
        <Skeleton className="h-3 w-28 bg-[#28282D]" />
        <Skeleton className="h-2.5 w-20 bg-[#28282D]" />
      </div>
    </div>
    {/* Post content */}
    <Skeleton className="h-6 w-3/4 bg-[#28282D]" />
    <div className="flex flex-col gap-y-2">
      <Skeleton className="h-3.5 w-full bg-[#28282D]" />
      <Skeleton className="h-3.5 w-full bg-[#28282D]" />
      <Skeleton className="h-3.5 w-2/3 bg-[#28282D]" />
    </div>
    {/* Interactions row */}
    <div className="flex items-center gap-x-5 pt-2 border-t border-[#28282D]">
      <Skeleton className="h-4 w-14 bg-[#28282D]" />
      <Skeleton className="h-4 w-14 bg-[#28282D]" />
    </div>
  </div>
)

export default GroupLayoutLoading