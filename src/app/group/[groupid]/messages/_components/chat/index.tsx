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
      className="flex-1 flex flex-col gap-y-2 px-4 py-4 h-0 overflow-y-auto"
      ref={messageWindowRef}
    >
      {messages.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center gap-y-2 text-center">
          <p className="text-themeTextGray text-sm">No messages yet.</p>
          <p className="text-themeTextGray/60 text-xs">Say hello 👋</p>
        </div>
      )}
      {messages.map((c: any) => (
        <ChatBubble key={c.id} {...c} userid={userid} />
      ))}
    </div>
  )
}
