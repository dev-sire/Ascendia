import { onGetSectionInfo } from "@/actions/courses"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import SectionNavBar from "./_components/section-navbar"

type CourseContentPageLayout = {
  children: React.ReactNode
  params: Promise<{ sectionId: string }>
}

const CourseContentPageLayout = async ({
  children,
  params,
}: CourseContentPageLayout) => {
  const { sectionId } = await params
  const client = new QueryClient()

  await client.prefetchQuery({
    queryKey: ["section-info", sectionId],
    queryFn: () => onGetSectionInfo(sectionId),
  })

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <SectionNavBar sectionid={sectionId} />
      {children}
    </HydrationBoundary>
  )
}

export default CourseContentPageLayout
