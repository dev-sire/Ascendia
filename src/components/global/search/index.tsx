"use client"

import { Input } from "@/components/ui/input"
import { useSearch } from "@/hooks/groups"
import { cn } from "@/lib/utils"
import { BorderBeam } from "border-beam"
import { SearchIcon } from "lucide-react"

type Props = {
  className?: string
  inputStyle?: string
  placeholder?: string
  searchType: "GROUPS" | "POSTS"
  iconStyle?: string
  glass?: boolean
}

const Search = ({
  searchType,
  className,
  glass,
  iconStyle,
  inputStyle,
  placeholder,
}: Props) => {
  const { query, onSearchQuery } = useSearch(searchType)

  return (
    <div
      className={cn(
        "relative",
        className,
      )}
      style={{ borderRadius: 64, overflow: "hidden" }}
    >
      {/* Border beam animated glow */}
      <BorderBeam
        size="line"
        colorVariant="gold"
        duration={3.1}
        borderRadius={64}
      >
      {/* Inner search bar */}
      <div
        className={cn(
          "flex items-center gap-3 px-4",
          glass &&
            "backdrop-blur-2xl bg-clip-padding bg-opacity-20",
        )}
        style={{
          background: "rgba(20,20,22,0.85)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 50px 0 rgba(255,255,255,0.02)",
          borderRadius: 64,
          height: 52,
        }}
      >
        <SearchIcon
          size={18}
          className={cn("shrink-0 text-themeTextGray/50", iconStyle)}
        />
        <Input
          onChange={onSearchQuery}
          value={query}
          className={cn(
            "bg-transparent border-0 shadow-none focus-visible:ring-0 text-themeTextWhite placeholder:text-themeTextGray/40 text-[15px] p-0 h-auto",
            inputStyle,
          )}
          placeholder={placeholder}
          type="text"
        />
      </div>
      </BorderBeam>
    </div>
  )
}

export default Search