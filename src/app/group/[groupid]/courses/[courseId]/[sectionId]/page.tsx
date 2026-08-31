import { onAuthenticatedUser } from "@/actions/auth"
import { onGetGroupInfo } from "@/actions/groups"
import { CourseContentForm } from "@/components/forms/course-content"

const CourseModuleSection = async ({
  params,
}: {
  params: Promise<{ sectionId: string; groupid: string }>
}) => {
  const { sectionId, groupid } = await params
  const user = await onAuthenticatedUser()
  const group = await onGetGroupInfo(groupid)

  return (
    <CourseContentForm
      groupid={group.group?.userId!}
      sectionid={sectionId}
      userid={user.id!}
    />
  )
}

export default CourseModuleSection
