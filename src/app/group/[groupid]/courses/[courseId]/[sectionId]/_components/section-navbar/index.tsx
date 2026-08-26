"use client"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useSectionNavBar } from "@/hooks/courses"
import { Check, Loader2 } from "lucide-react"

type Props = {
  sectionid: string
}

const SectionNavBar = ({ sectionid }: Props) => {
  const { data, mutate, isPending } = useSectionNavBar(sectionid)

  // Show a skeleton navbar while the section is loading so the layout
  // doesn't shift and the user has a loading hint.
  if (!data) {
    return (
      <div className="flex justify-between p-5 items-center">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24 bg-themeGray/30" />
          <Skeleton className="h-8 w-48 bg-themeGray/30" />
        </div>
        <Skeleton className="h-9 w-36 bg-themeGray/30" />
      </div>
    )
  }

  if (data.status !== 200) return <></>

  const completed = data.completedByUser ?? false

  return (
    <div className="flex justify-between p-5 overflow-y-auto items-center">
      <div>
        <p className="text-themeTextGray">Course Title</p>
        <h2 className="text-3xl text-themeTextWhite font-bold">
          {data.section?.name}
        </h2>
      </div>
      <div>
        <Button
          className="bg-themeDarkGray flex gap-x-3 items-center border-themeGray text-themeTextWhite"
          variant="outline"
          onClick={() => !completed && mutate()}
          disabled={isPending || completed}
        >
          {isPending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Check size={16} />
          )}
          {completed ? "Completed" : isPending ? "Saving…" : "Mark as complete"}
        </Button>
      </div>
    </div>
  )
}

export default SectionNavBar
