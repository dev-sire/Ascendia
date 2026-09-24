import { createClient } from "@supabase/supabase-js"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export const truncateString = (string: string) => {
  return string.slice(0, 60) + "..."
}

/**
 * Converts a YouTube or Loom URL to its embeddable form and detects type.
 * YouTube: watch?v=ID  →  /embed/ID
 * YouTube: youtu.be/ID →  /embed/ID
 * YouTube: /shorts/ID  →  /embed/ID
 * Loom: /share/ID      →  /embed/ID
 */
export const validateURLString = (url: string) => {
  const youtubeRegex = /(?:youtube\.com|youtu\.be)/
  const loomRegex = /loom\.com/

  if (youtubeRegex.test(url)) {
    return {
      url: getYoutubeEmbedUrl(url),
      type: "YOUTUBE",
    }
  }

  if (loomRegex.test(url)) {
    return {
      url: getLoomEmbedUrl(url),
      type: "LOOM",
    }
  } else {
    return {
      url: undefined,
      type: "IMAGE",
    }
  }
}

export const getYoutubeEmbedUrl = (url: string): string => {
  // Already an embed URL — return as-is
  if (url.includes("/embed/")) return url

  let videoId: string | null = null

  try {
    const parsed = new URL(url)

    if (parsed.hostname === "youtu.be") {
      // https://youtu.be/VIDEO_ID
      videoId = parsed.pathname.slice(1).split("?")[0]
    } else if (parsed.pathname.includes("/shorts/")) {
      // https://www.youtube.com/shorts/VIDEO_ID
      videoId = parsed.pathname.split("/shorts/")[1]?.split("?")[0] ?? null
    } else {
      // https://www.youtube.com/watch?v=VIDEO_ID
      videoId = parsed.searchParams.get("v")
    }
  } catch {
    // Fallback: regex extract
    const match = url.match(/(?:v=|youtu\.be\/|\/shorts\/)([A-Za-z0-9_-]{11})/)
    videoId = match?.[1] ?? null
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url
}

export const getLoomEmbedUrl = (url: string): string => {
  // Already an embed URL — return as-is
  if (url.includes("/embed/")) return url

  // https://www.loom.com/share/VIDEO_ID  →  https://www.loom.com/embed/VIDEO_ID
  return url.replace("/share/", "/embed/")
}

export const ucare = (uuid: string | null | undefined, transform?: string) => {
  if (!uuid) return ""
  const base = process.env.NEXT_PUBLIC_UPLOADCARE_CDN ?? "https://ucarecdn.com"
  const cdn = base.replace(/\/$/, "")
  return transform
    ? `${cdn}/${uuid}/${transform}`
    : `${cdn}/${uuid}/`
}
