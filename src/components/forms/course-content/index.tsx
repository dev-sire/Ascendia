"use client"
import { HtmlParser } from "@/components/global/html-parser"
import { Loader } from "@/components/global/loader"
import BlockTextEditor from "@/components/global/rich-text-editor"
import { Button } from "@/components/ui/button"
import { useCourseContent, useCourseSectionInfo } from "@/hooks/course"

type CourseContentFormProps = {
    sectionid: string
    userid: string
    groupId: string
}

export const CourseContentForm = ({
    sectionid,
    userid,
    groupId,
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

    return groupId === userid ? (
        <form
            onSubmit={onUpdateContent}
            className="p-5 flex flex-col"
            ref={editor}
        >
            <BlockTextEditor
                onEdit={onEditDescription}
                max={10000}
                inline
                min={100}
                disabled={userid === groupId ? false : true}
                name="jsoncontent"
                errors={errors}
                setContent={setJsonDescription || undefined}
                content={JSON.parse(data?.section?.JsonContent!)}
                htmlContent={data?.section?.htmlContent || undefined}
                setHtmlContent={setOnHtmlDescription}
                textContent={data?.section?.content || undefined}
                setTextContent={setOnDescription}
            />
            {onEditDescription && (
                <Button
                    className="mt-10 self-end bg-themeBlack border-themeGray"
                    variant="outline"
                >
                    <Loader loading={isPending}>Save Content</Loader>
                </Button>
            )}
        </form>
    ) : (
        <HtmlParser html={data?.section?.htmlContent!} />
    )
}
