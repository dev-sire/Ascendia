import { Skeleton } from "@/components/ui/skeleton"

const PostPageLoading = () => {
  return (
    <div className="grid grid-cols-4 px-5 py-5 gap-x-10">
      {/* Main post column */}
      <div className="col-span-4 lg:col-span-3 flex flex-col gap-y-6">
        {/* Post author */}
        <div className="flex items-center gap-x-3">
          <Skeleton className="w-10 h-10 rounded-full bg-[#28282D]" />
          <div className="flex flex-col gap-y-1.5">
            <Skeleton className="h-3.5 w-32 bg-[#28282D]" />
            <Skeleton className="h-3 w-20 bg-[#28282D]" />
          </div>
        </div>

        {/* Post title + body */}
        <div className="flex flex-col gap-y-3">
          <Skeleton className="h-8 w-3/4 bg-[#28282D]" />
          <div className="flex flex-col gap-y-2 mt-1">
            <Skeleton className="h-4 w-full bg-[#28282D]" />
            <Skeleton className="h-4 w-full bg-[#28282D]" />
            <Skeleton className="h-4 w-5/6 bg-[#28282D]" />
            <Skeleton className="h-4 w-full bg-[#28282D]" />
            <Skeleton className="h-4 w-2/3 bg-[#28282D]" />
          </div>
        </div>

        {/* Interactions */}
        <div className="flex items-center gap-x-5 py-3 border-y border-[#28282D]">
          <Skeleton className="h-4 w-14 bg-[#28282D]" />
          <Skeleton className="h-4 w-14 bg-[#28282D]" />
        </div>

        {/* Comment form */}
        <div className="flex items-start gap-x-3">
          <Skeleton className="w-9 h-9 rounded-full bg-[#28282D] shrink-0" />
          <div className="flex-1 flex flex-col gap-y-3">
            <Skeleton className="h-20 w-full rounded-xl bg-[#28282D]" />
            <Skeleton className="h-9 w-24 rounded-lg bg-[#28282D] self-end" />
          </div>
        </div>

        {/* Comment list */}
        <div className="flex flex-col gap-y-5 mt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <CommentSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Side widget */}
      <div className="col-span-1 hidden lg:flex flex-col gap-y-4">
        <Skeleton className="h-32 w-full rounded-xl bg-[#28282D]" />
        <Skeleton className="h-5 w-36 bg-[#28282D]" />
        <Skeleton className="h-4 w-full bg-[#28282D]" />
        <Skeleton className="h-4 w-4/5 bg-[#28282D]" />
        <Skeleton className="h-9 w-full rounded-lg bg-[#28282D] mt-2" />
      </div>
    </div>
  )
}

const CommentSkeleton = () => (
  <div className="flex items-start gap-x-3">
    <Skeleton className="w-8 h-8 rounded-full bg-[#28282D] shrink-0" />
    <div className="flex flex-col gap-y-2 flex-1">
      <div className="flex items-center gap-x-2">
        <Skeleton className="h-3 w-24 bg-[#28282D]" />
        <Skeleton className="h-3 w-16 bg-[#28282D]" />
      </div>
      <Skeleton className="h-3.5 w-full bg-[#28282D]" />
      <Skeleton className="h-3.5 w-4/5 bg-[#28282D]" />
      <Skeleton className="h-3 w-20 bg-[#28282D] mt-1" />
    </div>
  </div>
)

export default PostPageLoading