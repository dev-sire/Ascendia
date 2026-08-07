"use client"

import { useChannelPage } from "@/hooks/channels"
import InfiniteScrollObserver from "@/components/global/infinite-scroll"
import { PostCard } from "./post-card"
import { PaginatedPosts } from "../paginates-posts"

type PostFeedProps = {
    channelId: string
    userid: string
}

export const PostFeed = ({ channelId, userid }: PostFeedProps) => {
    const { data } = useChannelPage(channelId)
    const { posts } = data as {
        posts: ({
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
        })[]
    }
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
                    likedUser={
                        post.likes.length > 0 ? post.likes[0].userId : undefined
                    }
                    userid={userid}
                    likeid={
                        post.likes.length > 0 ? post.likes[0].id : undefined
                    }
                />
            ))}
            <InfiniteScrollObserver
                action="POSTS"
                loading="POST"
                identifier={channelId}
                paginate={posts.length}
            >
                <PaginatedPosts userid={userid} />
            </InfiniteScrollObserver>
        </>
    ) : (
        <></>
    )
}
