import { onGetGroupCourses } from "@/actions/course"
import CourseCreate from "@/components/global/create-course"
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query"
import CourseList from "./_components/course-list"

type Props = {
    params: {
        groupId: string
    }
}

const CoursesPage = async ({ params }: Props) => {
    const client = new QueryClient()

    await client.prefetchQuery({
        queryKey: ["group-courses"],
        queryFn: () => onGetGroupCourses(params.groupId),
    })

    return (
        <HydrationBoundary state={dehydrate(client)}>
            <div className="container grid lg:grid-cols-2 2xl:grid-cols-3 py-10 gap-5">
                <CourseCreate groupId={params.groupId} />
                <CourseList groupId={params.groupId} />
            </div>
        </HydrationBoundary>
    )
}

export default CoursesPage
