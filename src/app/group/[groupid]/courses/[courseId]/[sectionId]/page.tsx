import { onAuthenticatedUser } from "@/actions/auth"
import { onGetGroupInfo } from "@/actions/groups"
import { CourseContentForm } from "@/components/forms/course-content"

type Props = {
    params: { sectionid: string; groupId: string }
}

const CourseModuleSection = async ({ params }: Props) => {
    const user = await onAuthenticatedUser()
    const group = await onGetGroupInfo(params.groupId)

    return (
        <CourseContentForm
            groupId={group.group?.userId!}
            sectionid={params.sectionid}
            userid={user.id!}
        />
    )
}

export default CourseModuleSection
