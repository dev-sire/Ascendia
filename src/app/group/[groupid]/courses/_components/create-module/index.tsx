"use client"

import { GlobalAccordion } from "@/components/global/accordion"
import { Button } from "@/components/ui/button"
import { useCreateModule } from "@/hooks/courses"
import { Loader2, Plus, PlusCircle } from "lucide-react"

type CreateCourseModuleProps = {
  courseId: string
  groupid: string
}

export const CreateCourseModule = ({
  courseId,
  groupid,
}: CreateCourseModuleProps) => {
  const { variables, isPending, onCreateModule, data } = useCreateModule(
    courseId,
    groupid,
  )

  if (!data?.groupOwner) {
    return <></>
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-end">
        {isPending ? (
          <Loader2
            size={20}
            className="text-themeGray animate-spin"
          />
        ) : (
          <PlusCircle
            onClick={onCreateModule}
            className="text-themeGray cursor-pointer hover:text-themeTextGray/60 transition-colors"
          />
        )}
      </div>
      {variables && isPending && (
        <GlobalAccordion id={variables.moduleId} title={variables.title}>
          <Button
            variant="outline"
            className="bg-transparent border-themeGray text-themeTextGray mt-2"
            disabled
          >
            <Plus />
          </Button>
        </GlobalAccordion>
      )}
    </div>
  )
}
