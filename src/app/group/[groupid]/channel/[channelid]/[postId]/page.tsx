import { onAuthenticatedUser } from "@/actions/auth"
import { onGetGroupInfo, onGetPostComments, onGetPostInfo } from "@/actions/groups"

import GroupSideWidget from "@/components/global/group-side-widget"
import { PostCommentForm } from "@/components/global/post-comments"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"
import { PostComments } from "./_components/comments"
import { PostInfo } from "./_components/post-info"

const PostPage = async ({
  params,
}: {
  params: Promise<{ postId: string; groupid: string; channelid: string }>
}) => {
  const { postId, groupid } = await params
  const client = new QueryClient()

  // Keys include their ID so navigating between posts never
  // serves a previous post's content.
  await Promise.all([
    client.prefetchQuery({
      queryKey: ["unique-post", postId],
      queryFn: () => onGetPostInfo(postId),
    }),
    client.prefetchQuery({
      queryKey: ["post-comments", postId],
      queryFn: () => onGetPostComments(postId),
    }),
    client.prefetchQuery({
      queryKey: ["about-group-info"],
      queryFn: () => onGetGroupInfo(groupid),
    }),
  ])

  const user = await onAuthenticatedUser()

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <div className="grid grid-cols-4 px-5 py-5 gap-x-10">
        <div className="col-span-4 lg:col-span-3">
          <PostInfo id={postId} />
          <PostCommentForm
            username={user.username!}
            image={user.image!}
            postid={postId}
          />
          <PostComments postid={postId} />
        </div>
        <div className="col-span-1 hidden lg:inline relative">
          <GroupSideWidget light />
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default PostPage
