"use client"

import { useChannelPage } from "@/hooks/channels"

import InfiniteScrollObserver from "@/components/global/infinite-scroll"
import { Skeleton } from "@/components/ui/skeleton"
import { PaginatedPosts } from "../paginates-posts"
import { PostCard } from "./post-card"

type PostFeedProps = {
  channelid: string
  userid: string
}

export const PostFeed = ({ channelid, userid }: PostFeedProps) => {
  const { data, isPending } = useChannelPage(channelid)
  const posts = ((data as any)?.channel?.posts ?? (data as any)?.posts) as ({
      likes: {
        id: string
        userId: string
      }[]
      channel: {
        name: string
      }
      _count: {
        likes: number
        comments: number
      }
      author: {
        firstname: string
        lastname: string
        image: string | null
      }
    } & {
      id: string
      createdAt: Date
      title: string | null
      htmlContent: string | null
      jsonContent: string | null
      content: string
      authorId: string
      channelId: string
    })[] | undefined
  if (isPending)
    return (
      <div className="flex flex-col gap-y-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="border border-[#28282D] bg-[#1A1A1D] rounded-2xl overflow-hidden p-4 flex flex-col gap-y-4"
          >
            <div className="flex items-center gap-x-3">
              <Skeleton className="w-9 h-9 rounded-full bg-[#28282D]" />
              <div className="flex flex-col gap-y-1.5">
                <Skeleton className="h-3 w-28 bg-[#28282D]" />
                <Skeleton className="h-2.5 w-20 bg-[#28282D]" />
              </div>
            </div>
            <Skeleton className="h-6 w-3/4 bg-[#28282D]" />
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-3.5 w-full bg-[#28282D]" />
              <Skeleton className="h-3.5 w-full bg-[#28282D]" />
              <Skeleton className="h-3.5 w-2/3 bg-[#28282D]" />
            </div>
            <div className="flex items-center gap-x-5 pt-2 border-t border-[#28282D]">
              <Skeleton className="h-4 w-14 bg-[#28282D]" />
              <Skeleton className="h-4 w-14 bg-[#28282D]" />
            </div>
          </div>
        ))}
      </div>
    )

  return posts && posts.length > 0 ? (
    <>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          channelname={post.channel.name!}
          title={post.title!}
          html={post.htmlContent!}
          username={post.author.firstname + post.author.lastname}
          userimage={post.author.image!}
          likes={post._count.likes}
          comments={post._count.comments}
          postid={post.id}
          likedUser={post.likes.length > 0 ? post.likes[0].userId : undefined}
          userid={userid}
          likeid={post.likes.length > 0 ? post.likes[0].id : undefined}
        />
      ))}
      <InfiniteScrollObserver
        action="POSTS"
        loading="POST"
        identifier={channelid}
        paginate={posts.length}
      >
        <PaginatedPosts userid={userid} />
      </InfiniteScrollObserver>
    </>
  ) : (
    <></>
  )
}