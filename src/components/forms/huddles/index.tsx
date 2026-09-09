"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSendMessage } from "@/hooks/groups"
import { cn } from "@/lib/utils"
import { ImageIcon, Mic, Send, Square, X } from "lucide-react"
import Image from "next/image"

type HuddlesFormProps = {
  recieverid: string
  userid: string
}

export const HuddlesForm = ({ recieverid, userid }: HuddlesFormProps) => {
  const {
    register,
    onSendNewMessage,
    isSending,
    // image
    imagePreviewUrl,
    imageInputRef,
    onPickImage,
    clearImage,
    // audio
    isRecording,
    audioBlob,
    audioBlobUrl,
    recordingSeconds,
    onStartRecording,
    onStopRecording,
    clearAudio,
  } = useSendMessage(recieverid, userid)

  const formatSeconds = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  const hasMedia = !!imagePreviewUrl || !!audioBlob

  return (
    <div className="flex flex-col gap-y-2">
      {/* ── Image preview ── */}
      {imagePreviewUrl && (
        <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-themeGray/40 ml-1">
          <Image
            src={imagePreviewUrl}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 hover:bg-black/80 transition-colors"
          >
            <X size={12} className="text-white" />
          </button>
        </div>
      )}

      {/* ── Audio preview ── */}
      {audioBlob && audioBlobUrl && (
        <div className="flex items-center gap-x-2 bg-themeBlack rounded-xl px-3 py-2 ml-1 w-fit">
          <audio src={audioBlobUrl} controls className="h-8 max-w-[220px] audio-compact" />
          <button
            type="button"
            onClick={clearAudio}
            className="text-themeTextGray hover:text-themeTextWhite transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* ── Input row ── */}
      <form
        onSubmit={onSendNewMessage}
        className="flex items-center gap-x-2 bg-themeBlack px-3 py-2.5 rounded-2xl"
      >
        {/* Recording indicator or mic button */}
        {isRecording ? (
          <div className="flex items-center gap-x-2 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs text-themeTextGray tabular-nums w-8">
              {formatSeconds(recordingSeconds)}
            </span>
            <button
              type="button"
              onClick={onStopRecording}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <Square size={16} fill="currentColor" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={hasMedia ? undefined : onStartRecording}
            disabled={hasMedia}
            className={cn(
              "flex-shrink-0 transition-colors",
              hasMedia
                ? "text-themeGray cursor-not-allowed"
                : "text-themeTextGray hover:text-themeTextWhite",
            )}
          >
            <Mic size={18} />
          </button>
        )}

        {/* Text input — hidden while recording */}
        {!isRecording && !audioBlob && (
          <Input
            className="flex-1 bg-transparent border-none outline-none text-sm text-themeTextWhite placeholder:text-themeTextGray focus-visible:ring-0 focus-visible:ring-offset-0 h-auto py-0"
            placeholder={imagePreviewUrl ? "Add a caption…" : "Type your message here..."}
            autoComplete="off"
            {...register("message")}
          />
        )}

        {/* Spacer when recording */}
        {(isRecording || audioBlob) && <div className="flex-1" />}

        {/* Image picker — hidden while recording */}
        {!isRecording && !audioBlob && (
          <>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onPickImage}
            />
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="flex-shrink-0 text-themeTextGray hover:text-themeTextWhite transition-colors"
            >
              <ImageIcon size={18} />
            </button>
          </>
        )}

        {/* Send */}
        <Button
          variant="ghost"
          className="p-0 h-auto hover:bg-transparent flex-shrink-0"
          type="submit"
          disabled={isSending || isRecording}
        >
          <Send
            size={18}
            className={cn(
              "transition-colors",
              isSending
                ? "text-themeGray"
                : "text-themeTextGray hover:text-themeTextWhite",
            )}
          />
        </Button>
      </form>
    </div>
  )
}
