"use client"

import { useChatWindow } from "@/hooks/groups"
import { ChatBubble } from "../chat-bubble"

type ChatWindowProps = {
  recieverid: string
  userid: string
}

export const ChatWindow = ({ recieverid, userid }: ChatWindowProps) => {
  const { messageWindowRef, messages } = useChatWindow(recieverid)

  return (
    <div
      className="flex-1 flex py-5 flex-col gap-y-3 h-0 overflow-auto"
      ref={messageWindowRef}
    >
      {messages.length === 0 && (
        <p className="text-center text-themeTextGray text-sm mt-10">
          No messages yet. Say hello!
        </p>
      )}
      {messages.map((c: any) => (
        <ChatBubble key={c.id} {...c} userid={userid} />
      ))}
    </div>
  )
}