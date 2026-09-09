import { cn, ucare } from "@/lib/utils"
import Image from "next/image"

type ChatBubbleProps = {
  senderid: string | null
  createdAt: Date | string
  message: string | null
  mediaUrl: string | null
  mediaType: "IMAGE" | "AUDIO" | null
  userid: string
}

export const ChatBubble = ({
  senderid,
  createdAt,
  message,
  mediaUrl,
  mediaType,
  userid,
}: ChatBubbleProps) => {
  const date = createdAt instanceof Date ? createdAt : new Date(createdAt)
  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const period = hours >= 12 ? "pm" : "am"
  const displayHour = hours % 12 || 12

  const isSender = senderid === userid

  // mediaUrl is either an Uploadcare UUID (from DB) or a blob URL (optimistic)
  const isBlob = mediaUrl?.startsWith("blob:")
  const resolvedUrl = mediaUrl
    ? isBlob
      ? mediaUrl
      : ucare(mediaUrl)
    : null

  return (
    <div
      className={cn(
        "flex flex-col max-w-[60%] min-w-[8%]",
        isSender ? "self-end items-end" : "self-start items-start",
      )}
    >
      {/* ── Image message ── */}
      {mediaType === "IMAGE" && resolvedUrl && (
        <div
          className={cn(
            "overflow-hidden rounded-2xl",
            isSender ? "rounded-br-sm" : "rounded-bl-sm",
          )}
        >
          <Image
            src={resolvedUrl}
            alt="Shared image"
            width={260}
            height={260}
            className="object-cover w-full max-w-[260px]"
            unoptimized={isBlob}
          />
          {/* Caption below image, inside same bubble */}
          {message && (
            <div
              className={cn(
                "px-3 py-1.5 text-sm text-themeTextWhite",
                isSender ? "bg-themeBlack" : "bg-themeGray",
              )}
            >
              {message}
            </div>
          )}
        </div>
      )}

      {/* ── Audio message ── */}
      {mediaType === "AUDIO" && resolvedUrl && (
        <div
          className={cn(
            "px-3 py-2 rounded-2xl",
            isSender
              ? "bg-themeBlack rounded-br-sm"
              : "bg-themeGray rounded-bl-sm",
          )}
        >
          <audio
            src={resolvedUrl}
            controls
            className="h-8 max-w-[220px]"
          />
        </div>
      )}

      {/* ── Text-only message ── */}
      {!mediaType && message && (
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
      )}

      <span className="text-[10px] text-themeTextGray mt-1 px-1">
        {displayHour}:{minutes} {period}
      </span>
    </div>
  )
}
