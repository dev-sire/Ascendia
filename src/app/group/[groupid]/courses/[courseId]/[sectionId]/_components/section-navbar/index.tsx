"use client"
import { Button } from "@/components/ui/button"
import { useSectionNavBar } from "@/hooks/courses"
import { Check } from "lucide-react"

type Props = {
  sectionid: string
}

const SectionNavBar = ({ sectionid }: Props) => {
  const { data, mutate, isPending } = useSectionNavBar(sectionid)

  if (data?.status !== 200) return <></>

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
          <Check size={16} />
          {completed ? "Completed" : isPending ? "Saving…" : "Mark as complete"}
        </Button>
      </div>
    </div>
  )
}

export default SectionNavBar