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
  params: Promise<{ courseid: string; groupid: string }>
  children: React.ReactNode
}

const CourseLayout = async ({ params, children }: CourseLayoutProps) => {
  const { courseid, groupid } = await params
  const client = new QueryClient()

  // Keys must match the hooks exactly — include IDs so cache never bleeds
  // between different courses or groups.
  await Promise.all([
    client.prefetchQuery({
      queryKey: ["course-modules", courseid],
      queryFn: () => onGetCourseModules(courseid),
    }),
    client.prefetchQuery({
      queryKey: ["group-info", groupid],
      queryFn: () => onGetGroupInfo(groupid),
    }),
  ])

  console.log(courseid, groupid, "courseid, groupid")

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <div className="grid grid-cols-1 h-full lg:grid-cols-4 overflow-hidden">
        <div className="bg-themeBlack p-5 overflow-y-auto">
          <CreateCourseModule courseId={courseid} groupid={groupid} />
          <CourseModuleList groupid={groupid} courseId={courseid} />
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
