import { cn } from "@/lib/utils"

type ChatBubbeProps = {
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
}: ChatBubbeProps) => {
  const date = createdAt instanceof Date ? createdAt : new Date(createdAt)
  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const period = hours >= 12 ? "pm" : "am"
  const displayHour = hours % 12 || 12

  return (
    <div
      className={cn(
        senderid === userid
          ? "self-end bg-themeBlack max-w-[60%] min-w-[15%]"
          : "self-start bg-themeGray max-w-[60%] min-w-[15%]",
        "px-4 py-2 rounded-xl text-xl flex flex-col",
      )}
    >
      <p>{message}</p>
      <p className={cn("text-xs text-themeTextGray")}>
        {displayHour}:{minutes} {period}
      </p>
    </div>
  )
}