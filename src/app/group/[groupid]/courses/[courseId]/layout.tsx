import { onGetCourseModules } from "@/actions/courses"
import { onGetGroupInfo } from "@/actions/groups"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { CreateCourseModule } from "../_components/create-module"
import CourseModuleList from "../_components/module-list"

type CourseLayoutProps = {
  params: Promise<{ courseId: string; groupid: string }>
  children: React.ReactNode
}

const CourseLayout = async ({ params, children }: CourseLayoutProps) => {
  const { courseId, groupid } = await params
  const client = new QueryClient()

  // Keys must match the hooks exactly — include IDs so cache never bleeds
  // between different courses or groups.
  await Promise.all([
    client.prefetchQuery({
      queryKey: ["course-modules", courseId],
      queryFn: () => onGetCourseModules(courseId),
    }),
    client.prefetchQuery({
      queryKey: ["group-info", groupid],
      queryFn: () => onGetGroupInfo(groupid),
    }),
  ])

  console.log(courseId, groupid, "courseId, groupid")

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <div className="grid grid-cols-1 h-full lg:grid-cols-4 overflow-hidden">
        <div className="bg-themeBlack p-5 overflow-y-auto">
          <CreateCourseModule courseId={courseId} groupid={groupid} />
          <CourseModuleList groupid={groupid} courseId={courseId} />
        </div>
        <div className="lg:col-span-3 max-h-full h-full pb-10 overflow-y-auto bg-[#101011]/90">
          <div className="px-10 py-8">
            {children}
          </div>
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default CourseLayout