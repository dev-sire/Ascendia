"use client"

import { Bell } from "@/icons"
import GlassSheet from "../glass-sheet"

type Props = {}

const Notification = (props: Props) => {
  return (
    <GlassSheet
      trigger={
        <span className="cursor-pointer">
          <Bell />
        </span>
      }
    >
      <div>yo</div>
    </GlassSheet>
  )
}

export default Notification
