import { cn } from "@/lib/utils"

type ChatBubbleProps = {
  senderid: string | null
  createdAt: Date | string
  message: string
  userid: string
}

export const ChatBubble = ({
  senderid,
  createdAt,
  message,
  userid,
}: ChatBubbleProps) => {
  const date = createdAt instanceof Date ? createdAt : new Date(createdAt)
  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const period = hours >= 12 ? "pm" : "am"
  const displayHour = hours % 12 || 12

  const isSender = senderid === userid

  return (
    <div
      className={cn(
        "flex flex-col max-w-[60%] min-w-[8%]",
        isSender ? "self-end items-end" : "self-start items-start",
      )}
    >
      <div
        className={cn(
          "px-3.5 py-2 rounded-2xl text-sm leading-relaxed",
          isSender
            ? "bg-themeBlack text-themeTextWhite rounded-br-sm"
            : "bg-themeGray text-themeTextWhite rounded-bl-sm",
        )}
      >
        {message}
      </div>
      <span className="text-[10px] text-themeTextGray mt-1 px-1">
        {displayHour}:{minutes} {period}
      </span>
    </div>
  )
}
