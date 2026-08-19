"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useComments, useReply } from "@/hooks/channels"
import { UserComment } from "./user-comment"

type PostCommentsProps = {
  postid: string
}

export const PostComments = ({ postid }: PostCommentsProps) => {
  const { data, isPending } = useComments(postid)
  const { onReply, onSetReply, onSetActiveComment, activeComment } = useReply()

  return (
    <div className="mt-5">
      {isPending ? (
        <div className="flex flex-col gap-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start gap-x-3">
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
          ))}
        </div>
      ) : data?.comments && data.comments.length > 0 ? (
        data.comments.map((comment: any) => (
          <UserComment
            id={comment.id}
            key={comment.id}
            onReply={() => onSetReply(comment.id)}
            reply={onReply}
            username={`${comment.user.firstname} ${comment.user.lastname}`}
            image={comment.user.image || ""}
            content={comment.content}
            postid={postid}
            replyCount={comment._count.reply}
            commentid={comment.commentId}
            replied={comment.replied}
            activeComment={activeComment}
            onActiveComment={() => onSetActiveComment(comment.id)}
          />
        ))
      ) : (
        <p className="text-themeTextGray">No Comments</p>
      )}
    </div>
  )
}