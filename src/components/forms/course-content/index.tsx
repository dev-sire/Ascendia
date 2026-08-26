"use client"
import { HtmlParser } from "@/components/global/html-parser"
import { Loader } from "@/components/global/loader"
import BlockTextEditor from "@/components/global/rich-text-editor"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useCourseContent, useCourseSectionInfo } from "@/hooks/courses"

type CourseContentFormProps = {
  sectionid: string
  userid: string
  groupid: string
}

export const CourseContentForm = ({
  sectionid,
  userid,
  groupid,
}: CourseContentFormProps) => {
  const { data } = useCourseSectionInfo(sectionid)

  const {
    errors,
    onUpdateContent,
    setJsonDescription,
    setOnDescription,
    onEditDescription,
    setOnHtmlDescription,
    editor,
    isPending,
  } = useCourseContent(
    sectionid,
    data?.section?.content || null,
    data?.section?.JsonContent || null,
    data?.section?.htmlContent || null,
  )

  // Show a skeleton while the section is loading so the user knows
  // something is happening instead of seeing a blank area.
  if (!data) {
    return (
      <div className="p-5 flex flex-col gap-4">
        <Skeleton className="h-8 w-1/3 bg-themeGray/30" />
        <Skeleton className="h-4 w-full bg-themeGray/20" />
        <Skeleton className="h-4 w-5/6 bg-themeGray/20" />
        <Skeleton className="h-4 w-4/6 bg-themeGray/20" />
        <Skeleton className="h-64 w-full bg-themeGray/20 mt-4" />
      </div>
    )
  }

  // Null-safe parse: if JsonContent is missing or invalid, fall back to undefined
  // so the editor starts empty rather than crashing.
  let parsedJson: object | undefined
  try {
    parsedJson = data.section?.JsonContent
      ? JSON.parse(data.section.JsonContent)
      : undefined
  } catch {
    parsedJson = undefined
  }

  return groupid === userid ? (
    <form onSubmit={onUpdateContent} className="p-5 flex flex-col" ref={editor}>
      <BlockTextEditor
        onEdit={onEditDescription}
        max={10000}
        inline
        min={100}
        disabled={userid === groupid ? false : true}
        name="jsoncontent"
        errors={errors}
        setContent={setJsonDescription || undefined}
        content={parsedJson}
        htmlContent={data.section?.htmlContent || undefined}
        setHtmlContent={setOnHtmlDescription}
        textContent={data.section?.content || undefined}
        setTextContent={setOnDescription}
      />
      {onEditDescription && (
        <Button
          className="mt-10 self-end bg-themeBlack border-themeGray"
          variant="outline"
          disabled={isPending}
        >
          <Loader loading={isPending}>Save Content</Loader>
        </Button>
      )}
    </form>
  ) : (
    <HtmlParser html={data.section?.htmlContent ?? ""} />
  )
}
