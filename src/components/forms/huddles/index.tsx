"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSendMessage } from "@/hooks/groups"
import { Mic, Send } from "lucide-react"

type HuddlesFormProps = {
  recieverid: string
  userid: string
}

export const HuddlesForm = ({ recieverid, userid }: HuddlesFormProps) => {
  const { register, onSendNewMessage } = useSendMessage(recieverid, userid)

  return (
    <form
      onSubmit={onSendNewMessage}
      className="flex items-center gap-x-2 bg-themeBlack px-3 py-2.5 rounded-2xl"
    >
      <Mic size={18} className="text-themeTextGray flex-shrink-0" />
      <Input
        className="flex-1 bg-transparent border-none outline-none text-sm text-themeTextWhite placeholder:text-themeTextGray focus-visible:ring-0 focus-visible:ring-offset-0 h-auto py-0"
        {...register("message")}
        placeholder="Type your message here..."
        autoComplete="off"
      />
      <Button
        variant="ghost"
        className="p-0 h-auto hover:bg-transparent flex-shrink-0"
        type="submit"
      >
        <Send size={18} className="text-themeTextGray hover:text-themeTextWhite transition-colors" />
      </Button>
    </form>
  )
}
