"use client"
import { GlobalAccordion } from "@/components/global/accordion"
import { IconRenderer } from "@/components/global/icon-renderer"
import { AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useCourseModule } from "@/hooks/courses"
import { EmptyCircle, PurpleCheck } from "@/icons"
import { Pencil, Plus } from "lucide-react"
import Link from "next/link"
import { v4 } from "uuid"

type Props = {
  courseId: string
  groupid: string
}

const CourseModuleList = ({ courseId, groupid }: Props) => {
  const {
    data,
    onEditModule,
    edit,
    triggerRef,
    inputRef,
    variables,
    pathname,
    isPending,
    groupOwner,
    sectionVariables,
    pendingSection,
    mutateSection,
    setActiveSection,
    activeSection,
    contentRef,
    onEditSection,
    editSection,
    sectionInputRef,
    sectionUpdatePending,
    updateVariables,
  } = useCourseModule(courseId, groupid)

  const isOwner = !!groupOwner?.groupOwner

  return (
    <div className="flex flex-col">
      {data?.status === 200 &&
        data.modules?.map((module) => (
          <GlobalAccordion
            edit={isOwner ? edit : false}
            ref={triggerRef}
            editable={
              isOwner ? (
                <Input
                  ref={inputRef}
                  className="bg-themeBlack border-themeGray"
                />
              ) : undefined
            }
            onEdit={isOwner ? () => onEditModule(module.id) : undefined}
            id={module.id}
            key={module.id}
            title={
              <span className="flex items-center gap-2">
                {isPending ? variables?.content! : module.title}
                {isOwner && (
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Pencil
                          size={11}
                          className="text-themeTextGray opacity-50 hover:opacity-100 cursor-pointer flex-shrink-0"
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="bg-themeDarkGray border-themeGray text-xs"
                      >
                        Double-click to rename
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </span>
            }
          >
            <AccordionContent className="flex flex-col gap-y-2 px-3">
              {module.section.length ? (
                module.section.map((section) => (
                  <Link
                    ref={contentRef}
                    onDoubleClick={isOwner ? onEditSection : undefined}
                    onClick={() => setActiveSection(section.id)}
                    className="flex gap-x-3 items-center capitalize group"
                    key={section.id}
                    href={`/group/${groupid}/courses/${courseId}/${section.id}`}
                  >
                    {section.complete ? <PurpleCheck /> : <EmptyCircle />}
                    <IconRenderer
                      icon={section.icon}
                      mode={
                        pathname.split("/").pop() === section.id
                          ? "LIGHT"
                          : "DARK"
                      }
                    />
                    {editSection && activeSection === section.id ? (
                      <Input
                        ref={sectionInputRef}
                        className="flex-1 bg-transparent border-none p-0"
                      />
                    ) : sectionUpdatePending && activeSection === section.id ? (
                      updateVariables?.content
                    ) : (
                      <span className="flex items-center gap-1.5 flex-1">
                        {section.name}
                        {isOwner && (
                          <TooltipProvider delayDuration={300}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Pencil
                                  size={10}
                                  className="text-themeTextGray opacity-0 group-hover:opacity-40 hover:!opacity-100 cursor-pointer flex-shrink-0"
                                />
                              </TooltipTrigger>
                              <TooltipContent
                                side="right"
                                className="bg-themeDarkGray border-themeGray text-xs"
                              >
                                Double-click to rename
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </span>
                    )}
                  </Link>
                ))
              ) : (
                <></>
              )}
              {isOwner && (
                <>
                  {pendingSection && sectionVariables && (
                    <Link
                      onClick={() =>
                        setActiveSection(sectionVariables.sectionid)
                      }
                      className="flex gap-x-3 items-center"
                      href={`/group/${groupid}/courses/${courseId}/${sectionVariables.sectionid}`}
                    >
                      <EmptyCircle />
                      <IconRenderer
                        icon={"doc"}
                        mode={
                          pathname.split("/").pop() === activeSection
                            ? "LIGHT"
                            : "DARK"
                        }
                      />
                      New Section
                    </Link>
                  )}
                  <Button
                    onClick={() =>
                      mutateSection({
                        moduleid: module.id,
                        sectionid: v4(),
                      })
                    }
                    variant="outline"
                    className="bg-transparent border-themeGray text-themeTextGray mt-2"
                  >
                    <Plus />
                  </Button>
                </>
              )}
            </AccordionContent>
          </GlobalAccordion>
        ))}
    </div>
  )
}

export default CourseModuleList