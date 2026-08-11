"use client"

import { cn } from "@/lib/utils"

type GroupListItemProps = {
  icon: JSX.Element
  label: string
  selected?: string
  path?: string
}

export const GroupListItem = ({
  icon,
  label,
  selected,
  path,
}: GroupListItemProps) => {
  return (
    <div
      className={cn(
        "flex  gap-3 items-center py-2 px-4 rounded-2xl bg-themeGray border-2 cursor-pointer hover:brightness-125",
        selected === path || selected === label
          ? "border-themeTextGray"
          : "border-themeGray",
      )}
    >
      {icon}
      {label}
    </div>
  )
}
