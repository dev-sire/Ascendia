import { truncateString, ucare } from "@/lib/utils"
import Link from "next/link"

type Props = {
  id: string
  name: string
  category: string
  createdAt: Date
  userId: string
  thumbnail: string | null
  description: string | null
  privacy: "PUBLIC" | "PRIVATE"
  preview?: string
}

const GroupCard = ({
  id,
  thumbnail,
  name,
  category,
  description,
  preview,
}: Props) => {
  return (
    <Link href={`/about/${id}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-themeGray">
        {/* Main image */}
        <img
          src={preview || ucare(thumbnail) || "/placeholder.png"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Bottom scrim so the name stays readable on light images */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none" />

        {/* Category pill */}
        <span className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-widest text-white/70 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          {category}
        </span>

        {/* Bottom text — always visible */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold text-base leading-tight truncate drop-shadow-md">
            {name}
          </h3>
          <p className="text-white/60 text-[13px] mt-0.5 leading-snug line-clamp-2">
            {description && truncateString(description)}
          </p>
        </div>

        {/* Hover overlay — dims slightly and shows a subtle ring */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-white/20 transition-all duration-300" />
      </div>
    </Link>
  )
}

export default GroupCard