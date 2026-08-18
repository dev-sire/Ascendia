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

const PostPage = async ({ params }: { params: { postId: string; groupid: string; channelid: string } }) => {
  const client = new QueryClient()

  await client.prefetchQuery({
    queryKey: ["unique-post"],
    queryFn: () => onGetPostInfo(params.postId),
  })

  await client.prefetchQuery({
    queryKey: ["post-comments", params.postId],
    queryFn: () => onGetPostComments(params.postId),
  })

  await client.prefetchQuery({
    queryKey: ["about-group-info"],
    queryFn: () => onGetGroupInfo(params.groupid),
  })

  const user = await onAuthenticatedUser()

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <div className="grid grid-cols-4 px-5 py-5 gap-x-10">
        <div className="col-span-4 lg:col-span-3">
          <PostInfo id={params.postId} />
          <PostCommentForm
            username={user.username!}
            image={user.image!}
            postid={params.postId}
          />
          <PostComments postid={params.postId} />
        </div>
        <div className="col-span-1 hidden lg:inline relative">
          <GroupSideWidget light />
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default PostPage