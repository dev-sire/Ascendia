"use client"

import { HtmlParser } from "@/components/global/html-parser"

import { NoResult } from "@/components/global/search/no-result"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetPost } from "@/hooks/channels"
import { Interactions } from "../../../_components/post-feed/interactions"
import { PostAuthor } from "../../../_components/post-feed/post-author"

type PostInfoProps = {
  id: string
}

export const PostInfo = ({ id }: PostInfoProps) => {
  const { data, isPending } = useGetPost(id)

  if (isPending)
    return (
      <div className="flex flex-col gap-y-5">
        <div className="flex items-center gap-x-3">
          <Skeleton className="w-10 h-10 rounded-full bg-[#28282D]" />
          <div className="flex flex-col gap-y-1.5">
            <Skeleton className="h-3.5 w-32 bg-[#28282D]" />
            <Skeleton className="h-3 w-20 bg-[#28282D]" />
          </div>
        </div>
        <Skeleton className="h-8 w-3/4 bg-[#28282D]" />
        <div className="flex flex-col gap-y-2">
          <Skeleton className="h-4 w-full bg-[#28282D]" />
          <Skeleton className="h-4 w-full bg-[#28282D]" />
          <Skeleton className="h-4 w-2/3 bg-[#28282D]" />
        </div>
      </div>
    )

  if (!data || data.status !== 200)
    return (
      <div>
        <NoResult />
      </div>
    )

  return (
    <div className="flex flex-col gap-y-5">
      <PostAuthor
        username={`${data?.post?.author.firstname} ${data?.post?.author.lastname}`}
        image={data.post?.author.image as string}
        channel={data.post?.channel.name as string}
      />
      <div className="flex flex-col gap-y-3">
        <h2 className="text-2xl font-bold">{data.post?.title}</h2>
        <HtmlParser html={data.post?.htmlContent as string} />
      </div>
      <Interactions
        id={id}
        page
        userid={data.post?.authorId}
        likedUser={
          data.post && data.post?.likes.length > 0
            ? data.post.likes[0].userId
            : undefined
        }
        likeid={
          data.post && data.post?.likes.length > 0
            ? data.post.likes[0].id
            : undefined
        }
        likes={data.post?._count.likes!}
        comments={data.post?._count.comments!}
      />
    </div>
  )
}