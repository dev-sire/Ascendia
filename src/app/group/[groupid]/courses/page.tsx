import { onGetGroupCourses } from "@/actions/courses"
import { onGetGroupInfo } from "@/actions/groups"
import CourseCreate from "@/components/global/create-course"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"
import CourseList from "./_components/course-list"

const CoursesPage = async ({
  params,
}: {
  params: Promise<{ groupid: string }>
}) => {
  const { groupid } = await params
  const client = new QueryClient()

  // Keys must include groupid so navigating between groups
  // doesn't serve stale data from a previous group.
  await Promise.all([
    client.prefetchQuery({
      queryKey: ["group-courses", groupid],
      queryFn: () => onGetGroupCourses(groupid),
    }),
    client.prefetchQuery({
      queryKey: ["group-info", groupid],
      queryFn: () => onGetGroupInfo(groupid),
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <div className="container grid lg:grid-cols-2 2xl:grid-cols-3 py-10 gap-5">
        <CourseCreate groupid={groupid} />
        <CourseList groupid={groupid} />
      </div>
    </HydrationBoundary>
  )
}

export default CoursesPage
