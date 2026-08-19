import { onAuthenticatedUser } from "@/actions/auth"
import { onGetGroupInfo } from "@/actions/groups"
import { CourseContentForm } from "@/components/forms/course-content"

const CourseModuleSection = async ({
  params,
}: {
  params: Promise<{ sectionid: string; groupid: string }>
}) => {
  const { sectionid, groupid } = await params
  const user = await onAuthenticatedUser()
  const group = await onGetGroupInfo(groupid)

  return (
    <CourseContentForm
      groupid={group.group?.userId!}
      sectionid={sectionid}
      userid={user.id!}
    />
  )
}

export default CourseModuleSection