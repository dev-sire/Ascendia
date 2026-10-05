"use client"

import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Bell } from "@/icons"
import { cn } from "@/lib/utils"
import GlassSheet from "../glass-sheet"

type Props = {
  /** Styles the clickable trigger (size, hover background, etc.). */
  className?: string
  /** Styles the bell icon itself. */
  iconClassName?: string
}

const Notification = ({ className, iconClassName }: Props) => {
  return (
    <GlassSheet
      trigger={
        <span
          className={cn(
            "flex cursor-pointer items-center justify-center",
            className,
          )}
        >
          <Bell className={iconClassName} />
          <span className="sr-only">Open notifications</span>
        </span>
      }
    >
      <SheetHeader className="text-left">
        <SheetTitle className="text-themeTextWhite">Notifications</SheetTitle>
        <SheetDescription className="text-themeTextGray">
          Updates from your groups will appear here.
        </SheetDescription>
      </SheetHeader>

      <div className="mt-20 flex flex-col items-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-themeGray">
          <Bell className="h-7 w-7 opacity-80" />
        </div>
        <p className="font-medium text-themeTextWhite">You&apos;re all caught up</p>
        <p className="max-w-[16rem] text-sm text-themeTextGray">
          No new notifications right now.
        </p>
      </div>
    </GlassSheet>
  )
}

export default Notification
